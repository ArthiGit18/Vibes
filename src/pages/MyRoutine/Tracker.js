import React, { useState, useEffect } from "react";
import axios from "axios";

const Tracker = () => {
  const [completedDates, setCompletedDates] = useState([]);

  useEffect(() => {
    // Fetch completed dates from backend
    const fetchTrackerData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tracker-summary");
        setCompletedDates(response.data.completedDates || []);
      } catch (error) {
        console.error("Error fetching tracker summary:", error);
      }
    };

    fetchTrackerData();
  }, []);

  // Generate last 30 days for the tracker
  const getLast30Days = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
      days.push({
        date: formattedDate,
        day: date.getDate(), // Extract only the day number
        month: date.toLocaleString("default", { month: "long" }), // Full month name
        year: date.getFullYear(), // Year
        completed: completedDates.includes(formattedDate),
      });
    }
    return days;
  };

  const days = getLast30Days();
  const currentMonth = days[0].month;
  const currentYear = days[0].year;

  return (
    <div className="tracker-container">
      <h3>{currentMonth} {currentYear} - Daily Progress</h3>
      <div className="tracker-grid">
        {days.map((day) => (
          <div
            key={day.date}
            className={`tracker-box ${day.completed ? "completed" : ""}`}
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
