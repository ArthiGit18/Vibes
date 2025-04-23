import React, { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
    const [routines, setRoutines] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date

    // Get logged-in user's email from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email || "";

    useEffect(() => {
        if (!userEmail || !selectedDate) return;
    
        console.log("Fetching routines for:", userEmail, selectedDate); // Debugging
    
        const fetchRoutines = async () => {
            try {
                const response = await axios.get("https://sweet-appreciation-production.up.railway.app/api/routines", {
                    params: { email: userEmail, date: selectedDate },
                });
    
                console.log("Response data:", response.data); // Check what data is returned
                setRoutines(response.data);
            } catch (error) {
                console.error("❌ Error fetching routines:", error);
            }
        };
    
        fetchRoutines();
    }, [userEmail, selectedDate]);

    // Function to change date and fetch data
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div className="Notes">
            <div className="container">
                <h2>Saved Routines</h2>

                {/* Date Filter */}
                <div className="filter-container">
                    <label>Select Date: </label>
                    <input type="date" value={selectedDate} onChange={handleDateChange} />
                </div>

                <div className="routines-container">
                    {routines.length === 0 ? (
                        <p className="no-data-message">No routines found for this date.</p>
                    ) : (
                        routines.map((routine) => (
                            <div className="routine-item" key={routine._id}>
                                <span className="bold-text">Date:</span> {routine.date}
                                <span className="bold-text">Morning Routine:</span>
                                <ul className="notes_list">
                                    {routine.morningRoutine.map((item, index) => (
                                        <li key={index}>
                                            <strong>{item.name}</strong> - {item.completed ? "✔️" : "❌"} | {item.notes} | {item.time}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notes;
