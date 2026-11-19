import React, { useState, useRef, useEffect } from 'react';
import { WEEKLY_SCHEDULE, SCHEDULE_LABELS, IS_CLOSED_FOR_RENOVATION } from '../data/scheduleData';
import { Language } from '../data/translations';
import { ChevronDown, Wrench, Sparkles } from 'lucide-react';
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
      
      {/* Framed Pill Button showing renovation status + chevron */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#A84452]/30 hover:border-[#A84452] bg-[#FBF7F1] hover:bg-[#FFFFFF] backdrop-blur-md text-[#2B2B2D] hover:text-[#A84452] transition-all text-[11px] sm:text-xs font-mono tracking-wide cursor-pointer shadow-sm group shrink-0"
        aria-label="Hours of operation / Status"
        aria-expanded={isOpen}
      >
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#A84452] animate-pulse shrink-0" />
        <span className="font-semibold text-[#A84452]">
          {IS_CLOSED_FOR_RENOVATION ? SCHEDULE_LABELS.renovationTitle[lang] : `${todayDayName}: ${todayHours}`}
        </span>
        <ChevronDown
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A84452] transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu listing status & schedule details */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2.5rem)] rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/12 shadow-xl p-3 z-[100] backdrop-blur-xl"
          >
            {IS_CLOSED_FOR_RENOVATION ? (
              <div className="space-y-3">
                {/* Renovation Announcement Banner */}
                <div className="p-3.5 rounded-xl bg-[#EFE5D8] border border-[#A84452]/25 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-[#A84452] uppercase tracking-wider font-mono">
                      <Wrench className="w-3.5 h-3.5 text-[#A84452]" />
                      <span>{SCHEDULE_LABELS.renovationTitle[lang]}</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#A84452] text-[#FBF7F1] font-bold">
                      {SCHEDULE_LABELS.renovationBadge[lang]}
                    </span>
                  </div>
                  <p className="text-xs text-[#4E4C4F] font-sans-clean leading-relaxed pt-1">
                    {SCHEDULE_LABELS.renovationMessage[lang]}
                  </p>
                </div>

                {/* Days list clearly showing renovation placeholder */}
                <div className="pt-1 border-t border-[#2B2B2D]/10 space-y-1">
                  <div className="flex items-center space-x-1.5 text-[10px] uppercase font-mono tracking-wider text-[#A84452] px-2 py-0.5">
                    <Sparkles className="w-3 h-3 text-[#A84452]" />
                    <span>{SCHEDULE_LABELS.scheduleTitle[lang]}</span>
                  </div>
                  {WEEKLY_SCHEDULE.map((item) => (
                    <div
                      key={item.dayIndex}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-sans-clean text-[#2B2B2D] hover:bg-[#EFE5D8] transition-colors"
                    >
                      <span className="font-medium">{item.dayName[lang] || item.dayName['ES']}</span>
                      <span className="font-mono text-[11px] text-[#A84452] italic">
                        {SCHEDULE_LABELS.renovationTitle[lang]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                {WEEKLY_SCHEDULE.map((item) => {
                  const isToday = item.dayIndex === todayIndex;
                  return (
                    <div
                      key={item.dayIndex}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-sans-clean transition-colors ${
                        isToday
                          ? 'bg-[#A84452] text-[#FBF7F1] font-bold shadow-sm'
                          : 'text-[#2B2B2D] hover:bg-[#EFE5D8]'
                      }`}
                    >
                      <span>{item.dayName[lang] || item.dayName['ES']}</span>
                      <span className={`font-mono ${
                        isToday ? 'text-[#FBF7F1] font-bold' : item.isClosed ? 'text-[#6E6A6D] italic' : 'text-[#A84452]'
                      }`}>
                        {item.hoursDisplay[lang] || item.hoursDisplay['ES']}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
