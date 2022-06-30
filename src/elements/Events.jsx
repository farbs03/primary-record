import React, { useState } from 'react'
import Calendar from '../components/Calendar'
import format from "date-fns/format";

const Events = () => {

    const date = new Date();
    const [selectedDay, setSelectedDay] = useState(format(date, 'yyyy/MM/dd'))
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());

    return (
        <div>
            <Calendar 
                date={date}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
            />
        </div>
    )
}

export default Events