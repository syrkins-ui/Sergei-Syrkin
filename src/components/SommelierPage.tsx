import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Language } from '../data/translations';
import {
  SOMMELIER_DATA,
  TastingLanguageChoice,
  TastingTopicId,
} from '../data/sommelierData';
import { BAR_DATA, getWhatsAppReservationUrl } from '../data/barInfo';
import {
  ArrowLeft,
  MessageCircle,
  GraduationCap,
  Share2,
  Check,
  CheckCircle2,
  AlertCircle,
  Copy,
  RotateCcw,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';

interface SommelierPageProps {
  lang: Language;
  onBackToHome: () => void;
}

interface SubmittedSommelierRequest {
  fullName: string;
  phone: string;
  email: string;
  tastingLangLabel: string;
  guests: number;
  topicLabel: string;
  preferredDateDisplay: string;
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

function getBuenosAiresToday(): { iso: string; year: number; monthIndex0: number; day: number } {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Argentina/Buenos_Aires',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(new Date());
    const getNum = (t: string) => Number(parts.find((p) => p.type === t)?.value || 0);
    const year = getNum('year');
    const month = getNum('month');
    const day = getNum('day');
    return {
      iso: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      year,
      monthIndex0: month - 1,
      day,
    };
  } catch {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return {
      iso: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      year,
      monthIndex0: month - 1,
      day,
    };
  }
}

function toIsoDate(year: number, monthIndex0: number, day: number): string {
  return `${year}-${String(monthIndex0 + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function formatLocalizedDate(iso: string, lang: Language): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1, 12, 0, 0);
  try {
    const text = new Intl.DateTimeFormat(LOCALE_MAP[lang], {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(dt);
    return text.charAt(0).toUpperCase() + text.slice(1);
  } catch {
    return iso;
  }
}

function formatMonthHeading(year: number, monthIndex0: number, lang: Language): string {
  const dt = new Date(year, monthIndex0, 1, 12, 0, 0);
  try {
    const text = new Intl.DateTimeFormat(LOCALE_MAP[lang], {
      month: 'long',
      year: 'numeric',
    }).format(dt);
    return text.charAt(0).toUpperCase() + text.slice(1);
  } catch {
    return `${year}-${String(monthIndex0 + 1).padStart(2, '0')}`;
  }
}

export const SommelierPage: React.FC<SommelierPageProps> = ({ lang, onBackToHome }) => {
  const sommelier = SOMMELIER_DATA[lang] || SOMMELIER_DATA.ES;
  const f = sommelier.form;

  const [copiedLink, setCopiedLink] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  const todayInfo = useMemo(() => getBuenosAiresToday(), []);

  // Tasting inquiry form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [tastingLang, setTastingLang] = useState<TastingLanguageChoice>(() =>
    lang === 'RU' || lang === 'EN' || lang === 'ES' ? lang : 'ES'
  );
  const [guests, setGuests] = useState<string>('4');
  const [topic, setTopic] = useState<TastingTopicId>('sparkling');
  const [customTopic, setCustomTopic] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [viewYear, setViewYear] = useState(todayInfo.year);
  const [viewMonth, setViewMonth] = useState(todayInfo.monthIndex0);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<SubmittedSommelierRequest | null>(null);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (ev: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(ev.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const calendarDays = useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1, 12, 0, 0);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const startOffset = (firstOfMonth.getDay() + 6) % 7;

    const cells: Array<{ iso: string | null; dayNumber: number | null; isPast: boolean }> = [];
    for (let i = 0; i < startOffset; i++) {
      cells.push({ iso: null, dayNumber: null, isPast: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = toIsoDate(viewYear, viewMonth, d);
      cells.push({ iso, dayNumber: d, isPast: iso < todayInfo.iso });
    }
    return cells;
  }, [viewYear, viewMonth, todayInfo.iso]);

  const minMonthIdx = todayInfo.year * 12 + todayInfo.monthIndex0;
  const maxMonthIdx = minMonthIdx + 6;
  const currentMonthIdx = viewYear * 12 + viewMonth;
  const canGoPrev = currentMonthIdx > minMonthIdx;
  const canGoNext = currentMonthIdx < maxMonthIdx;

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (!canGoNext) return;
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${sommelier.name} · ${sommelier.roleSubtitle}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const parsedGuests = Number(guests);
    const trimmedDate = preferredDate.trim();
    const trimmedCustomTopic = customTopic.trim();

    if (trimmedName.length < 2) {
      setFormError(f.validationNameError);
      return;
    }
    if (!/^[+\d()\s-]{6,28}$/.test(trimmedPhone)) {
      setFormError(f.validationPhoneError);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      setFormError(f.validationEmailError);
      return;
    }
    if (!Number.isInteger(parsedGuests) || parsedGuests < 1 || parsedGuests > 25) {
      setFormError(f.validationGuestsError);
      return;
    }
    if (!trimmedDate) {
      setFormError(f.validationDateError);
      return;
    }

    const tastingLangLabel =
      f.tastingLangOptions.find((opt) => opt.id === tastingLang)?.label || tastingLang;
    const baseTopicLabel =
      f.topicOptions.find((opt) => opt.id === topic)?.label || topic;
    const topicLabel =
      topic === 'other' && trimmedCustomTopic
        ? `${baseTopicLabel}: ${trimmedCustomTopic}`
        : baseTopicLabel;
    const preferredDateDisplay = formatLocalizedDate(trimmedDate, lang);

    const lines = [
      f.waHeader,
      '',
      `• ${f.fullNameLabel}: ${trimmedName}`,
      `• ${f.phoneLabel}: ${trimmedPhone}`,
      `• ${f.emailLabel}: ${trimmedEmail}`,
      `• ${f.tastingLangLabel}: ${tastingLangLabel}`,
      `• ${f.guestsLabel}: ${parsedGuests}`,
      `• ${f.topicLabel}: ${topicLabel}`,
      `• ${f.dateLabel}: ${preferredDateDisplay}`,
      '',
      f.waFooter,
    ];

    const whatsappMessage = lines.join('\n');
    const whatsappUrl = getWhatsAppReservationUrl(whatsappMessage);

    setSubmitted({
      fullName: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      tastingLangLabel,
      guests: parsedGuests,
      topicLabel,
      preferredDateDisplay,
      whatsappMessage,
      whatsappUrl,
    });
    setCopiedMsg(false);

    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyMessage = async () => {
    if (!submitted) return;
    try {
      await navigator.clipboard.writeText(submitted.whatsappMessage);
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2500);
    } catch {
      // Ignore if clipboard blocked
    }
  };

  return (
    <article className="min-h-screen bg-[#F6EFE6] text-[#2B2B2D] font-sans-clean selection:bg-[#A84452] selection:text-[#FBF7F1] pb-24">
      {/* Top Breadcrumb & Return Bar */}
      <div className="border-b border-[#2B2B2D]/10 bg-[#EDE2D4]/85 backdrop-blur-md sticky top-20 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#A84452] hover:text-[#2B2B2D] transition-colors font-semibold group cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{sommelier.backToHome}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#FBF7F1] border border-[#2B2B2D]/15 hover:border-[#A84452] text-[#2B2B2D] hover:text-[#A84452] text-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Share profile"
          >
            {copiedLink ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Share2 className="w-3.5 h-3.5 text-[#A84452]" />
            )}
            <span className="font-mono text-[11px]">{copiedLink ? '✓' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Hero Section: Portrait, Name & Quote */}
      <section className="pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[28px] overflow-hidden border border-[#2B2B2D]/12 shadow-lg bg-[#EDE2D4]">
              <img
                src={photoError ? '/images/004.png' : '/images/Polina.png'}
                alt={`${sommelier.name} · ${sommelier.roleSubtitle}`}
                referrerPolicy="no-referrer"
                onError={() => setPhotoError(true)}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#FBF7F1]/92 backdrop-blur-md border border-[#2B2B2D]/10">
                <div className="text-[11px] text-[#A84452] font-semibold">
                  {sommelier.pageTitleBadge}
                </div>
                <div className="font-editorial text-xl text-[#2B2B2D] leading-tight">
                  {sommelier.name}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Name, Roles & Quote */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-[1px] w-12 bg-[#A84452]" />
                <span className="text-xs tracking-wide text-[#A84452] font-semibold">
                  {sommelier.pageTitleBadge}
                </span>
              </div>

              <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl text-[#2B2B2D] tracking-tight leading-[0.95] text-balance">
                {sommelier.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs sm:text-sm text-[#A84452] font-medium">
                {sommelier.roles.map((role, idx) => (
                  <React.Fragment key={role}>
                    <span>{role}</span>
                    {idx < sommelier.roles.length - 1 && (
                      <span aria-hidden="true" className="text-[#2B2B2D]/30">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="p-6 sm:p-8 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10 relative overflow-hidden">
              <span
                aria-hidden="true"
                className="font-editorial text-6xl text-[#A84452]/20 absolute -top-2 left-4 select-none pointer-events-none"
              >
                “
              </span>
              <p className="font-editorial text-lg sm:text-xl lg:text-2xl text-[#2B2B2D] leading-relaxed italic relative z-10">
                {sommelier.quote}
              </p>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* About Me & Education */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2B2B2D]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* About Me */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="h-[1px] w-8 bg-[#A84452]" />
              <h2 className="text-xs tracking-widest uppercase text-[#A84452] font-semibold">
                {sommelier.aboutTitle}
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#4E4C4F] leading-relaxed">
              {sommelier.aboutParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-2.5">
              <GraduationCap className="w-4 h-4 text-[#A84452]" />
              <h2 className="text-xs tracking-widest uppercase text-[#A84452] font-semibold">
                {sommelier.educationTitle}
              </h2>
            </div>

            <div className="space-y-3">
              {sommelier.educationBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10"
                >
                  <div className="font-editorial text-xl text-[#2B2B2D] leading-snug">
                    {badge.institution}
                  </div>
                  <div className="text-xs text-[#A84452] mt-1 leading-relaxed">
                    {badge.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wine Tastings Organization at BRUT bar */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2B2B2D]/10">
        <div className="max-w-2xl mb-10">
          <div className="flex items-center space-x-3 mb-2.5">
            <div className="h-[1px] w-10 bg-[#A84452]" />
            <span className="text-xs tracking-wide text-[#A84452] font-semibold">
              {sommelier.tastingEyebrow}
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2D] tracking-tight text-balance">
            {sommelier.tastingTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sommelier.tastingHighlights.map((item) => (
            <div
              key={item.number}
              className="p-6 sm:p-7 rounded-3xl bg-[#FBF7F1] border border-[#2B2B2D]/10 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[#A84452] font-semibold tracking-widest tabular-nums">
                  {item.number}.
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#2B2B2D] leading-snug mt-3">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[#4E4C4F] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Tasting Application Form -> WhatsApp */}
      <section
        id="sommelier-booking"
        className="pt-12 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2B2B2D]/10 scroll-mt-28"
      >
        <div className="max-w-2xl mb-10">
          <div className="flex items-center space-x-3 mb-2.5">
            <div className="h-[1px] w-10 bg-[#A84452]" />
            <span className="text-xs tracking-wide text-[#A84452] font-semibold">
              {f.eyebrow}
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2D] tracking-tight text-balance">
            {f.title}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#4E4C4F] leading-relaxed">
            {f.subtitle}
          </p>
        </div>

        <div className="max-w-4xl">
          {submitted ? (
            <div className="p-6 sm:p-9 rounded-[28px] bg-[#FBF7F1] border border-[#2B2B2D]/12 space-y-6">
              <div className="pb-6 border-b border-[#2B2B2D]/10 space-y-2">
                <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#1E7E45]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{f.sentStatusLabel}</span>
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#2B2B2D] text-balance">
                  {f.sentTitle}
                </h3>
                <p className="text-sm text-[#4E4C4F] leading-relaxed">{f.sentSubtitle}</p>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div>
                  <dt className="text-xs text-[#6E6A6D]">{f.fullNameLabel}</dt>
                  <dd className="font-medium text-[#2B2B2D] mt-0.5">{submitted.fullName}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#6E6A6D]">{f.phoneLabel}</dt>
                  <dd className="font-medium text-[#2B2B2D] mt-0.5 tabular-nums">{submitted.phone}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#6E6A6D]">{f.emailLabel}</dt>
                  <dd className="font-medium text-[#2B2B2D] mt-0.5">{submitted.email}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#6E6A6D]">{f.tastingLangLabel}</dt>
                  <dd className="font-medium text-[#2B2B2D] mt-0.5">{submitted.tastingLangLabel}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#6E6A6D]">{f.guestsLabel}</dt>
                  <dd className="font-medium text-[#2B2B2D] mt-0.5 tabular-nums">{submitted.guests}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#6E6A6D]">{f.dateLabel}</dt>
                  <dd className="font-medium text-[#2B2B2D] mt-0.5">{submitted.preferredDateDisplay}</dd>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-[#2B2B2D]/8">
                  <dt className="text-xs text-[#6E6A6D]">{f.topicLabel}</dt>
                  <dd className="font-medium text-[#2B2B2D] mt-0.5">{submitted.topicLabel}</dd>
                </div>
              </dl>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={submitted.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold inline-flex items-center space-x-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                  <span>{f.openWhatsAppAgain}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="px-5 py-3.5 rounded-full bg-[#EFE5D8] hover:bg-[#E4D6C4] text-[#2B2B2D] text-xs sm:text-sm font-medium inline-flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copiedMsg ? (
                    <>
                      <Check className="w-4 h-4 text-[#1E7E45] shrink-0" />
                      <span>{f.copiedMessageButton}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 shrink-0" />
                      <span>{f.copyMessageButton}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSubmitted(null)}
                  className="px-5 py-3.5 rounded-full bg-transparent border border-[#2B2B2D]/20 hover:border-[#A84452] text-[#2B2B2D] hover:text-[#A84452] text-xs sm:text-sm font-medium inline-flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                  <span>{f.editFormButton}</span>
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleFormSubmit}
              className="p-6 sm:p-9 rounded-[28px] bg-[#FBF7F1] border border-[#2B2B2D]/10 space-y-6"
            >
              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="sommelier-fullname" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                    {f.fullNameLabel} *
                  </label>
                  <input
                    id="sommelier-fullname"
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={f.fullNamePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2B2B2D]/15 text-sm text-[#2B2B2D] placeholder:text-[#8E8A8D] focus:outline-none focus:border-[#A84452] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="sommelier-phone" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                    {f.phoneLabel} *
                  </label>
                  <input
                    id="sommelier-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={f.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2B2B2D]/15 text-sm text-[#2B2B2D] placeholder:text-[#8E8A8D] focus:outline-none focus:border-[#A84452] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="sommelier-email" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                    {f.emailLabel} *
                  </label>
                  <input
                    id="sommelier-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={f.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2B2B2D]/15 text-sm text-[#2B2B2D] placeholder:text-[#8E8A8D] focus:outline-none focus:border-[#A84452] transition-colors"
                  />
                </div>
              </div>

              {/* Language Choice */}
              <div>
                <span className="block text-xs font-medium text-[#2B2B2D] mb-2">
                  {f.tastingLangLabel} *
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {f.tastingLangOptions.map((opt) => {
                    const isSelected = tastingLang === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTastingLang(opt.id)}
                        className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? 'bg-[#2B2B2D] text-[#FBF7F1] border-[#2B2B2D]'
                            : 'bg-white text-[#2B2B2D] border-[#2B2B2D]/15 hover:border-[#A84452]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tasting Theme Choice */}
              <div className="space-y-3">
                <span className="block text-xs font-medium text-[#2B2B2D]">
                  {f.topicLabel} *
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {f.topicOptions.map((opt) => {
                    const isSelected = topic === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTopic(opt.id)}
                        className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#2B2B2D] text-[#FBF7F1] border-[#2B2B2D]'
                            : 'bg-white text-[#2B2B2D] border-[#2B2B2D]/15 hover:border-[#A84452]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {topic === 'other' && (
                  <div>
                    <label htmlFor="sommelier-custom-topic" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                      {f.customTopicLabel}
                    </label>
                    <input
                      id="sommelier-custom-topic"
                      type="text"
                      maxLength={200}
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      placeholder={f.customTopicPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#2B2B2D]/15 text-sm text-[#2B2B2D] placeholder:text-[#8E8A8D] focus:outline-none focus:border-[#A84452] transition-colors"
                    />
                  </div>
                )}
              </div>

              {/* Guests Count & Localized Calendar Date Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sommelier-guests" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                    {f.guestsLabel} *
                  </label>
                  <input
                    id="sommelier-guests"
                    type="number"
                    required
                    min={1}
                    max={25}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2B2B2D]/15 text-sm text-[#2B2B2D] tabular-nums focus:outline-none focus:border-[#A84452] transition-colors"
                  />
                  <p className="text-[11px] text-[#6E6A6D] mt-1">{f.guestsHint}</p>
                </div>

                {/* Custom Localized Date Picker (always matches active site language) */}
                <div className="relative" ref={calendarRef}>
                  <span className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                    {f.dateLabel} *
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen((open) => !open)}
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                      isCalendarOpen
                        ? 'border-[#A84452]'
                        : 'border-[#2B2B2D]/15 hover:border-[#A84452]/60'
                    }`}
                  >
                    <span className={preferredDate ? 'text-[#2B2B2D] font-medium' : 'text-[#8E8A8D]'}>
                      {preferredDate ? formatLocalizedDate(preferredDate, lang) : f.datePlaceholder}
                    </span>
                    <Calendar className="w-4 h-4 text-[#A84452] shrink-0" />
                  </button>

                  {isCalendarOpen && (
                    <div className="absolute left-0 right-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-80 p-4 rounded-2xl bg-white border border-[#2B2B2D]/15 shadow-xl z-30">
                      <div className="flex items-center justify-between mb-3">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          disabled={!canGoPrev}
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
                          disabled={!canGoNext}
                          aria-label="Next month"
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#2B2B2D] hover:bg-[#F6EFE6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 mb-1 text-center">
                        {WEEKDAY_HEADERS[lang].map((wd) => (
                          <div key={wd} className="text-[11px] font-medium text-[#6E6A6D] py-1">
                            {wd}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((cell, idx) => {
                          if (!cell.iso || cell.dayNumber === null) {
                            return <div key={`empty-${idx}`} className="h-9" />;
                          }
                          const isSelected = cell.iso === preferredDate;
                          return (
                            <button
                              key={cell.iso}
                              type="button"
                              disabled={cell.isPast}
                              onClick={() => {
                                if (!cell.iso) return;
                                setPreferredDate(cell.iso);
                                setIsCalendarOpen(false);
                              }}
                              className={`h-9 rounded-xl text-xs font-medium tabular-nums transition-colors flex items-center justify-center ${
                                isSelected
                                  ? 'bg-[#A84452] text-[#FBF7F1] font-semibold cursor-pointer'
                                  : !cell.isPast
                                    ? 'text-[#2B2B2D] hover:bg-[#EFE5D8] cursor-pointer'
                                    : 'text-[#D1CCCE] cursor-not-allowed'
                              }`}
                            >
                              {cell.dayNumber}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {formError && (
                <div className="p-3.5 rounded-xl bg-[#FEE4E2] border border-[#B42318]/20 text-xs text-[#912018] flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Submit Row */}
              <div className="pt-4 border-t border-[#2B2B2D]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-[#6E6A6D] leading-relaxed">
                  {BAR_DATA.address} · {BAR_DATA.whatsappPhoneDisplay}
                </span>

                <button
                  type="submit"
                  className="px-7 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition-colors inline-flex items-center justify-center space-x-2.5 shadow-sm cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                >
                  <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                  <span>{f.submitButton}</span>
                </button>
              </div>

              <p className="text-xs text-[#6E6A6D]">{f.redirectNote}</p>
            </form>
          )}
        </div>
      </section>
    </article>
  );
};
