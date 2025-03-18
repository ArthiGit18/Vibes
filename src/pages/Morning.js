import React, { useState } from "react";
import axios from "axios";

const activities = [
  { name: "Wakeup Time", image: "/assets/morning/wakeup.jpg", time: "5:00 - 5:30" },
  { name: "Exercise", image: "/assets/morning/exercise.jpg", time: "5:30 - 6:30" },
  { name: "Skin Care", image: "/assets/morning/skincares.jpg", time: "6:30 - 7:00" },
  { name: "Juice", image: "/assets/morning/juice.jpg", time: "7:00 - 7:30" },
  { name: "Study", image: "/assets/morning/study.jpg", time: "7:30 - 9:00" },
  { name: "Breakfast", image: "/assets/morning/breakfast.jpg", time: "9:00 - 9:30" },
];

const Morning = () => {
  const [checked, setChecked] = useState({});
  const [notes, setNotes] = useState({});
  const [email, setEmail] = useState("");

  const handleCheckboxChange = (activity) => {
    setChecked((prev) => ({
      ...prev,
      [activity]: !prev[activity],
    }));
  };

  const handleNoteChange = (activity, value) => {
    setNotes((prev) => ({
      ...prev,
      [activity]: value,
    }));
  };

  const handleSendEmail = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
  
    const morningRoutine = activities.map((activity) => ({
      name: activity.name,
      completed: checked[activity.name] || false,
      notes: notes[activity.name] || "",
      time: activity.time,
    }));
  
    try {
      const response = await axios.post("https://vibes-backend-3vt6.onrender.com/send-email", {
        email,
        morningRoutine,
      });
  
      alert(response.data.success);
    } catch (error) {
      alert("Error sending email.");
    }
  };
  
  return (
    <div className="morning-routine">
      <h2 className="title">Morning Routine Tracker</h2>
      <div className="grid">
        {activities.map((item) => (
          <div key={item.name} className="column">
            <img src={item.image} alt={item.name} className="activity-img" />
            <p><strong>Time:</strong> {item.time}</p>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={checked[item.name] || false}
                onChange={() => handleCheckboxChange(item.name)}
              />
              {checked[item.name] ? "Yes" : "No"}
            </label>
            <textarea
              className="ruled-paper"
              placeholder={`Notes on ${item.name}...`}
              value={notes[item.name] || ""}
              onChange={(e) => handleNoteChange(item.name, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="email-section">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
        />
        <button className="save-button" onClick={handleSendEmail}>Save & Send Email</button>
      </div>
    </div>
  );
};

export default Morning;
