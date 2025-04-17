import React, { useState, useEffect } from "react";
import axios from "axios";
import Tracker from "./MyRoutine/Tracker";

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
  const [isRoutineSaved, setIsRoutineSaved] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserEmail(user.email);
      checkUserRoutine(user.email);
    }
  }, []);

  const checkUserRoutine = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/routine/check-routine?email=${email}`);
      if (response.data) {
        setIsRoutineSaved(true);
      }
    } catch (error) {
      console.error("Error checking routine:", error);
    }
  };

  const handleSaveRoutine = async () => {
    if (!userEmail) {
      setPopupMessage(<p>Please Sign Up / Sign In to continue saving your routine.</p>);
      return;
    }
    if (isRoutineSaved) {
      setPopupMessage("Today's routine has already been entered!");
      return;
    }
    const morningRoutine = activities.map((activity) => ({
      name: activity.name,
      completed: checked[activity.name] || false,
      notes: notes[activity.name] || "",
      time: activity.time,
    }));
    try {
      await axios.post("http://localhost:5000/api/save-routine", { email: userEmail, morningRoutine });
      setIsRoutineSaved(true);
      setPopupMessage("Routine saved successfully!");
    } catch (error) {
      console.error("Error saving routine:", error);
      setPopupMessage("Error saving routine. Please try again.");
    }
  };

  return (
    <div className="morning-routine">
      <h2 >Morning Routine Tracker</h2>
      <Tracker />
      <div className="grid">
        {activities.map((item) => (
          <div key={item.name} className="column">
            <img src={item.image} alt={item.name} className="activity-img" />
            <p>
              <strong>Time:</strong> {item.time}
            </p>
            <label>
              <input
                type="checkbox"
                checked={checked[item.name] || false}
                onChange={() =>
                  setChecked({ ...checked, [item.name]: !checked[item.name] })
                }
              />
              {checked[item.name] ? "Yes" : "No"}
            </label>
            <textarea
              className="ruled-paper"
              placeholder={`Notes on ${item.name}...`}
              value={notes[item.name] || ""}
              onChange={(e) =>
                setNotes({ ...notes, [item.name]: e.target.value })
              }
            />
          </div>
        ))}
      </div>
      <button className="save-button" onClick={handleSaveRoutine} disabled={isRoutineSaved}>
        {isRoutineSaved ? "Routine Already Saved" : "Save Routine"}
      </button>
      {popupMessage && <div className="popup-message">{popupMessage}</div>}
    </div>
  );
};
export default Morning;