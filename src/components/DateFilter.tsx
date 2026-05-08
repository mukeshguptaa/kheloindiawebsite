import React from 'react';
import { cn } from '../lib/utils';

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const DateFilter = () => {
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth());
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const today = new Date();

  const checkFuture = (year: number, month: number) => {
    if (year > today.getFullYear()) return true;
    if (year === today.getFullYear() && month > today.getMonth()) return true;
    return false;
  };

  const handleYearChange = (delta: number) => {
    const newYear = selectedYear + delta;
    setSelectedYear(newYear);
    if (checkFuture(newYear, selectedMonth)) {
      setSelectedMonth(-1);
    }
  };

  const handleMonthClick = (idx: number) => {
    if (checkFuture(selectedYear, idx)) return;
    setSelectedMonth(idx);
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx = -1;
    if (e.key === 'ArrowRight') {
      nextIdx = idx + 1;
      while (nextIdx < 12 && checkFuture(selectedYear, nextIdx)) nextIdx++;
    } else if (e.key === 'ArrowLeft') {
      nextIdx = idx - 1;
      while (nextIdx >= 0 && checkFuture(selectedYear, nextIdx)) nextIdx--;
    }

    if (nextIdx >= 0 && nextIdx < 12) {
      e.preventDefault();
      const el = document.getElementById(`month-chip-${nextIdx}`);
      el?.focus();
    }
  };

  return (
    <div className="w-full mb-12">
      {/* Desktop/Tablet View (hidden < 700px) */}
      <div className="hidden md:flex w-full h-[52px] bg-white dark:bg-[#0F1A2A] rounded-full items-center px-3 overflow-hidden transition-colors">
        {/* YEAR STEPPER */}
        <div className="flex items-center gap-[10px] shrink-0 pl-[0px]">
          <button 
            type="button"
            onClick={() => handleYearChange(-1)}
            aria-label="Previous year"
            className="w-9 h-9 rounded-full bg-white dark:bg-[#1A2942] border border-[#E8E4D8] dark:border-white/10 flex items-center justify-center text-[#4B5563] dark:text-[#A0AEC0] hover:border-[#E85D1F] hover:text-[#E85D1F] transition-colors"
          >
            <span className="text-[14px]">‹</span>
          </button>
          
          <div className="min-w-[56px] text-center text-[22px] font-semibold text-[#0F1A2A] dark:text-white font-sans">
            {selectedYear}
          </div>

          <button 
            type="button"
            onClick={() => handleYearChange(1)}
            aria-label="Next year"
            className="w-9 h-9 rounded-full bg-white dark:bg-[#1A2942] border border-[#E8E4D8] dark:border-white/10 flex items-center justify-center text-[#4B5563] dark:text-[#A0AEC0] hover:border-[#E85D1F] hover:text-[#E85D1F] transition-colors"
          >
            <span className="text-[14px]">›</span>
          </button>
        </div>

        {/* SEPARATOR */}
        <div className="w-[1px] h-[28px] bg-[#E8E4D8] dark:bg-white/10 mx-2 shrink-0" />

        {/* MONTH CHIPS */}
        <div className="flex-1 flex items-center gap-2 h-full" role="radiogroup" aria-label="Month selector">
          {months.map((month, idx) => {
            const disabled = checkFuture(selectedYear, idx);
            const selected = selectedMonth === idx;
            
            return (
              <button
                id={`month-chip-${idx}`}
                key={month}
                type="button"
                onClick={() => handleMonthClick(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                aria-label={`${months[idx]} ${selectedYear}`}
                aria-checked={selected}
                aria-disabled={disabled}
                role="radio"
                tabIndex={selected ? 0 : (selectedMonth === -1 && idx === 0 ? 0 : -1)}
                className={cn(
                  "flex-1 min-w-[40px] max-w-full h-9 rounded-full border text-[14px] flex items-center justify-center transition-colors px-2 whitespace-nowrap",
                  disabled ? "bg-white dark:bg-transparent border-[#E8E4D8] dark:border-white/10 text-[#B5B0A4] dark:text-[#4A5568] cursor-not-allowed" :
                  selected ? "bg-[#E85D1F] border-[#E85D1F] text-white font-medium" :
                  "bg-white dark:bg-transparent border-[#E8E4D8] dark:border-white/10 text-[#0F1A2A] dark:text-[#B9C1CC] hover:border-[#E85D1F] dark:hover:border-[#E85D1F] hover:text-[#E85D1F] dark:hover:text-[#E85D1F] cursor-pointer"
                )}
              >
                <span className="hidden min-[1100px]:inline">{month}</span>
                <span className="min-[1100px]:hidden inline">{month.substring(0, 2)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Collapse View (< 700px) */}
      <div className="md:hidden flex flex-col gap-4">
        <div className="flex items-center justify-between bg-white dark:bg-[#0F1A2A] rounded-full h-[52px] px-4 border border-transparent dark:border-white/10 transition-colors">
          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={() => handleYearChange(-1)}
              className="text-[#4B5563] dark:text-[#A0AEC0] hover:text-[#E85D1F] text-xl"
            >‹</button>
            <span className="text-[18px] font-semibold text-[#0F1A2A] dark:text-white">{selectedYear}</span>
            <button 
              type="button"
              onClick={() => handleYearChange(1)}
              className="text-[#4B5563] dark:text-[#A0AEC0] hover:text-[#E85D1F] text-xl"
            >›</button>
          </div>
          <button 
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-[14px] font-medium text-[#0F1A2A] dark:text-[#B9C1CC] bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-full border border-[#E8E4D8] dark:border-white/10"
          >
            {selectedMonth !== -1 ? months[selectedMonth] : 'Select Month'}
            <span className={cn("transition-transform", isDropdownOpen ? "rotate-180" : "")}>▾</span>
          </button>
        </div>

        {isDropdownOpen && (
          <div className="bg-white dark:bg-[#0F1A2A] border border-[#E8E4D8] dark:border-white/10 rounded-[16px] p-4 grid grid-cols-4 gap-2 shadow-lg transition-colors">
            {months.map((month, idx) => {
              const disabled = checkFuture(selectedYear, idx);
              const selected = selectedMonth === idx;
              return (
                <button
                  key={`mobile-${month}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleMonthClick(idx)}
                  className={cn(
                    "h-10 rounded-full border text-[13px] flex items-center justify-center transition-colors",
                    disabled ? "bg-gray-50 dark:bg-white/5 border-[#E8E4D8] dark:border-white/10 text-[#B5B0A4] dark:text-[#4A5568]" :
                    selected ? "bg-[#E85D1F] border-[#E85D1F] text-white font-medium" :
                    "bg-white dark:bg-transparent border-[#E8E4D8] dark:border-white/10 text-[#0F1A2A] dark:text-[#B9C1CC] hover:border-[#E85D1F] dark:hover:border-[#E85D1F] hover:text-[#E85D1F] dark:hover:text-[#E85D1F]"
                  )}
                >
                  {month}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateFilter;
