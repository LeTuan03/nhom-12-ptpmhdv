-- Tạo DB
CREATE DATABASE db_travel_destination;
-- Sử dụng DB
USE db_travel_destination;

-- Tạo bảng thông tin người dùng.
CREATE TABLE travel_users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tạo bảng travel_continents (châu lục)
CREATE TABLE travel_continents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    continent_name VARCHAR(100) NOT NULL
);
-- Thêm các châu lục
INSERT INTO travel_continents (continent_name) VALUES
('Châu Á'),
('Châu Âu'),
('Châu Mỹ'),
('Châu Phi'),
('Châu Đại Dương');

-- Tạo bảng travel_countries (quốc gia)
CREATE TABLE travel_countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country_name VARCHAR(100) NOT NULL,
    continent_id INT,
    FOREIGN KEY (continent_id) REFERENCES travel_continents(id) ON DELETE CASCADE
);
-- Thêm các quốc gia
INSERT INTO travel_countries (country_name, continent_id) VALUES
('Việt Nam', 1),  -- Việt Nam thuộc Châu Á
('Pháp', 2),      -- Pháp thuộc Châu Âu
('Mỹ', 3),        -- Mỹ thuộc Châu Mỹ
('Ai Cập', 4),    -- Ai Cập thuộc Châu Phi
('Úc', 5);        -- Úc thuộc Châu Đại Dương

-- Tạo bảng travel_cities (thành phố)
CREATE TABLE travel_cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(100) NOT NULL,
    country_id INT,
    FOREIGN KEY (country_id) REFERENCES travel_countries(id) ON DELETE CASCADE
);

-- Thêm các thành phố
INSERT INTO travel_cities (city_name, country_id) VALUES
('Hà Nội', 1),    -- Hà Nội thuộc Việt Nam
('Paris', 2),     -- Paris thuộc Pháp
('New York', 3),  -- New York thuộc Mỹ
('Cairo', 4),     -- Cairo thuộc Ai Cập
('Sydney', 5);    -- Sydney thuộc Úc

-- Tạo bảng thông tin địa điểm du lịch.
CREATE TABLE travel_destination (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    location VARCHAR(255) NOT NULL,
    city_id INT,
    country_id INT,
    continent_id INT,
    rating DECIMAL(3,2),
    entry_fee DECIMAL(10,2),
    opening_hours VARCHAR(255),
    contact_info VARCHAR(255),
    FOREIGN KEY (continent_id) REFERENCES travel_continents(id),
    FOREIGN KEY (country_id) REFERENCES travel_countries(id),
    FOREIGN KEY (city_id) REFERENCES travel_cities(id)
);

-- Tạo bảng hình ảnh mỗi địa điểm.
CREATE TABLE travel_destination_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destination_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (destination_id) REFERENCES travel_destination(id) ON DELETE CASCADE
);

-- Tạo bảng lưu đánh giá của người dùng.
CREATE TABLE travel_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destination_id INT,
    user_id INT,
    rating DECIMAL(3,2),
    review_text TEXT,
    review_date DATE,
    FOREIGN KEY (destination_id) REFERENCES travel_destination(id) ON DELETE CASCADE
);

-- Tạo bảng các loại hình du lịch
CREATE TABLE travel_destination_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);
-- Thêm dữ liệu các loại hình du lịch
INSERT INTO travel_destination_categories (category_name) VALUES
('Văn hóa'),
('Thiên nhiên'),
('Lịch sử'),
('Biển'),
('Núi'),
('Động vật hoang dã');

-- Thêm khóa ngoại các loại hình du lịch với địa điểm du lịch
ALTER TABLE travel_destination
ADD category_id INT,
ADD FOREIGN KEY (category_id) REFERENCES travel_destination_categories(id);



