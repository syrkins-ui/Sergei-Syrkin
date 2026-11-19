import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WEEKLY_SCHEDULE, SCHEDULE_LABELS, IS_CLOSED_FOR_RENOVATION } from '../data/scheduleData';
import { Language } from '../data/translations';
import { Clock, ChevronDown, Calendar, Wrench, Sparkles } from 'lucide-react';

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
  if (!IS_CLOSED_FOR_RENOVATION && !todaySchedule.isClosed && todaySchedule.openHour !== undefined && todaySchedule.closeHour !== undefined) {
    if (todaySchedule.closeHour === 24) {
      isOpenNow = currentHour >= todaySchedule.openHour;
    } else {
      isOpenNow = currentHour >= todaySchedule.openHour && currentHour < todaySchedule.closeHour;
    }
  }

  const todayLabel = SCHEDULE_LABELS.today[lang] || SCHEDULE_LABELS.today['ES'];
  const todayDayName = todaySchedule.dayName[lang] || todaySchedule.dayName['ES'];
  const todayHours = todaySchedule.hoursDisplay[lang] || todaySchedule.hoursDisplay['ES'];
  const renovationTitle = SCHEDULE_LABELS.renovationTitle[lang] || SCHEDULE_LABELS.renovationTitle['ES'];
  const renovationMessage = SCHEDULE_LABELS.renovationMessage[lang] || SCHEDULE_LABELS.renovationMessage['ES'];
  const renovationBadge = SCHEDULE_LABELS.renovationBadge[lang] || SCHEDULE_LABELS.renovationBadge['ES'];

  if (variant === 'footer') {
    return (
      <div className="text-xs font-sans-clean">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left flex items-center justify-between group p-2.5 rounded-xl bg-[#FBF7F1] border border-[#2B2B2D]/12 hover:border-[#A84452]/50 transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center space-x-2 min-w-0">
            {IS_CLOSED_FOR_RENOVATION ? (
              <Wrench className="w-4 h-4 text-[#A84452] shrink-0" />
            ) : (
              <Clock className="w-4 h-4 text-[#A84452] shrink-0" />
            )}
            <div className="min-w-0">
              <div className="text-[10px] text-[#A84452] uppercase tracking-wider font-semibold">
                {SCHEDULE_LABELS.scheduleTitle[lang]}
              </div>
              <div className="text-[#2B2B2D] font-medium truncate">
                {IS_CLOSED_FOR_RENOVATION ? (
                  <span className="text-[#A84452] font-semibold">{renovationTitle}</span>
                ) : (
                  <>
                    {todayLabel} ({todayDayName}): <span className="text-[#A84452] font-semibold">{todayHours}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[#A84452] transition-transform duration-300 shrink-0 ml-2 ${
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
              className="overflow-hidden mt-2 p-3 rounded-xl bg-[#FBF7F1] border border-[#2B2B2D]/12 space-y-2.5 shadow-lg"
            >
              {IS_CLOSED_FOR_RENOVATION ? (
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-[#EFE5D8] border border-[#A84452]/20 text-[11px] leading-relaxed text-[#2B2B2D]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#A84452] uppercase font-mono">{renovationTitle}</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-[#A84452] text-[#FBF7F1] font-bold">
                        {renovationBadge}
                      </span>
                    </div>
                    {renovationMessage}
                  </div>

                  <div className="pt-1 space-y-1">
                    {WEEKLY_SCHEDULE.map((item) => (
                      <div
                        key={item.dayIndex}
                        className="flex items-center justify-between py-1 px-2 rounded-lg text-xs text-[#4E4C4F]"
                      >
                        <span>{item.dayName[lang] || item.dayName['ES']}</span>
                        <span className="text-[#A84452] font-mono text-[11px] italic">
                          {renovationTitle}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                WEEKLY_SCHEDULE.map((item) => {
                  const isToday = item.dayIndex === todayIndex;
                  return (
                    <div
                      key={item.dayIndex}
                      className={`flex items-center justify-between py-1 px-2 rounded-lg text-xs ${
                        isToday
                          ? 'bg-[#A84452]/10 border border-[#A84452]/30 text-[#2B2B2D] font-semibold'
                          : 'text-[#4E4C4F]'
                      }`}
                    >
                      <span className="flex items-center space-x-1.5">
                        <span>{item.dayName[lang] || item.dayName['ES']}</span>
                        {isToday && (
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-[#A84452] text-[#FBF7F1] font-bold">
                            {todayLabel}
                          </span>
                        )}
                      </span>
                      <span className={item.isClosed ? 'text-[#6E6A6D] italic' : 'text-[#A84452] font-medium'}>
                        {item.hoursDisplay[lang] || item.hoursDisplay['ES']}
                      </span>
                    </div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="w-full font-sans-clean">
      {/* Collapsed Minimalist Header Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left px-4 py-2.5 sm:py-3 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10 hover:border-[#A84452]/45 hover:bg-[#FFFFFF] transition-all duration-300 shadow-sm group cursor-pointer"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Left: Status indicator + small "Hoy:" + hours */}
          <div className="flex items-center space-x-2.5 min-w-0">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                isOpenNow
                  ? 'bg-[#2E9B4B] animate-pulse shadow-sm shadow-[#2E9B4B]/40'
                  : todaySchedule.isClosed
                  ? 'bg-[#C97A86]/60'
                  : 'bg-[#2E9B4B] animate-pulse'
              }`}
            />

            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A84452] font-semibold shrink-0 font-sans-clean">
              {todayLabel}:
            </span>

            <span className="font-editorial text-base sm:text-lg text-[#2B2B2D] tracking-wide truncate">
              {todayHours}
            </span>
          </div>

          {/* Right: Subtle expand chevron */}
          <div className="flex items-center space-x-1 shrink-0 text-[#A84452]/70 group-hover:text-[#A84452] transition-colors">
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isExpanded ? 'rotate-180 text-[#A84452]' : ''
              }`}
            />
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
            <div className="mt-2 p-4 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/12 shadow-lg space-y-3">
              {IS_CLOSED_FOR_RENOVATION ? (
                <>
                  <div className="p-3.5 rounded-xl bg-[#EFE5D8] border border-[#A84452]/25 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs font-bold text-[#A84452] uppercase tracking-wider font-mono">
                        <Wrench className="w-4 h-4 text-[#A84452]" />
                        <span>{renovationTitle}</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#A84452] text-[#FBF7F1] font-bold">
                        {renovationBadge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4E4C4F] font-sans-clean leading-relaxed pt-1">
                      {renovationMessage}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-[#2B2B2D]/10 text-xs font-mono uppercase text-[#A84452]">
                    <span className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{SCHEDULE_LABELS.scheduleTitle[lang]}</span>
                    </span>
                    <span>Estado</span>
                  </div>

                  <div className="space-y-1.5">
                    {WEEKLY_SCHEDULE.map((item) => (
                      <div
                        key={item.dayIndex}
                        className="flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm bg-[#F6EFE6] border border-[#2B2B2D]/8 text-[#2B2B2D]"
                      >
                        <span className="font-medium">{item.dayName[lang] || item.dayName['ES']}</span>
                        <span className="font-mono text-xs text-[#A84452] italic">
                          {renovationTitle}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-[#2B2B2D]/10 text-xs font-mono uppercase text-[#A84452]">
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
                              ? 'bg-[#A84452]/10 border border-[#A84452]/40 text-[#2B2B2D] font-semibold shadow-sm'
                              : 'bg-[#F6EFE6]/80 border border-[#2B2B2D]/6 text-[#4E4C4F] hover:bg-[#EFE5D8]'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-[#A84452]/45" />
                            <span>{item.dayName[lang] || item.dayName['ES']}</span>
                            {isToday && (
                              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#A84452] text-[#FBF7F1] font-bold font-mono">
                                {todayLabel}
                              </span>
                            )}
                          </div>

                          <div className="font-mono text-xs sm:text-sm">
                            {item.isClosed ? (
                              <span className="text-[#6E6A6D] italic">
                                {item.hoursDisplay[lang] || item.hoursDisplay['ES']}
                              </span>
                            ) : (
                              <span className={isToday ? 'text-[#A84452] font-bold' : 'text-[#2B2B2D]'}>
                                {item.hoursDisplay[lang] || item.hoursDisplay['ES']}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
