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
  const [completedDates, setCompletedDates] = useState([]);


  useEffect(() => {
    // Check if today's routine already exists
    const checkRoutine = async () => {
      try {
        const response = await axios.get("http://localhost:5000/check-routine");
        if (response.data.exists) {
          setIsRoutineSaved(true);
        }
      } catch (error) {
        console.error("Error checking routine:", error);
      }
    };

    checkRoutine();
  }, []);

  // const handleSaveRoutine = async () => {
  //   if (isRoutineSaved) {
  //     setPopupMessage("Today's routine has already been entered!");
  //     setTimeout(() => setPopupMessage(""), 3000);
  //     return;
  //   }

  //   const morningRoutine = activities.map((activity) => ({
  //     name: activity.name,
  //     completed: checked[activity.name] || false,
  //     notes: notes[activity.name] || "",
  //     time: activity.time,
  //   }));

  //   try {
  //     await axios.post("http://localhost:5000/save-routine", { morningRoutine });
  //     setPopupMessage("Routine saved successfully!");
  //     setIsRoutineSaved(true);
  //     setTimeout(() => setPopupMessage(""), 3000);
  //   } catch (error) {
  //     setPopupMessage("Todays Routine was already saved!");
  //     setTimeout(() => setPopupMessage(""), 3000);
  //   }
  // };
  

  const handleSaveRoutine = async () => {
    if (isRoutineSaved) {
      setPopupMessage("Today's routine has already been entered!");
      setTimeout(() => setPopupMessage(""), 3000);
      return;
    }
  
    const morningRoutine = activities.map((activity) => ({
      name: activity.name,
      completed: checked[activity.name] || false,
      notes: notes[activity.name] || "",
      time: activity.time,
    }));
  
    try {
      await axios.post("http://localhost:5000/save-routine", { morningRoutine });
  
      // Update tracker UI immediately
      setIsRoutineSaved(true);
      setPopupMessage("Routine saved successfully!");
      window.dispatchEvent(new Event("routineSaved")); // Notify Tracker component
    } catch (error) {
      setPopupMessage("Today's Routine was already saved!");
    }
  
    setTimeout(() => setPopupMessage(""), 3000);
  };
  

  useEffect(() => {
    const fetchTrackerData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tracker-summary");
        setCompletedDates(response.data.completedDates || []);
      } catch (error) {
        console.error("Error fetching tracker summary:", error);
      }
    };
  
    fetchTrackerData();
  
    // Listen for routine save event
    const updateTracker = () => fetchTrackerData();
    window.addEventListener("routineSaved", updateTracker);
  
    return () => window.removeEventListener("routineSaved", updateTracker);
  }, []);
  return (
    <div className="morning-routine">
   <h2 className="title">Morning Routine Tracker</h2>
   <Tracker />
    <div className="grid">
      {activities.map((item) => (
        <div key={item.name} className="column">
          <img src={item.image} alt={item.name} className="activity-img" />
          <p><strong>Time:</strong> {item.time}</p>
          <label>
            <input
              type="checkbox"
              checked={checked[item.name] || false}
              onChange={() => setChecked({ ...checked, [item.name]: !checked[item.name] })}
            />
            {checked[item.name] ? "Yes" : "No"}
          </label>
          <textarea
          className="ruled-paper"
            placeholder={`Notes on ${item.name}...`}
            value={notes[item.name] || ""}
            onChange={(e) => setNotes({ ...notes, [item.name]: e.target.value })}
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
