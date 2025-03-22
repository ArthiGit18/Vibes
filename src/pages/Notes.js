import React, { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
    const [routines, setRoutines] = useState([]);
    const [filteredRoutines, setFilteredRoutines] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [todayRoutineExists, setTodayRoutineExists] = useState(false);

    const todayDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/routines");
                setRoutines(response.data);

                // Filter today's routine by default
                const todayRoutine = response.data.filter(routine => routine.date === todayDate);
                setFilteredRoutines(todayRoutine);
                setTodayRoutineExists(todayRoutine.length > 0);
            } catch (error) {
                console.error("❌ Error fetching routines:", error);
            }
        };

        fetchRoutines();
    }, []);

    // Function to filter by date
    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);

        if (date) {
            const filtered = routines.filter(routine => routine.date === date);
            setFilteredRoutines(filtered);
        } else {
            setFilteredRoutines(routines);
        }
    };

    return (
        <div className="Notes">
            <div className="container">
                <h2>Saved Routines</h2>

                {/* Date Filter */}
                <div className="filter-container">
                    <label>Select Date: </label>
                    <input 
                        type="date" 
                        value={selectedDate} 
                        onChange={handleDateChange} 
                    />
                </div>

                <div className="routines-container">
                    {filteredRoutines.length === 0 ? (
                        <p className="no-data-message">
                            {selectedDate ? "No routines found for this date." : 
                            "Make sure to enter today's routine!"}
                        </p>
                    ) : (
                        filteredRoutines.map((routine) => (
                            <div className="routine-item" key={routine.id}>
                               
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
