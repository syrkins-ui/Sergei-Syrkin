import React, { useState, useMemo, useEffect } from 'react';
import { Language } from '../data/translations';
import { BLIND_TASTING_DATA, TastingFormatId } from '../data/tastingData';
import { BAR_DATA, getWhatsAppReservationUrl } from '../data/barInfo';
import { WEEKLY_SCHEDULE, DaySchedule } from '../data/scheduleData';
import {
  ArrowLeft,
  ArrowDown,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';
import { motion } from 'motion/react';

import heroTastingImg from '../assets/images/blind_tasting_hero_1795516580318.jpg';
import trayDetailImg from '../assets/images/blind_tasting_tray_detail_1795516580280.jpg';
import bonusGlassImg from '../assets/images/blind_tasting_bonus_glass_1795516579566.jpg';

interface BlindTastingPageProps {
  lang: Language;
  onBackToHome: () => void;
}

interface SubmittedBooking {
  formatId: TastingFormatId;
  formatTitle: string;
  priceUsd: number;
  guestName: string;
  guestPhone: string;
  preferredDate: string;
  formattedDate: string;
  preferredTime: string;
  notes: string;
  whatsappMessage: string;
  whatsappUrl: string;
}

const LOCALE_MAP: Record<Language, string> = {
  RU: 'ru-RU',
  ES: 'es-AR',
  PT: 'pt-BR',
  EN: 'en-US',
};

const WEEKDAY_HEADERS: Record<Language, string[]> = {
  RU: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  ES: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'],
  PT: ['Se', 'Te', 'Qa', 'Qi', 'Sx', 'Sá', 'Do'],
  EN: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
};

function getBuenosAiresNow(): { todayIso: string; year: number; month: number; day: number; minutesNow: number } {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Argentina/Buenos_Aires',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date());

    const getNum = (type: string) => Number(parts.find((p) => p.type === type)?.value || 0);
    const year = getNum('year');
    const month = getNum('month');
    const day = getNum('day');
    const rawHour = getNum('hour');
    const hour = rawHour === 24 ? 0 : rawHour;
    const minute = getNum('minute');
    const todayIso = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return { todayIso, year, month, day, minutesNow: hour * 60 + minute };
  } catch {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const todayIso = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return { todayIso, year, month, day, minutesNow: now.getHours() * 60 + now.getMinutes() };
  }
}

