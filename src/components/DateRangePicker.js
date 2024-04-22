import React, { useState } from 'react';
import '../styles/DateRangePicker.css';

const DateRangePicker = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleDateClick = (date) => {
        if (!startDate) {
            setStartDate(date);
        } else if (!endDate && date >= startDate) {
            setEndDate(date);
        } else {
            setStartDate(date);
            setEndDate(null);
        }
    };

    const isDisabled = (date) => {
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        return date < monthStart || date > monthEnd;
    };

    const renderDays = () => {
        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const isToday = date.toDateString() === new Date().toDateString();
            const isActive = date >= startDate && date <= endDate;
            const isDisabledDay = isDisabled(date);

            days.push(
                <div
                    key={i}
                    className={`calendar-day ${isToday ? "today" : ""} ${isActive ? "active" : ""} ${isDisabledDay ? "disabled" : ""
                        }`}
                    onClick={() => !isDisabledDay && handleDateClick(date)}
                >
                    {i}日
                </div>
            );
        }

        return days;
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div className="calendar-nav">
                    <button onClick={handlePrevMonth}>{"<"}</button>
                    <div className="calendar-month">{currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</div>
                    <button onClick={handleNextMonth}>{">"}</button>
                </div>
            </div>
            <div className="calendar-days">{renderDays()}</div>
        </div>
    );
};

export default DateRangePicker;