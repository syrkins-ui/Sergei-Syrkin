import React, { useState } from 'react';
import { Language } from '../data/translations';
import { EVENTS_DATA, EventTypeChoice } from '../data/eventsData';
import { BAR_DATA, IMAGES, getWhatsAppReservationUrl } from '../data/barInfo';
import {
  ArrowLeft,
  ArrowDown,
  MessageCircle,
  Users,
  Sparkles,
  Utensils,
  Wine,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';
import { motion } from 'motion/react';

interface EventsPageProps {
  lang: Language;
  onBackToHome: () => void;
}

interface SubmittedEventRequest {
  eventTypeLabel: string;
  name: string;
  phone: string;
  email: string;
  guests: number;
  dateText: string;
  notes: string;
  whatsappMessage: string;
  whatsappUrl: string;
}

export const EventsPage: React.FC<EventsPageProps> = ({ lang, onBackToHome }) => {
  const content = EVENTS_DATA[lang] || EVENTS_DATA.ES;
  const f = content.form;
  const [heroImgError, setHeroImgError] = useState(false);

  // Events & Birthday questionnaire state
  const [eventType, setEventType] = useState<EventTypeChoice>('birthday');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState<string>('15');
  const [dateText, setDateText] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<SubmittedEventRequest | null>(null);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const whatsappUrl = getWhatsAppReservationUrl(content.whatsappMessage);

  const scrollToForm = () => {
    const el = document.getElementById('events-booking');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleEventFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const parsedGuests = Number(guests);
    const trimmedDate = dateText.trim();
    const trimmedNotes = notes.trim();

    if (trimmedName.length < 2) {
      setFormError(f.validationNameError);
      return;
    }
    if (!/^[+\d()\s-]{6,28}$/.test(trimmedPhone)) {
      setFormError(f.validationPhoneError);
      return;
    }
    if (!Number.isInteger(parsedGuests) || parsedGuests < 1 || parsedGuests > 35) {
      setFormError(f.validationGuestsError);
      return;
    }
    if (trimmedDate.length < 2) {
      setFormError(f.validationDateError);
      return;
    }

    const eventTypeLabel =
      f.eventTypeOptions.find((opt) => opt.id === eventType)?.label || eventType;

    const lines = [
      f.waHeader,
      '',
      `• ${f.eventTypeLabel}: ${eventTypeLabel}`,
      `• ${f.nameLabel}: ${trimmedName}`,
      `• ${f.phoneLabel}: ${trimmedPhone}`,
    ];
    if (trimmedEmail) {
      lines.push(`• ${f.emailLabel}: ${trimmedEmail}`);
    }
    lines.push(
      `• ${f.guestsLabel}: ${parsedGuests}`,
      `• ${f.dateLabel}: ${trimmedDate}`
    );
    if (trimmedNotes) {
      lines.push(`• ${f.notesLabel}: ${trimmedNotes}`);
    }
    lines.push('', f.waFooter);

    const whatsappMessage = lines.join('\n');
    const targetUrl = getWhatsAppReservationUrl(whatsappMessage);

    setSubmitted({
      eventTypeLabel,
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      guests: parsedGuests,
      dateText: trimmedDate,
      notes: trimmedNotes,
      whatsappMessage,
      whatsappUrl: targetUrl,
    });
    setCopiedMsg(false);

    const link = document.createElement('a');
    link.href = targetUrl;
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
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Hero Split: Black Hall Visual & Key Proposal */}
      <section className="pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Authentic Black Hall Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 flex"
          >
            <div className="relative w-full min-h-[380px] lg:h-full rounded-[28px] overflow-hidden border border-[#2B2B2D]/12 shadow-xl bg-[#2B2B2D] group">
              {!heroImgError ? (
                <img
                  src="/images/003.png"
                  alt={content.hallCaption}
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
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
                  {content.hallCaption}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Title, Concept & Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-[1px] w-12 bg-[#A84452]" />
                <span className="text-xs uppercase tracking-widest text-[#A84452] font-semibold">
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

            {/* Key Figures Strip (Tabular Numerals) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {content.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#A84452] font-semibold">
                      {metric.label}
                    </div>
                    <div className="font-editorial text-3xl text-[#2B2B2D] mt-1.5 tabular-nums">
                      {metric.value}
                    </div>
                  </div>
                  <p className="text-xs text-[#6E6A6D] font-normal mt-2 leading-relaxed">
                    {metric.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Primary Actions: Jump to Application Form or Direct WhatsApp */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={scrollToForm}
                className="px-7 py-3.5 rounded-full bg-[#A84452] hover:bg-[#8E3442] text-[#FBF7F1] font-semibold text-sm transition-colors inline-flex items-center space-x-2.5 shadow-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A84452]"
              >
                <span>{f.eyebrow}</span>
                <ArrowDown className="w-4 h-4 shrink-0" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition-colors inline-flex items-center space-x-2 shadow-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A84452]"
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span>{content.ctaButtonWhatsApp}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hairline Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[1px] bg-[#2B2B2D]/10" />
      </div>

      {/* Turnkey Event Features Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10 max-w-2xl">
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2D] text-balance">
            {content.includedTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4E4C4F] font-normal leading-relaxed">
            {content.includedSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.features.map((feat, idx) => (
            <motion.div
              key={feat.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#FBF7F1] border border-[#2B2B2D]/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#A84452] font-semibold tracking-widest tabular-nums">
                    {feat.number}.
                  </span>
                  {idx === 0 && <Users className="w-4 h-4 text-[#A84452]/80" />}
                  {idx === 1 && <Utensils className="w-4 h-4 text-[#A84452]/80" />}
                  {idx === 2 && <Wine className="w-4 h-4 text-[#A84452]/80" />}
                  {idx === 3 && <Sparkles className="w-4 h-4 text-[#A84452]/80" />}
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#2B2B2D] leading-snug">
                  {feat.title}
                </h3>
                <p className="mt-3 text-sm text-[#4E4C4F] font-normal leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Atmosphere Gallery & Occasions Split */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Two Supporting Venue Photos */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#2B2B2D]/10 bg-[#EDE2D4] shadow-sm">
              <img
                src="/images/004.png"
                alt="BRUT bar celebration ambiance"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#2B2B2D]/10 bg-[#EDE2D4] shadow-sm">
              <img
                src={IMAGES.adBrut}
                alt="BRUT bar sparkling wines & catering"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Ideal Occasions List */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#2B2B2D]">
              {content.occasionsTitle}
            </h3>
            <ul className="divide-y divide-[#2B2B2D]/10 border-t border-b border-[#2B2B2D]/10">
              {content.occasions.map((occasion, index) => (
                <li
                  key={index}
                  className="py-3.5 text-sm sm:text-base text-[#4E4C4F] font-normal flex items-baseline gap-3"
                >
                  <span className="font-mono text-xs text-[#A84452] font-semibold tabular-nums shrink-0">
                    0{index + 1}
                  </span>
                  <span>{occasion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Hairline Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="h-[1px] bg-[#2B2B2D]/10" />
      </div>

      {/* Full Event / Birthday Inquiry Form -> WhatsApp */}
      <section
        id="events-booking"
        className="pt-12 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
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
                  <dt className="text-xs text-[#6E6A6D]">{f.eventTypeLabel}</dt>
                  <dd className="font-medium text-[#2B2B2D] mt-0.5">{submitted.eventTypeLabel}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#6E6A6D]">{f.guestsLabel}</dt>
                  <dd className="font-medium text-[#2B2B2D] mt-0.5 tabular-nums">{submitted.guests}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#6E6A6D]">{f.nameLabel}</dt>
                  <dd className="font-medium text-[#2B2B2D] mt-0.5">{submitted.name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#6E6A6D]">{f.phoneLabel}</dt>
                  <dd className="font-medium text-[#2B2B2D] mt-0.5 tabular-nums">{submitted.phone}</dd>
                </div>
                {submitted.email && (
                  <div>
                    <dt className="text-xs text-[#6E6A6D]">{f.emailLabel}</dt>
                    <dd className="font-medium text-[#2B2B2D] mt-0.5">{submitted.email}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs text-[#6E6A6D]">{f.dateLabel}</dt>
                  <dd className="font-medium text-[#2B2B2D] mt-0.5">{submitted.dateText}</dd>
                </div>
                {submitted.notes && (
                  <div className="sm:col-span-2 pt-2 border-t border-[#2B2B2D]/8">
                    <dt className="text-xs text-[#6E6A6D]">{f.notesLabel}</dt>
                    <dd className="text-sm text-[#2B2B2D] mt-0.5">{submitted.notes}</dd>
                  </div>
                )}
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
              onSubmit={handleEventFormSubmit}
              className="p-6 sm:p-9 rounded-[28px] bg-[#FBF7F1] border border-[#2B2B2D]/10 space-y-6"
            >
              {/* Event vs Birthday Selector */}
              <div>
                <span className="block text-xs font-medium text-[#2B2B2D] mb-2">
                  {f.eventTypeLabel} *
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {f.eventTypeOptions.map((opt) => {
                    const isSelected = eventType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setEventType(opt.id)}
                        className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
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

              {/* Basic Name & Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="event-name" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                    {f.nameLabel} *
                  </label>
                  <input
                    id="event-name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={f.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2B2B2D]/15 text-sm text-[#2B2B2D] placeholder:text-[#8E8A8D] focus:outline-none focus:border-[#A84452] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="event-phone" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                    {f.phoneLabel} *
                  </label>
                  <input
                    id="event-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={f.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2B2B2D]/15 text-sm text-[#2B2B2D] placeholder:text-[#8E8A8D] focus:outline-none focus:border-[#A84452] transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="event-email" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                    {f.emailLabel}
                  </label>
                  <input
                    id="event-email"
                    type="text"
                    maxLength={140}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={f.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2B2B2D]/15 text-sm text-[#2B2B2D] placeholder:text-[#8E8A8D] focus:outline-none focus:border-[#A84452] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="event-guests" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                    {f.guestsLabel} *
                  </label>
                  <input
                    id="event-guests"
                    type="number"
                    required
                    min={1}
                    max={35}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2B2B2D]/15 text-sm text-[#2B2B2D] tabular-nums focus:outline-none focus:border-[#A84452] transition-colors"
                  />
                  <p className="text-[11px] text-[#6E6A6D] mt-1">{f.guestsHint}</p>
                </div>

                <div>
                  <label htmlFor="event-date" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                    {f.dateLabel} *
                  </label>
                  <input
                    id="event-date"
                    type="text"
                    required
                    maxLength={120}
                    value={dateText}
                    onChange={(e) => setDateText(e.target.value)}
                    placeholder={f.datePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2B2B2D]/15 text-sm text-[#2B2B2D] placeholder:text-[#8E8A8D] focus:outline-none focus:border-[#A84452] transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="event-notes" className="block text-xs font-medium text-[#2B2B2D] mb-1.5">
                    {f.notesLabel}
                  </label>
                  <input
                    id="event-notes"
                    type="text"
                    maxLength={300}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={f.notesPlaceholder}
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

              {/* Submit Row */}
              <div className="pt-4 border-t border-[#2B2B2D]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-[#6E6A6D]">
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
