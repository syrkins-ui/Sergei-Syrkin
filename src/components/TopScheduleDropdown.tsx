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
        className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E5C07B]/40 hover:border-[#E5C07B] bg-[#580714]/85 hover:bg-[#580714] backdrop-blur-md text-[#FFF8F2] hover:text-[#E5C07B] transition-all text-xs font-mono tracking-wide cursor-pointer shadow-md group"
        aria-label="Hours of operation / Status"
        aria-expanded={isOpen}
      >
        <span className="w-2 h-2 rounded-full bg-[#E5C07B] animate-pulse shrink-0" />
        <span className="font-semibold text-[#E5C07B]">
          {IS_CLOSED_FOR_RENOVATION ? SCHEDULE_LABELS.renovationTitle[lang] : `${todayDayName}: ${todayHours}`}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#E5C07B] transition-transform duration-200 shrink-0 ${
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
            className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl bg-[#580714] border border-[#E5C07B]/30 shadow-2xl p-3 z-[100] backdrop-blur-xl"
          >
            {IS_CLOSED_FOR_RENOVATION ? (
              <div className="space-y-3">
                {/* Renovation Announcement Banner */}
                <div className="p-3.5 rounded-xl bg-[#7A0C1E]/90 border border-[#E5C07B]/35 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-[#E5C07B] uppercase tracking-wider font-mono">
                      <Wrench className="w-3.5 h-3.5 text-[#E5C07B]" />
                      <span>{SCHEDULE_LABELS.renovationTitle[lang]}</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#E5C07B] text-[#580714] font-bold">
                      {SCHEDULE_LABELS.renovationBadge[lang]}
                    </span>
                  </div>
                  <p className="text-xs text-[#FFF8F2]/90 font-sans-clean font-light leading-relaxed pt-1">
                    {SCHEDULE_LABELS.renovationMessage[lang]}
                  </p>
                </div>

                {/* Days list clearly showing renovation placeholder */}
                <div className="pt-1 border-t border-[#FFF8F2]/10 space-y-1">
                  <div className="flex items-center space-x-1.5 text-[10px] uppercase font-mono tracking-wider text-[#E5C07B]/70 px-2 py-0.5">
                    <Sparkles className="w-3 h-3 text-[#E5C07B]" />
                    <span>{SCHEDULE_LABELS.scheduleTitle[lang]}</span>
                  </div>
                  {WEEKLY_SCHEDULE.map((item) => (
                    <div
                      key={item.dayIndex}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-sans-clean text-[#FFF8F2]/80 hover:bg-[#7A0C1E]/40 transition-colors"
                    >
                      <span className="font-medium">{item.dayName[lang] || item.dayName['ES']}</span>
                      <span className="font-mono text-[11px] text-[#E5C07B]/90 italic">
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
                          ? 'bg-[#E5C07B] text-[#580714] font-bold shadow-sm'
                          : 'text-[#FFF8F2] hover:bg-[#7A0C1E]'
                      }`}
                    >
                      <span>{item.dayName[lang] || item.dayName['ES']}</span>
                      <span className={`font-mono ${
                        isToday ? 'text-[#580714] font-bold' : item.isClosed ? 'text-[#FFF8F2]/50 italic' : 'text-[#E5C07B]'
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
