import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Exercise.css";

const ExercisePage = () => {
  const [exercises, setExercises] = useState([]);
  const location = useLocation();

  // Extract bodyPart from URL
  const queryParams = new URLSearchParams(location.search);
  const bodyPart = queryParams.get("bodyPart");

  useEffect(() => {
    const fetchExercises = async () => {
      if (!bodyPart) return; // Don't fetch if bodyPart is missing

      try {
        const response = await axios.get(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          {
            headers: {
              "X-RapidAPI-Key": "5a539483dbmsh30a6e18d707e107p140b61jsn169c7ba3f3be",
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            },
          }
        );

        const filtered = response.data.filter(
          (ex) => ex.gifUrl && !ex.gifUrl.includes("logo.png")
        );
        setExercises(filtered.slice(0, 20));
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, [bodyPart]);

  return (
    <div className="container">
      <h1>Exercises for: {bodyPart?.toUpperCase()}</h1>
      <div className="exercise-list">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="exercise-card">
            <h3>{exercise.name}</h3>
            <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
            <p><strong>Target:</strong> {exercise.target}</p>
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              width="200"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExercisePage;
