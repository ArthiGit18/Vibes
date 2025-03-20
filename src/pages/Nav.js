import React, { useState, useEffect } from "react";
const DateSelector = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [todayInfo, setTodayInfo] = useState({});
  
    useEffect(() => {
      const today = new Date();
      const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
      ];
  
      setTodayInfo({
        day: dayNames[today.getDay()],
        date: today.getDate(),
        month: monthNames[today.getMonth()],
        year: today.getFullYear()
      });
      
      setSelectedDate(today.getDate()); // Default selection
    }, []);
  
    // Generate the next 6 days dynamically
    const generateDays = () => {
      const daysArray = [];
      for (let i = -2; i <= 3; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
  
        const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const monthNames = [
          "January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"
        ];
  
        daysArray.push({
          day: dayNames[date.getDay()],
          date: date.getDate(),
          month: monthNames[date.getMonth()],
          year: date.getFullYear(),
        });
      }
      return daysArray;
    };
  
    return (
      <div className="date-selector">
        <div className="month-year">
          {todayInfo.month} {todayInfo.year}
        </div>
        <div className="date-container">
          {generateDays().map(({ day, date, month, year }) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`date-item ${selectedDate === date ? "selected" : ""} ${
                todayInfo.date === date && todayInfo.month === month && todayInfo.year === year
                  ? "today"
                  : ""
              }`}
            >
              <span className="day">{day}</span>
              <span className="date">{date}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };
  

export default DateSelector;
