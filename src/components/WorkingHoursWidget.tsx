import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WEEKLY_SCHEDULE, SCHEDULE_LABELS } from '../data/scheduleData';
import { Language } from '../data/translations';
import { Clock, ChevronDown, Calendar, CheckCircle2, XCircle } from 'lucide-react';

interface WorkingHoursWidgetProps {
  lang: Language;
  variant?: 'card' | 'footer';
}

export const WorkingHoursWidget: React.FC<WorkingHoursWidgetProps> = ({ lang, variant = 'card' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine current day of week
  const todayIndex = new Date().getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  const currentHour = new Date().getHours();

  // Find today's schedule
  const todaySchedule = WEEKLY_SCHEDULE.find((item) => item.dayIndex === todayIndex) || WEEKLY_SCHEDULE[0];

  // Determine if open right now
  let isOpenNow = false;
  if (!todaySchedule.isClosed && todaySchedule.openHour !== undefined && todaySchedule.closeHour !== undefined) {
    if (todaySchedule.closeHour === 24) {
      isOpenNow = currentHour >= todaySchedule.openHour;
    } else {
      isOpenNow = currentHour >= todaySchedule.openHour && currentHour < todaySchedule.closeHour;
    }
  }

  const todayLabel = SCHEDULE_LABELS.today[lang] || SCHEDULE_LABELS.today['ES'];
  const todayDayName = todaySchedule.dayName[lang] || todaySchedule.dayName['ES'];
  const todayHours = todaySchedule.hoursDisplay[lang] || todaySchedule.hoursDisplay['ES'];

  if (variant === 'footer') {
    return (
      <div className="text-xs font-sans-clean">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left flex items-center justify-between group p-2.5 rounded-xl bg-[#580714]/80 border border-[#FFF8F2]/15 hover:border-[#E5C07B]/50 transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#E5C07B] shrink-0" />
            <div>
              <div className="text-[10px] text-[#E5C07B] uppercase tracking-wider font-semibold">
                {SCHEDULE_LABELS.scheduleTitle[lang]}
              </div>
              <div className="text-[#FFF8F2] font-medium">
                {todayLabel} ({todayDayName}): <span className="text-[#E5C07B]">{todayHours}</span>
              </div>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[#E5C07B] transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-2 p-3 rounded-xl bg-[#580714] border border-[#FFF8F2]/15 space-y-1.5"
            >
              {WEEKLY_SCHEDULE.map((item) => {
                const isToday = item.dayIndex === todayIndex;
                return (
                  <div
                    key={item.dayIndex}
                    className={`flex items-center justify-between py-1 px-2 rounded-lg text-xs ${
                      isToday
                        ? 'bg-[#E5C07B]/20 border border-[#E5C07B]/40 text-[#FFF8F2] font-semibold'
                        : 'text-[#FFF8F2]/80'
                    }`}
                  >
                    <span className="flex items-center space-x-1.5">
                      <span>{item.dayName[lang] || item.dayName['ES']}</span>
                      {isToday && (
                        <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-[#E5C07B] text-[#580714] font-bold">
                          {todayLabel}
                        </span>
                      )}
                    </span>
                    <span className={item.isClosed ? 'text-[#FFF8F2]/50 italic' : 'text-[#E5C07B]'}>
                      {item.hoursDisplay[lang] || item.hoursDisplay['ES']}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="w-full font-sans-clean">
      {/* Collapsed Main Header Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-3.5 sm:p-4 rounded-2xl bg-[#580714]/90 border border-[#FFF8F2]/20 hover:border-[#E5C07B] transition-all duration-300 shadow-lg group cursor-pointer"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Clock Icon + Status */}
          <div className="flex items-center space-x-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-[#7A0C1E] border border-[#E5C07B]/30 shrink-0">
              <Clock className="w-5 h-5 text-[#E5C07B]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center space-x-2 text-[11px] text-[#E5C07B] font-mono uppercase tracking-wider font-semibold">
                <span>{SCHEDULE_LABELS.scheduleTitle[lang]}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B]/60" />
                <span className="flex items-center space-x-1 text-[10px]">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOpenNow ? 'bg-[#34A853] animate-pulse' : 'bg-[#E5C07B]/40'
                    }`}
                  />
                  <span>
                    {isOpenNow
                      ? SCHEDULE_LABELS.openNow[lang]
                      : todaySchedule.isClosed
                      ? SCHEDULE_LABELS.closedNow[lang]
                      : todaySchedule.hoursDisplay[lang]}
                  </span>
                </span>
              </div>

              <div className="text-sm sm:text-base font-editorial text-[#FFF8F2] truncate mt-0.5">
                {todayLabel} ({todayDayName}):{' '}
                <strong className={todaySchedule.isClosed ? 'text-[#FFF8F2]/60 font-sans-clean font-normal italic' : 'text-[#E5C07B]'}>
                  {todayHours}
                </strong>
              </div>
            </div>
          </div>

          {/* Right: Expand Trigger Chevron + Hint */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[11px] text-[#E5C07B] font-mono hidden md:inline-block group-hover:underline">
              {isExpanded
                ? SCHEDULE_LABELS.clickToCollapse[lang]
                : SCHEDULE_LABELS.clickToExpand[lang]}
            </span>
            <div className="p-1.5 rounded-full bg-[#7A0C1E] border border-[#FFF8F2]/20 group-hover:border-[#E5C07B] transition-colors">
              <ChevronDown
                className={`w-4 h-4 text-[#E5C07B] transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>

        </div>
      </button>

      {/* Expandable Weekly Schedule Table */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-4 rounded-2xl bg-[#580714] border border-[#E5C07B]/30 shadow-2xl space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#FFF8F2]/10 text-xs font-mono uppercase text-[#E5C07B]">
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Día de la semana</span>
                </span>
                <span>Horario</span>
              </div>

              <div className="space-y-1.5">
                {WEEKLY_SCHEDULE.map((item) => {
                  const isToday = item.dayIndex === todayIndex;
                  return (
                    <div
                      key={item.dayIndex}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm transition-all ${
                        isToday
                          ? 'bg-[#E5C07B]/15 border border-[#E5C07B] text-[#FFF8F2] font-semibold shadow-md'
                          : 'bg-[#7A0C1E]/40 border border-[#FFF8F2]/5 text-[#FFF8F2]/80 hover:bg-[#7A0C1E]/80'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {isToday ? (
                          <CheckCircle2 className="w-4 h-4 text-[#E5C07B]" />
                        ) : item.isClosed ? (
                          <XCircle className="w-4 h-4 text-[#FFF8F2]/30" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-[#E5C07B]/40" />
                        )}
                        <span>{item.dayName[lang] || item.dayName['ES']}</span>
                        {isToday && (
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#E5C07B] text-[#580714] font-bold font-mono">
                            {todayLabel}
                          </span>
                        )}
                      </div>

                      <div className="font-mono text-xs sm:text-sm">
                        {item.isClosed ? (
                          <span className="text-[#FFF8F2]/40 italic">
                            {item.hoursDisplay[lang] || item.hoursDisplay['ES']}
                          </span>
                        ) : (
                          <span className={isToday ? 'text-[#E5C07B] font-bold' : 'text-[#FFF8F2]'}>
                            {item.hoursDisplay[lang] || item.hoursDisplay['ES']}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