function toIsoDate(year: number, monthIndex0: number, day: number): string {
  return `${year}-${String(monthIndex0 + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseIsoDate(iso: string): { year: number; monthIndex0: number; day: number; dayOfWeek: number } {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1, 12, 0, 0);
  return { year: dt.getFullYear(), monthIndex0: dt.getMonth(), day: dt.getDate(), dayOfWeek: dt.getDay() };
}

function getScheduleForIsoDate(iso: string): DaySchedule | undefined {
  const { dayOfWeek } = parseIsoDate(iso);
  return WEEKLY_SCHEDULE.find((s) => s.dayIndex === dayOfWeek);
}

function getAvailableSlotsForDate(
  iso: string,
  todayIso: string,
  minutesNow: number
): string[] {
  if (iso < todayIso) return [];
  const schedule = getScheduleForIsoDate(iso);
  if (!schedule || schedule.isClosed || schedule.openHour === undefined || schedule.closeHour === undefined) {
    return [];
  }

  const startMinutes = schedule.openHour * 60;
  // Last tasting start is 1 hour before closing so guests have time for 4–5 glasses
  const lastStartMinutes = (schedule.closeHour - 1) * 60;
  const minAllowedToday = minutesNow + 30;

  const slots: string[] = [];
  for (let m = startMinutes; m <= lastStartMinutes; m += 30) {
    if (iso === todayIso && m < minAllowedToday) continue;
    const hh = String(Math.floor(m / 60)).padStart(2, '0');
    const mm = String(m % 60).padStart(2, '0');
    slots.push(`${hh}:${mm}`);
  }
  return slots;
}

function findFirstAvailableDate(todayIso: string, minutesNow: number): string {
  const { year, monthIndex0, day } = parseIsoDate(todayIso);
  for (let offset = 0; offset < 30; offset++) {
    const dt = new Date(year, monthIndex0, day + offset, 12, 0, 0);
    const iso = toIsoDate(dt.getFullYear(), dt.getMonth(), dt.getDate());
    if (getAvailableSlotsForDate(iso, todayIso, minutesNow).length > 0) {
      return iso;
    }
  }
  return todayIso;
}

function formatReadableDate(iso: string, lang: Language): string {
  const { year, monthIndex0, day } = parseIsoDate(iso);
  const dt = new Date(year, monthIndex0, day, 12, 0, 0);
  try {
    const formatted = new Intl.DateTimeFormat(LOCALE_MAP[lang], {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(dt);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  } catch {
    return iso;
  }
}

function formatMonthHeading(year: number, monthIndex0: number, lang: Language): string {
  const dt = new Date(year, monthIndex0, 1, 12, 0, 0);
  try {
    const formatted = new Intl.DateTimeFormat(LOCALE_MAP[lang], {
      month: 'long',
      year: 'numeric',
    }).format(dt);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  } catch {
    return `${year}-${String(monthIndex0 + 1).padStart(2, '0')}`;
  }
}

export const BlindTastingPage: React.FC<BlindTastingPageProps> = ({ lang, onBackToHome }) => {
  const content = BLIND_TASTING_DATA[lang] || BLIND_TASTING_DATA.ES;

  const [heroImgError, setHeroImgError] = useState(false);
  const [trayImgError, setTrayImgError] = useState(false);
  const [bonusImgError, setBonusImgError] = useState(false);

  const baNow = useMemo(() => getBuenosAiresNow(), []);
  const initialDate = useMemo(
    () => findFirstAvailableDate(baNow.todayIso, baNow.minutesNow),
    [baNow.todayIso, baNow.minutesNow]
  );

  const [selectedFormat, setSelectedFormat] = useState<TastingFormatId>('solo');
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);

  const initialParsed = parseIsoDate(initialDate);
  const [viewYear, setViewYear] = useState<number>(initialParsed.year);
  const [viewMonth, setViewMonth] = useState<number>(initialParsed.monthIndex0);

  const availableSlots = useMemo(
    () => getAvailableSlotsForDate(selectedDate, baNow.todayIso, baNow.minutesNow),
    [selectedDate, baNow.todayIso, baNow.minutesNow]
  );

  const [selectedTime, setSelectedTime] = useState<string>(() => {
    const slots = getAvailableSlotsForDate(initialDate, baNow.todayIso, baNow.minutesNow);
    return slots.includes('19:00') ? '19:00' : slots[0] || '';
  });

  // Keep selectedTime valid whenever selectedDate changes
  useEffect(() => {
    if (availableSlots.length === 0) {
      setSelectedTime('');
    } else if (!availableSlots.includes(selectedTime)) {
      setSelectedTime(availableSlots.includes('19:00') ? '19:00' : availableSlots[0]);
    }
  }, [availableSlots, selectedTime]);

  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedBooking, setSubmittedBooking] = useState<SubmittedBooking | null>(null);
  const [copied, setCopied] = useState(false);

  const whatsappInquiryUrl = getWhatsAppReservationUrl(content.whatsappInquiryMessage);

  const currentFormatOption = useMemo(
    () => content.formats.find((f) => f.id === selectedFormat) || content.formats[0],
    [content.formats, selectedFormat]
  );

  const selectedDaySchedule = useMemo(() => getScheduleForIsoDate(selectedDate), [selectedDate]);
  const readableSelectedDate = useMemo(
    () => formatReadableDate(selectedDate, lang),
    [selectedDate, lang]
  );

  // Calendar grid cells for viewYear / viewMonth (Monday-first)
  const calendarDays = useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1, 12, 0, 0);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    // JS getDay(): Sun=0, Mon=1..Sat=6 -> Mon-first offset: Mon=0..Sun=6
    const startOffset = (firstOfMonth.getDay() + 6) % 7;

    const cells: Array<{
      iso: string | null;
      dayNumber: number | null;
      isOpen: boolean;
      isClosedWeekday: boolean;
      isPast: boolean;
    }> = [];

    for (let i = 0; i < startOffset; i++) {
      cells.push({ iso: null, dayNumber: null, isOpen: false, isClosedWeekday: false, isPast: false });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const iso = toIsoDate(viewYear, viewMonth, d);
      const isPast = iso < baNow.todayIso;
      const sched = getScheduleForIsoDate(iso);
      const isClosedWeekday = Boolean(sched?.isClosed);
      const slots = getAvailableSlotsForDate(iso, baNow.todayIso, baNow.minutesNow);
      cells.push({
        iso,
        dayNumber: d,
        isOpen: slots.length > 0,
        isClosedWeekday,
        isPast,
      });
    }

    return cells;
  }, [viewYear, viewMonth, baNow.todayIso, baNow.minutesNow]);

  const minMonthIndex = baNow.year * 12 + (baNow.month - 1);
  const maxMonthIndex = minMonthIndex + 3;
  const currentViewMonthIndex = viewYear * 12 + viewMonth;
  const canGoPrevMonth = currentViewMonthIndex > minMonthIndex;
  const canGoNextMonth = currentViewMonthIndex < maxMonthIndex;

  const handlePrevMonth = () => {
    if (!canGoPrevMonth) return;
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (!canGoNextMonth) return;
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const scrollToBooking = () => {
    const el = document.getElementById('tasting-booking');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = guestName.trim();
    const trimmedPhone = guestPhone.trim();
    const trimmedNotes = notes.trim();

    if (trimmedName.length < 2) {
      setFormError(content.validationNameError);
      return;
    }
    if (!/^[+\d()\s-]{6,28}$/.test(trimmedPhone)) {
      setFormError(content.validationPhoneError);
      return;
    }
    if (!selectedDate || !selectedTime || !availableSlots.includes(selectedTime)) {
      setFormError(content.validationSlotError);
      return;
    }

    const formattedDate = formatReadableDate(selectedDate, lang);
    const lines = [
      content.waMessageHeader,
      '',
      `• ${content.summaryFormatLabel}: ${currentFormatOption.title} ($${currentFormatOption.priceUsd} USD)`,
      `• ${content.summaryDateTimeLabel}: ${formattedDate}, ${selectedTime}`,
      `• ${content.summaryGuestLabel}: ${trimmedName}`,
      `• ${content.phoneLabel}: ${trimmedPhone}`,
    ];
    if (trimmedNotes) {
      lines.push(`• ${content.summaryNotesLabel}: ${trimmedNotes}`);
    }
    lines.push('', content.waMessageFooter);

    const whatsappMessage = lines.join('\n');
    const whatsappUrl = getWhatsAppReservationUrl(whatsappMessage);

    setSubmittedBooking({
      formatId: selectedFormat,
      formatTitle: currentFormatOption.title,
      priceUsd: currentFormatOption.priceUsd,
      guestName: trimmedName,
      guestPhone: trimmedPhone,
      preferredDate: selectedDate,
      formattedDate,
      preferredTime: selectedTime,
      notes: trimmedNotes,
      whatsappMessage,
      whatsappUrl,
    });
    setCopied(false);

    // Open WhatsApp via a clean anchor navigation (avoids window.open)
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyMessage = async () => {
    if (!submittedBooking) return;
    try {
      await navigator.clipboard.writeText(submittedBooking.whatsappMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback ignored if clipboard API restricted
    }
  };

  return (
    <article className="min-h-screen bg-[#F6EFE6] text-[#2B2B2D] font-sans-clean selection:bg-[#A84452] selection:text-[#FBF7F1] pb-24">
      {/* Top Breadcrumb & Return Bar */}
      <div className="border-b border-[#2B2B2D]/10 bg-[#EDE2D4]/85 backdrop-blur-md sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#A84452] hover:text-[#2B2B2D] transition-colors font-semibold group cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{content.backToHome}</span>
          </button>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Hero Split: Blind Tasting Visual & Concise Proposition */}
      <section className="pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Blind Tasting Flight Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-5 flex"
          >
            <div className="relative w-full min-h-[360px] lg:h-full rounded-[28px] overflow-hidden border border-[#2B2B2D]/12 shadow-lg bg-[#2B2B2D]">
              {!heroImgError ? (
                <img
                  src={heroTastingImg}
                  alt={content.heroCaption}
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#3D3A3E] via-[#2B2B2D] to-[#1A191B]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs text-[#F4C7CE] font-medium tracking-wide">
                  BRUT bar · San Telmo
                </p>
                <p className="font-editorial text-xl sm:text-2xl text-[#FAF5EE] leading-snug mt-0.5">
                  {content.heroCaption}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Laconic Value Proposition, Key Figures & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-[1px] w-12 bg-[#A84452]" />
                <span className="text-xs tracking-wide text-[#A84452] font-semibold">
                  {content.eyebrow}
                </span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2B2B2D] tracking-tight leading-[1.02] text-balance">
                {content.title}
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[#4E4C4F] font-normal leading-relaxed max-w-2xl">
                {content.subtitle}
              </p>
            </div>

            {/* 3 Clear Figures (Tabular Numerals) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-5 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#A84452] font-semibold">{content.priceLabel}</div>
                  <div className="font-editorial text-3xl text-[#2B2B2D] mt-1 tabular-nums">
                    {content.priceValue}
                  </div>
                </div>
                <p className="text-xs text-[#6E6A6D] mt-2 leading-relaxed">{content.priceNote}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#A84452] font-semibold">{content.pairingLabel}</div>
                  <div className="font-editorial text-3xl text-[#2B2B2D] mt-1">
                    {content.pairingValue}
                  </div>
                </div>
                <p className="text-xs text-[#6E6A6D] mt-2 leading-relaxed">{content.pairingNote}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#A84452] font-semibold">{content.bonusLabel}</div>
                  <div className="font-editorial text-3xl text-[#2B2B2D] mt-1 tabular-nums">
                    {content.bonusValue}
                  </div>
                </div>
                <p className="text-xs text-[#6E6A6D] mt-2 leading-relaxed">{content.bonusNote}</p>
              </div>
            </div>

            {/* Primary Actions: Scroll to Booking Form + WhatsApp Inquiry */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={scrollToBooking}
                className="px-7 py-3.5 rounded-full bg-[#A84452] hover:bg-[#8E3442] text-[#FBF7F1] font-semibold text-sm transition-colors inline-flex items-center space-x-2.5 shadow-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A84452]"
              >
                <span>{content.ctaBookNow}</span>
                <ArrowDown className="w-4 h-4 shrink-0" />
              </button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition-colors inline-flex items-center space-x-2 shadow-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A84452]"
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span>{content.ctaWhatsApp}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hairline Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[1px] bg-[#2B2B2D]/10" />
      </div>

      {/* How the Game Works (3 Laconic Steps) + Pairing & Bonus Visuals */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10 max-w-2xl">
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2D] text-balance">
            {content.howTitle}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#4E4C4F] leading-relaxed">
            {content.howSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.steps.map((step) => (
            <div
              key={step.number}
              className="p-6 sm:p-7 rounded-3xl bg-[#FBF7F1] border border-[#2B2B2D]/10 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[#A84452] font-semibold tracking-widest tabular-nums">
                  {step.number}.
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#2B2B2D] leading-snug mt-3">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-[#4E4C4F] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Pair: Tray + Cheese/Jamón & 5th Bonus Glass */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl overflow-hidden bg-[#FBF7F1] border border-[#2B2B2D]/10 flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#EDE2D4]">
              {!trayImgError ? (
                <img
                  src={trayDetailImg}
                  alt={content.pairingSpotlightTitle}
                  referrerPolicy="no-referrer"
                  onError={() => setTrayImgError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#EDE2D4] to-[#DCCBBE]" />
              )}
            </div>
            <div className="p-6">
              <h3 className="font-editorial text-2xl text-[#2B2B2D]">
                {content.pairingSpotlightTitle}
              </h3>
              <p className="mt-2 text-sm text-[#4E4C4F] leading-relaxed">
                {content.pairingSpotlightText}
              </p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden bg-[#FBF7F1] border border-[#2B2B2D]/10 flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#EDE2D4]">
              {!bonusImgError ? (
                <img
                  src={bonusGlassImg}
                  alt={content.bonusSpotlightTitle}
                  referrerPolicy="no-referrer"
                  onError={() => setBonusImgError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#3D3A3E] to-[#2B2B2D]" />
              )}
            </div>
            <div className="p-6">
              <h3 className="font-editorial text-2xl text-[#2B2B2D]">
                {content.bonusSpotlightTitle}
              </h3>
              <p className="mt-2 text-sm text-[#4E4C4F] leading-relaxed">
                {content.bonusSpotlightText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hairline Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[1px] bg-[#2B2B2D]/10" />
      </div>

      {/* WhatsApp Booking Form Section */}
      <section id="tasting-booking" className="pt-14 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
        <div className="mb-10 max-w-2xl">
          <div className="flex items-center space-x-3 mb-2.5">
            <div className="h-[1px] w-10 bg-[#A84452]" />
            <span className="text-xs text-[#A84452] font-semibold tracking-wide">
              {content.formEyebrow}
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2D] text-balance">
            {content.formTitle}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#4E4C4F] leading-relaxed">
            {content.formSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column: Booking Questionnaire OR WhatsApp Ready Confirmation */}
          <div className="lg:col-span-8">
            {submittedBooking ? (
              <div className="p-6 sm:p-9 rounded-[28px] bg-[#FBF7F1] border border-[#2B2B2D]/12 space-y-6">
                <div className="pb-6 border-b border-[#2B2B2D]/10 space-y-2">
                  <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#1E7E45]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{content.sentStatusLabel}</span>
                  </div>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-[#2B2B2D] text-balance">
                    {content.sentTitle}
                  </h3>
                  <p className="text-sm text-[#4E4C4F] leading-relaxed">{content.sentSubtitle}</p>
                </div>

                {/* Summary of Submitted Questionnaire */}
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  <div>
                    <dt className="text-xs text-[#6E6A6D]">{content.summaryFormatLabel}</dt>
                    <dd className="font-medium text-[#2B2B2D] mt-0.5">{submittedBooking.formatTitle}</dd>
                  </div>

                  <div>
                    <dt className="text-xs text-[#6E6A6D]">{content.summaryAmountLabel}</dt>
                    <dd className="font-mono font-semibold text-[#2B2B2D] mt-0.5 tabular-nums">
                      ${submittedBooking.priceUsd} USD
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs text-[#6E6A6D]">{content.summaryDateTimeLabel}</dt>
                    <dd className="font-medium text-[#2B2B2D] mt-0.5 tabular-nums">
                      {submittedBooking.formattedDate} · {submittedBooking.preferredTime}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs text-[#6E6A6D]">{content.summaryGuestLabel}</dt>
                    <dd className="font-medium text-[#2B2B2D] mt-0.5">
                      {submittedBooking.guestName} · {submittedBooking.guestPhone}
                    </dd>
                  </div>

                  {submittedBooking.notes && (
                    <div className="sm:col-span-2 pt-2 border-t border-[#2B2B2D]/8">
                      <dt className="text-xs text-[#6E6A6D]">{content.summaryNotesLabel}</dt>
                      <dd className="text-sm text-[#2B2B2D] mt-0.5">{submittedBooking.notes}</dd>
                    </div>
                  )}
                </dl>

                {/* Direct Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={submittedBooking.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold inline-flex items-center space-x-2 transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                    <span>{content.openWhatsAppAgain}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="px-5 py-3.5 rounded-full bg-[#EFE5D8] hover:bg-[#E4D6C4] text-[#2B2B2D] text-xs sm:text-sm font-medium inline-flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#1E7E45] shrink-0" />
                        <span>{content.copiedMessageButton}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 shrink-0" />
                        <span>{content.copyMessageButton}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmittedBooking(null)}
                    className="px-5 py-3.5 rounded-full bg-transparent border border-[#2B2B2D]/20 hover:border-[#A84452] text-[#2B2B2D] hover:text-[#A84452] text-xs sm:text-sm font-medium inline-flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                    <span>{content.editBookingButton}</span>
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleBookingSubmit}
                className="p-6 sm:p-9 rounded-[28px] bg-[#FBF7F1] border border-[#2B2B2D]/10 space-y-7"
              >
                {/* 1. Select Format */}
                <div>
                  <label className="block text-xs font-semibold text-[#2B2B2D] mb-3">
                    {content.formatLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {content.formats.map((fmt) => {
                      const isSelected = selectedFormat === fmt.id;
                      return (
                        <button
                          key={fmt.id}
                          type="button"
                          onClick={() => setSelectedFormat(fmt.id)}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#2B2B2D] text-[#FBF7F1] border-[#2B2B2D] shadow-sm'
                              : 'bg-[#F6EFE6]/70 text-[#2B2B2D] border-[#2B2B2D]/12 hover:border-[#A84452]'
                          }`}
                        >
                          <div>
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="font-semibold text-sm leading-snug">{fmt.title}</span>
                              <span
                                className={`font-mono text-sm font-bold tabular-nums shrink-0 ${
                                  isSelected ? 'text-[#F4C7CE]' : 'text-[#A84452]'
                                }`}
                              >
                                ${fmt.priceUsd}
                              </span>
                            </div>
                            <p
                              className={`text-xs mt-1.5 leading-relaxed ${
                                isSelected ? 'text-[#F6EFE6]/80' : 'text-[#5C595D]'
                              }`}
                            >
                              {fmt.subtitle}
                            </p>
                          </div>
                          <p
                            className={`text-[11px] mt-3 pt-2 border-t ${
                              isSelected
                                ? 'border-white/15 text-[#F4C7CE]'
                                : 'border-[#2B2B2D]/10 text-[#6E6A6D]'
                            }`}
                          >
                            {fmt.detail}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Bar Working-Hours Date & Time Picker */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-1">
                  {/* Left: Interactive Open-Days Calendar */}
                  <div className="md:col-span-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#2B2B2D]">
                        <Calendar className="w-3.5 h-3.5 text-[#A84452]" />
                        <span>{content.dateLabel}</span>
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#2B2B2D]/12">
                      {/* Month Navigation */}
                      <div className="flex items-center justify-between mb-3">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          disabled={!canGoPrevMonth}
                          aria-label="Previous month"
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#2B2B2D] hover:bg-[#F6EFE6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-semibold text-[#2B2B2D]">
                          {formatMonthHeading(viewYear, viewMonth, lang)}
                        </span>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          disabled={!canGoNextMonth}
                          aria-label="Next month"
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#2B2B2D] hover:bg-[#F6EFE6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Weekday Headers */}
                      <div className="grid grid-cols-7 gap-1 mb-1.5 text-center">
                        {WEEKDAY_HEADERS[lang].map((wd, idx) => (
                          <div
                            key={wd}
                            className={`text-[11px] font-medium py-1 ${
                              idx === 0 || idx === 1 ? 'text-[#B5B0B3]' : 'text-[#6E6A6D]'
                            }`}
                          >
                            {wd}
                          </div>
                        ))}
                      </div>

                      {/* Day Cells */}
                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((cell, idx) => {
                          if (!cell.iso || cell.dayNumber === null) {
                            return <div key={`empty-${idx}`} className="h-9" />;
                          }
                          const isSelected = cell.iso === selectedDate;
                          return (
                            <button
                              key={cell.iso}
                              type="button"
                              disabled={!cell.isOpen}
                              onClick={() => cell.iso && setSelectedDate(cell.iso)}
                              className={`h-9 rounded-xl text-xs font-medium tabular-nums transition-colors flex items-center justify-center ${
                                isSelected
                                  ? 'bg-[#A84452] text-[#FBF7F1] font-semibold shadow-sm cursor-pointer'
                                  : cell.isOpen
                                    ? 'text-[#2B2B2D] hover:bg-[#EFE5D8] cursor-pointer'
                                    : cell.isClosedWeekday && !cell.isPast
                                      ? 'text-[#C2BDBF] line-through cursor-not-allowed'
                                      : 'text-[#D1CCCE] cursor-not-allowed'
                              }`}
                            >
                              {cell.dayNumber}
                            </button>
                          );
                        })}
                      </div>

                      <p className="mt-3 pt-2.5 border-t border-[#2B2B2D]/8 text-[11px] text-[#6E6A6D]">
                        {content.closedDaysNote}
                      </p>
                    </div>
                  </div>

                  {/* Right: Available Time Slots for Chosen Open Day */}
                  <div className="md:col-span-6 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#2B2B2D]">
                        <Clock className="w-3.5 h-3.5 text-[#A84452]" />
                        <span>{content.timeLabel}</span>
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#2B2B2D]/12 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Selected Day & Exact Bar Hours */}
                        <div className="pb-3 mb-3 border-b border-[#2B2B2D]/8">
                          <div className="text-sm font-semibold text-[#2B2B2D]">
                            {readableSelectedDate}
                          </div>
                          {selectedDaySchedule && !selectedDaySchedule.isClosed && (
                            <div className="text-xs text-[#6E6A6D] mt-0.5 tabular-nums">
                              {content.selectedDayHoursLabel}:{' '}
                              <span className="font-medium text-[#A84452]">
                                {selectedDaySchedule.hoursDisplay[lang]}
                              </span>
                            </div>
                          )}
                        </div>

                        {availableSlots.length > 0 ? (
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {availableSlots.map((slot) => {
                              const isSelected = selectedTime === slot;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setSelectedTime(slot)}
                                  className={`py-2 px-2 rounded-xl text-xs font-mono font-semibold tabular-nums transition-colors cursor-pointer border ${
                                    isSelected
                                      ? 'bg-[#2B2B2D] text-[#FBF7F1] border-[#2B2B2D]'
                                      : 'bg-[#F6EFE6]/70 text-[#2B2B2D] border-[#2B2B2D]/10 hover:border-[#A84452]'
                                  }`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-xs text-[#6E6A6D] py-4">{content.noSlotsLeftToday}</p>
                        )}
                      </div>

                      <p className="mt-3 pt-2.5 border-t border-[#2B2B2D]/8 text-[11px] text-[#6E6A6D]">
                        {content.lastSlotNote}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Guest Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="tasting-name" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                      {content.nameLabel} *
                    </label>
                    <input
                      id="tasting-name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder={content.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#2B2B2D]/15 text-sm text-[#2B2B2D] placeholder:text-[#8E8A8D] focus:outline-none focus:border-[#A84452] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="tasting-phone" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                      {content.phoneLabel} *
                    </label>
                    <input
                      id="tasting-phone"
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder={content.phonePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#2B2B2D]/15 text-sm text-[#2B2B2D] placeholder:text-[#8E8A8D] focus:outline-none focus:border-[#A84452] transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="tasting-notes" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                      {content.notesLabel}
                    </label>
                    <input
                      id="tasting-notes"
                      type="text"
                      maxLength={300}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={content.notesPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#2B2B2D]/15 text-sm text-[#2B2B2D] placeholder:text-[#8E8A8D] focus:outline-none focus:border-[#A84452] transition-colors"
                    />
                  </div>
                </div>

                {formError && (
                  <div className="p-3.5 rounded-xl bg-[#FEE4E2] border border-[#B42318]/20 text-xs text-[#912018] flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Total + WhatsApp Submit */}
                <div className="pt-5 border-t border-[#2B2B2D]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#6E6A6D]">{content.totalLabel}</div>
                    <div className="flex items-baseline gap-2.5 mt-0.5">
                      <span className="font-editorial text-3xl sm:text-4xl text-[#2B2B2D] tabular-nums">
                        ${currentFormatOption.priceUsd} USD
                      </span>
                      <span className="text-xs text-[#6E6A6D]">{content.payAtBarNote}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-7 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition-colors inline-flex items-center justify-center space-x-2.5 shadow-sm cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                  >
                    <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                    <span>{content.submitButton}</span>
                  </button>
                </div>

                <p className="text-xs text-[#6E6A6D] leading-relaxed">
                  {content.whatsappRedirectNote}
                </p>
              </form>
            )}
          </div>

          {/* Side Column: Selected Summary, Official Bar Hours & Direct WhatsApp Help */}
          <aside className="lg:col-span-4 space-y-5">
            <div className="p-6 sm:p-7 rounded-[28px] bg-[#EFE5D8] border border-[#2B2B2D]/10 space-y-5">
              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#2B2B2D]">
                  {currentFormatOption.title}
                </h3>
                <p className="text-xs text-[#5C595D] mt-1">{currentFormatOption.subtitle}</p>
              </div>

              <ul className="divide-y divide-[#2B2B2D]/10 border-t border-b border-[#2B2B2D]/10 text-sm text-[#3F3D40]">
                <li className="py-3 flex items-center justify-between gap-2">
                  <span>{content.priceLabel}</span>
                  <span className="font-mono font-semibold text-[#2B2B2D] tabular-nums">
                    ${currentFormatOption.priceUsd} USD
                  </span>
                </li>
                <li className="py-3 flex items-center justify-between gap-2">
                  <span>{content.summaryDateTimeLabel}</span>
                  <span className="font-medium text-[#2B2B2D] text-right tabular-nums">
                    {selectedDate} · {selectedTime || '—'}
                  </span>
                </li>
                <li className="py-3 flex items-center justify-between gap-2">
                  <span>{content.pairingLabel}</span>
                  <span className="font-medium text-[#2B2B2D]">{content.pairingValue}</span>
                </li>
                <li className="py-3 flex items-center justify-between gap-2">
                  <span>{content.bonusLabel}</span>
                  <span className="font-medium text-[#A84452]">{content.bonusValue}</span>
                </li>
              </ul>

              <div className="text-xs text-[#5C595D] space-y-1.5">
                <div className="font-semibold text-[#2B2B2D]">{BAR_DATA.name} · San Telmo</div>
                <div>{BAR_DATA.address}</div>
                <div className="pt-1 text-[11px] leading-relaxed text-[#6E6A6D]">
                  {content.hoursHint}
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Inquiry Card */}
            <div className="p-6 rounded-[28px] bg-[#FBF7F1] border border-[#2B2B2D]/10 space-y-3.5">
              <h3 className="font-editorial text-2xl text-[#2B2B2D]">
                {lang === 'RU'
                  ? 'Есть вопросы перед бронью?'
                  : lang === 'ES'
                    ? '¿Tenés dudas antes de reservar?'
                    : lang === 'PT'
                      ? 'Ficou com alguma dúvida?'
                      : 'Questions before booking?'}
              </h3>
              <p className="text-xs text-[#5C595D] leading-relaxed">
                {lang === 'RU'
                  ? 'Напишите нам в WhatsApp — расскажем про актуальную подборку игристых, свободные столики или подарочный сертификат.'
                  : lang === 'ES'
                    ? 'Escribinos por WhatsApp y te contamos sobre las etiquetas de la semana, mesas disponibles o vouchers de regalo.'
                    : lang === 'PT'
                      ? 'Fale conosco no WhatsApp para saber sobre os rótulos da semana, mesas disponíveis ou vale-presente.'
                      : 'Message us on WhatsApp for this week’s sparkling selection, table availability, or gift vouchers.'}
              </p>
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold inline-flex items-center justify-center space-x-2 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span>{content.ctaWhatsApp}</span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
};
