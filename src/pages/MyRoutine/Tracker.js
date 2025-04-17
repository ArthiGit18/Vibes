import React, { useState, useEffect } from "react";
import axios from "axios";

const Tracker = () => {
  const [completedDates, setCompletedDates] = useState([]);
  const [days, setDays] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  // Fetch user email from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserEmail(user.email.trim().toLowerCase());
    }
  }, []);

  // Fetch tracker data
  useEffect(() => {
    const fetchTrackerData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tracker-summary");
        setCompletedDates(response.data.completedDates || []);
      } catch (error) {
        console.error("Error fetching tracker summary:", error);
      }
    };
    fetchTrackerData();
  }, []);

  // Update `days` whenever `completedDates` or `userEmail` changes
  useEffect(() => {
    if (userEmail) {
      setDays(getLast30Days(completedDates, userEmail));
    }
  }, [completedDates, userEmail]);

  // Generate last 30 days for the tracker
  const getLast30Days = (completedDates, email) => {
    const tempDays = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split("T")[0];

      // Check if the current logged-in user completed routine on this date
      const isUserCompleted = completedDates.some(
        (entry) => entry.date === formattedDate && entry.email.trim().toLowerCase() === email
      );

      tempDays.push({
        date: formattedDate,
        day: date.getDate(),
        month: date.toLocaleString("default", { month: "long" }),
        year: date.getFullYear(),
        completed: isUserCompleted,
      });
    }
    return tempDays;
  };

  if (days.length === 0) return <p>Loading...</p>;

  const currentMonth = days[days.length - 1].month;
  const currentYear = days[days.length - 1].year;

  return (
    <div className="tracker-container">
      <h3>{currentMonth} {currentYear} - Daily Progress</h3>
      <div className="tracker-grid">
        {days.map((day) => (
          <div
            key={day.date}
            className={`tracker-box ${day.completed ? "user-completed" : ""}`}
            title={day.date}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracker;
