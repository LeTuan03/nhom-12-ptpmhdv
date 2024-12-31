from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import LabelEncoder
import pymysql
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)

# Database connection settings
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'db_travel'
}


# Load data from the database
def load_data_from_db():
    connection = pymysql.connect(**db_config)
    try:
        user_data_query = "SELECT * FROM account"
        location_data_query = "SELECT * FROM places"
        ratings_query = "SELECT * FROM rating"

        user_data = pd.read_sql(user_data_query, connection)
        location_data = pd.read_sql(location_data_query, connection)
        ratings = pd.read_sql(ratings_query, connection)
    finally:
        connection.close()

    return user_data, location_data, ratings


# Load data from the database
user_data, location_data, ratings = load_data_from_db()

# Encoding location data
location_encoder = LabelEncoder()
location_data["location_index"] = location_encoder.fit_transform(location_data["id"])
ratings["location_index"] = location_encoder.transform(ratings["place_id"])

# Encoding user data (UUID to numeric index)
user_encoder = LabelEncoder()
user_data["user_index"] = user_encoder.fit_transform(user_data["id"])
ratings["user_index"] = user_encoder.transform(ratings["buyer_id"])

# Create train and test datasets
train = tf.data.Dataset.from_tensor_slices((
    {"user_id": ratings["user_index"], "location_id": ratings["location_index"]},
    ratings["rate"]
)).shuffle(len(ratings))

test = tf.data.Dataset.from_tensor_slices((
    {"user_id": ratings["user_index"], "location_id": ratings["location_index"]},
    ratings["rate"]
)).batch(len(location_data))

# Model architecture
user_id = tf.keras.Input(shape=(), name="user_id", dtype=tf.int32)
location_id = tf.keras.Input(shape=(), name="location_id", dtype=tf.int32)
user_embedding = tf.keras.layers.Embedding(input_dim=len(user_data), output_dim=32)(user_id)
location_embedding = tf.keras.layers.Embedding(input_dim=len(location_data), output_dim=32)(location_id)
dot_product = tf.keras.layers.Dot(axes=1)([user_embedding, location_embedding])
model = tf.keras.Model(inputs=[user_id, location_id], outputs=dot_product)

model.compile(optimizer=tf.keras.optimizers.Adagrad(0.1), loss=tf.keras.losses.MeanSquaredError(), metrics=["accuracy"])

# Evaluate the model
model.evaluate(test)


# Function to recommend locations for a specific user ID
def recommend_locations_for_user(user_id, model, location_encoder, location_data, num_recommendations=10):
    try:
        user_index = user_encoder.transform([user_id])[0]
    except ValueError:
        print(f"Error: user_id {user_id} not found in user encoder.")
        return []

    # Prepare data for prediction
    locations_for_specific_user = tf.data.Dataset.from_tensor_slices({
        "user_id": np.repeat(user_index, len(location_data)),
        "location_id": np.arange(len(location_data))
    }).map(lambda x: {
        "user_id": tf.reshape(x["user_id"], (-1,)),  # Ensure correct shape
        "location_id": tf.reshape(x["location_id"], (-1,))  # Ensure correct shape
    })

    # Predict ratings
    try:
        predicted_ratings = model.predict(locations_for_specific_user)
    except Exception as e:
        print(f"Error during model prediction: {e}")
        return []

    # Convert to Python list for JSON serialization
    predicted_ratings = predicted_ratings.flatten().tolist()

    # Combine and sort recommendations
    predicted_ratings_with_indexes = list(zip(np.arange(len(location_data)), predicted_ratings))
    recommended_locations_indexes = sorted(predicted_ratings_with_indexes, key=lambda x: x[1], reverse=True)

    top_recommendations_indexes = recommended_locations_indexes[:num_recommendations]
    top_recommendations = [(location_encoder.inverse_transform([index])[0], rating) for index, rating in
                           top_recommendations_indexes]

    return top_recommendations


@app.route('/recommend_locations')
def recommend_locations():
    user_id = request.args.get('user_id', type=str)
    if user_id is None:
        return jsonify({"message": "Please provide a valid user_id parameter."}), 400

    # Make sure the user_id is valid UUID
    try:
        uuid.UUID(user_id)  # Check if user_id is a valid UUID
    except ValueError:
        return jsonify({"message": "Invalid user_id format."}), 400
    print(user_id)
    recommendations = recommend_locations_for_user(user_id, model, location_encoder, location_data)

    if not recommendations:
        return jsonify({"message": "No recommendations found for the given user."}), 500

    # Convert the location and rating into a basic Python list
    list_recommend = [{"location": location, "rating": rating} for location, rating in recommendations]

    return jsonify({"data": list_recommend}), 200


if __name__ == '__main__':
    app.run(debug=True)
