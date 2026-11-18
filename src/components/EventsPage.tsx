import React, { useState } from 'react';
import { Language } from '../data/translations';
import { EVENTS_DATA } from '../data/eventsData';
import { BAR_DATA, IMAGES, getWhatsAppReservationUrl } from '../data/barInfo';
import { ArrowLeft, MessageCircle, Users, Sparkles, Utensils, Wine } from 'lucide-react';
import { motion } from 'motion/react';

interface EventsPageProps {
  lang: Language;
  onBackToHome: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ lang, onBackToHome }) => {
  const content = EVENTS_DATA[lang] || EVENTS_DATA['ES'];
  const [heroImgError, setHeroImgError] = useState(false);

  const whatsappUrl = getWhatsAppReservationUrl(content.whatsappMessage);

  return (
    <article className="min-h-screen bg-[#7A0C1E] text-[#FFF8F2] font-sans-clean selection:bg-[#FFF8F2] selection:text-[#7A0C1E] pb-24">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="border-b border-[#FFF8F2]/10 bg-[#580714]/60 backdrop-blur-md sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#E5C07B] hover:text-[#FFF8F2] transition-colors font-semibold group cursor-pointer"
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
            <div className="relative w-full min-h-[380px] lg:h-full rounded-[28px] overflow-hidden border border-[#E5C07B]/40 shadow-2xl bg-[#180307] group">
              {!heroImgError ? (
                <img
                  src="/images/003.png"
                  alt={content.hallCaption}
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#2B0309] via-[#120205] to-black" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs text-[#E5C07B] font-medium tracking-wide">
                  BRUT bar · San Telmo
                </p>
                <p className="font-editorial text-xl sm:text-2xl text-[#FFF8F2] leading-snug mt-0.5">
                  {content.hallCaption}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Title, Concept & Primary WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-[1px] w-12 bg-[#E5C07B]" />
                <span className="text-xs uppercase tracking-widest text-[#E5C07B] font-medium">
                  {content.eyebrow}
                </span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#FFF8F2] tracking-tight leading-[1.02] text-balance">
                {content.title}
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[#FFF8F2]/85 font-light leading-relaxed max-w-2xl">
                {content.subtitle}
              </p>
            </div>

            {/* Key Figures Strip (Tabular Numerals) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {content.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#580714]/80 border border-[#FFF8F2]/15 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#E5C07B] font-medium">
                      {metric.label}
                    </div>
                    <div className="font-editorial text-3xl text-[#FFF8F2] mt-1.5 tabular-nums">
                      {metric.value}
                    </div>
                  </div>
                  <p className="text-xs text-[#FFF8F2]/70 font-light mt-2 leading-relaxed">
                    {metric.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Primary WhatsApp Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition-colors inline-flex items-center space-x-2.5 shadow-xl whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF8F2]"
              >
                <MessageCircle className="w-5 h-5 fill-current shrink-0" />
                <span>{content.ctaButtonWhatsApp}</span>
              </a>

              <span className="text-xs text-[#FFF8F2]/65 font-light">
                {BAR_DATA.address} · {BAR_DATA.whatsappPhoneDisplay}
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Hairline Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[1px] bg-[#FFF8F2]/15" />
      </div>

      {/* Turnkey Event Features Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10 max-w-2xl">
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#FFF8F2] text-balance">
            {content.includedTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#FFF8F2]/75 font-light leading-relaxed">
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
              className="p-6 sm:p-8 rounded-3xl bg-[#580714]/65 border border-[#FFF8F2]/15 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#E5C07B] tracking-widest tabular-nums">
                    {feat.number}.
                  </span>
                  {idx === 0 && <Users className="w-4 h-4 text-[#E5C07B]/80" />}
                  {idx === 1 && <Utensils className="w-4 h-4 text-[#E5C07B]/80" />}
                  {idx === 2 && <Wine className="w-4 h-4 text-[#E5C07B]/80" />}
                  {idx === 3 && <Sparkles className="w-4 h-4 text-[#E5C07B]/80" />}
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#FFF8F2] leading-snug">
                  {feat.title}
                </h3>
                <p className="mt-3 text-sm text-[#FFF8F2]/80 font-light leading-relaxed">
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
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#FFF8F2]/15 bg-[#580714]">
              <img
                src="/images/004.png"
                alt="BRUT bar celebration ambiance"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#FFF8F2]/15 bg-[#580714]">
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
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#FFF8F2]">
              {content.occasionsTitle}
            </h3>
            <ul className="divide-y divide-[#FFF8F2]/10 border-t border-b border-[#FFF8F2]/10">
              {content.occasions.map((occasion, index) => (
                <li
                  key={index}
                  className="py-3.5 text-sm sm:text-base text-[#FFF8F2]/85 font-light flex items-baseline gap-3"
                >
                  <span className="font-mono text-xs text-[#E5C07B] tabular-nums shrink-0">
                    0{index + 1}
                  </span>
                  <span>{occasion}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Bottom Final WhatsApp CTA Block */}
      <section className="pt-12 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-[32px] bg-[#580714] border border-[#E5C07B]/35 shadow-2xl space-y-5">
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#FFF8F2] text-balance">
            {content.ctaHeading}
          </h2>
          <p className="text-sm sm:text-base text-[#FFF8F2]/80 font-light max-w-xl mx-auto leading-relaxed">
            {content.ctaText}
          </p>
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm sm:text-base transition-colors inline-flex items-center space-x-2.5 shadow-xl whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF8F2]"
            >
              <MessageCircle className="w-5 h-5 fill-current shrink-0" />
              <span>{content.ctaButtonWhatsApp}</span>
            </a>
          </div>
        </div>
      </section>

    </article>
  );
};
