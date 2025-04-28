import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import React, { useState } from "react";

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    }
    return (<div>
        <h1>Make a Booking</h1>
        <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            />
    </div>
        
    )
}

export default Calendar;