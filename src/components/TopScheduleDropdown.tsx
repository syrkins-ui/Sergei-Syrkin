import React, { useState, useRef, useEffect } from 'react';
import { WEEKLY_SCHEDULE } from '../data/scheduleData';
import { Language } from '../data/translations';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TopScheduleDropdownProps {
  lang: Language;
}

export const TopScheduleDropdown: React.FC<TopScheduleDropdownProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine current day of week (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const todayIndex = new Date().getDay();

  // Find today's schedule
  const todaySchedule = WEEKLY_SCHEDULE.find((item) => item.dayIndex === todayIndex) || WEEKLY_SCHEDULE[0];
  const todayDayName = todaySchedule.dayName[lang] || todaySchedule.dayName['ES'];
  const todayHours = todaySchedule.hoursDisplay[lang] || todaySchedule.hoursDisplay['ES'];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left z-40" ref={containerRef}>
      
      {/* Framed Pill Button showing current day & hours + small chevron */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#FFF8F2]/30 hover:border-[#E5C07B] bg-[#580714]/70 hover:bg-[#580714] backdrop-blur-md text-[#FFF8F2] hover:text-[#E5C07B] transition-all text-xs font-mono tracking-wide cursor-pointer shadow-md"
        aria-label="Hours of operation"
        aria-expanded={isOpen}
      >
        <span className="font-medium">
          {todayDayName}: <span className="text-[#E5C07B]">{todayHours}</span>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#E5C07B] transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu listing all 7 days */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-64 sm:w-72 rounded-2xl bg-[#580714] border border-[#FFF8F2]/20 shadow-2xl p-2 z-[100] backdrop-blur-xl"
          >
            <div className="space-y-1">
              {WEEKLY_SCHEDULE.map((item) => {
                const isToday = item.dayIndex === todayIndex;
                return (
                  <div
                    key={item.dayIndex}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-sans-clean transition-colors ${
                      isToday
                        ? 'bg-[#E5C07B] text-[#580714] font-bold shadow-sm'
                        : 'text-[#FFF8F2] hover:bg-[#7A0C1E]'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      {isToday && <Check className="w-3.5 h-3.5 text-[#580714] shrink-0 stroke-[3]" />}
                      <span>{item.dayName[lang] || item.dayName['ES']}</span>
                    </div>

                    <span className={`font-mono ${
                      isToday ? 'text-[#580714] font-bold' : item.isClosed ? 'text-[#FFF8F2]/50 italic' : 'text-[#E5C07B]'
                    }`}>
                      {item.hoursDisplay[lang] || item.hoursDisplay['ES']}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
