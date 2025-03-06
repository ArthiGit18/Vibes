import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../CalenderStyles.css"

const CalendarWithNotes = () => {
  const [events, setEvents] = useState([]);
  
  const handleDateClick = (info) => {
    const note = prompt(`Add a note for ${info.dateStr}:`);
    if (note) {
      setEvents([...events, { title: note, date: info.dateStr }]);
    }
  };

  return (
    <div className="calendar-container">
      <h2>Click on a date to add a note</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        height="200px" // Reduce height
        contentHeight="auto"
      />
    </div>
  );
};

export default CalendarWithNotes;
