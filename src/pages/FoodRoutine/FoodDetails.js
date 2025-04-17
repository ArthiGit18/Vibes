import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Typography, Box, Grid, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import he from 'he'; // Importing the 'he' library for decoding HTML entities

const FoodDetailsPage = () => {
  const { foodId } = useParams(); // Assuming the URL contains the foodId
  const [foodData, setFoodData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch food data using the foodId from the URL
    const fetchFoodData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/food/details/${id}`);
        setFoodData(response.data);
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };

    fetchFoodData();
  }, [foodId]);

  const handleGoBack = () => {
    navigate("/healthy-food"); // Go back to the previous page
  };

  if (!foodData) {
    return <Typography>Loading...</Typography>;
  }

  // Decode HTML entities before rendering
  const decodeHtml = (html) => {
    return he.decode(html); // Decodes HTML entities like &lt;, &gt;, &amp;, etc.
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {foodData.name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <img
              src={`http://localhost:5000${foodData.image}`}
              alt={foodData.name}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography variant="h6">Description:</Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHtml(foodData.description),
              }}
            />

            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Ingredient:
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHtml(foodData.ingredient),
              }}
            />

            <Typography variant="h6" sx={{ marginTop: 2 }}>
              How to Make:
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHtml(foodData.making),
              }}
            />

            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Nutrition Chart:
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHtml(foodData.nutritionChart),
              }}
            />


            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Benifits:
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHtml(foodData.benifits),
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 3 }}>
          <Button variant="contained" color="secondary" onClick={handleGoBack}>
            Go Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FoodDetailsPage;
