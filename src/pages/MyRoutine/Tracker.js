import React, { useState, useEffect } from "react";
import axios from "axios";

const Tracker = () => {
  const [completedDates, setCompletedDates] = useState([]);

  useEffect(() => {
    // Fetch completed dates from backend
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

  // Generate last 30 days for the tracker, ensuring correct date handling
  const getLast30Days = () => {
    const days = [];
    const today = new Date(); // Get today's date (local time)

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today); // Create a fresh copy of today
      date.setDate(today.getDate() - i); // Subtract days correctly

      // Fix timezone issues by normalizing to UTC
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
  const currentMonth = days[days.length - 1].month; // Month of the latest date
  const currentYear = days[days.length - 1].year; // Year of the latest date

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
