import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  Stack,
  IconButton,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";
import SoftInput from "../../../../components/SoftInput";
import { uploadImageV2 } from "../../../../const/app-service";
import { API_PATH_V2 } from "../../../../utils/axios-customize";

export default function RatingComponent({ checked, item }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = async (event) => {
    try {
      const newImage = event.target.files[0];
      if (newImage) {
        let formData = new FormData();
        formData.append("file", newImage);
        const data = await uploadImageV2(formData);
        let urlImageNew = API_PATH_V2 + "/public/image/" + data?.data?.name;
        setUploadedImage(urlImageNew || data?.data || "");
      }
    } catch (e) {
    }
  };

  const handleSubmit = () => {
    const reviewData = {
      title,
      description,
      rating,
      image: uploadedImage,
    };
    console.log("Review Submitted:", reviewData);
    alert("Review Submitted!");
    try {

    } catch (error) {

    }
  };

  return (
    <Collapse in={checked}>
      <Box
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Đánh giá địa điểm
        </Typography>

        {/* Title Input */}
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography
              component="label"
              variant="caption"
              fontWeight="bold"
            >
              Tiêu đề
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            placeholder="Nhập tiêu đề"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </SoftBox>

        {/* Description Input */}
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography
              component="label"
              variant="caption"
              fontWeight="bold"
            >
              Miêu tả
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            placeholder="Nhập tiêu đề"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </SoftBox>
        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={1} marginY={2}>
          <Typography>Đánh giá:</Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
        </Stack>

        {/* Image Upload */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton component="label">
            <PhotoCamera />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
            />
          </IconButton>
          <Typography>Tải ảnh lên</Typography>
        </Stack>
        {uploadedImage && (
          <Box
            sx={{
              marginY: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              overflow: "hidden",
              width: "100%",
              maxHeight: 200,
            }}
          >
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ marginTop: 2 }}
        >
          <span style={{ color: "#fff" }}> Đăng lên đánh giá</span>
        </Button>
      </Box>
    </Collapse>
  );
}
