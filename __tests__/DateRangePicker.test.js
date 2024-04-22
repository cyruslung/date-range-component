import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DateRangePicker from '../src/components/DateRangePicker';

describe('renderDays function', () => {
    it('呈現當前月份的正確天數', () => {
        const testMonth = new Date(2024, 4, 22);
        const { container } = render(<DateRangePicker currentMonth={testMonth} />);
        const calendarDays = container.querySelectorAll('.calendar-day');

        expect(calendarDays.length).toBe(30);
        expect(calendarDays[1].textContent).toBe('2日');
    });
});