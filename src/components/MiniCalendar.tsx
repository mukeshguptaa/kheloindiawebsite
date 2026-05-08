import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { cn } from '../lib/utils';

interface MiniCalendarProps {
  eventDates?: number[]; // Days of the current view month that have events
  minorEventDates?: number[]; // Days with a small dot
}

export const MiniCalendar = ({ eventDates = [22, 28], minorEventDates = [20] }: MiniCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026

  const onPrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const onNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarRows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(day, "d");
      const dayNum = parseInt(formattedDate);
      const isCurrentMonth = isSameMonth(day, monthStart);
      const isEventDay = isCurrentMonth && eventDates.includes(dayNum);
      const isMinorEventDay = isCurrentMonth && minorEventDates.includes(dayNum);

      days.push(
        <div 
          key={day.toString()} 
          className={cn(
            "relative h-8 w-8 flex items-center justify-center text-[15px] select-none rounded-[8px] transition-all",
            !isCurrentMonth && "text-gray-300 dark:text-gray-700",
            isCurrentMonth && !isEventDay && "text-[#0D2040] dark:text-gray-400",
            isEventDay && "bg-[#E8621A] text-white font-bold"
          )}
        >
          {formattedDate}
          {isMinorEventDay && !isEventDay && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#E8621A] rounded-full" />
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    calendarRows.push(
      <div className="grid grid-cols-7 mb-1" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  const weekDayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="mb-8 select-none">
      <div className="flex items-center justify-between mb-6 px-1">
        <button 
          onClick={onPrevMonth}
          className="text-gray-400 hover:text-[#E8621A] transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <h4 className="text-[16px] font-bold text-[#0D2040] dark:text-white uppercase tracking-[0.05em]">
          {format(currentDate, "MMMM yyyy")}
        </h4>
        <button 
          onClick={onNextMonth}
          className="text-gray-400 hover:text-[#E8621A] transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {weekDayLabels.map((label, idx) => (
          <div key={idx} className="text-center text-[12px] font-medium text-gray-400 dark:text-gray-600 tracking-widest">
            {label}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarRows}
      </div>
    </div>
  );
};
