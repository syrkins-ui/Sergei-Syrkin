import React, { useState } from 'react';
import { BAR_DATA, IMAGES } from '../data/barInfo';
import { ContentTranslation, Language } from '../data/translations';
import { TopScheduleDropdown } from './TopScheduleDropdown';
import { MessageSquare, Instagram, Navigation, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  t: ContentTranslation;
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ t, lang }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(BAR_DATA.addressFull);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-between pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-b-[40px] overflow-hidden bg-[#7A0C1E]">
      
      {/* Top Magazine Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#FFF8F2]/15 pb-6 text-[11px] sm:text-xs tracking-widest uppercase text-[#FFF8F2]/75 font-sans-clean relative z-30">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E5C07B] animate-pulse" />
          <span>San Telmo / Puerto Madero • Buenos Aires</span>
        </div>

        {/* Top Right Framed Dropdown Button for Working Hours */}
        <div>
          <TopScheduleDropdown lang={lang} />
        </div>
      </div>

      {/* Main Center Section with AD Brut Banner (Sharp edges below top border & above bottom border) */}
      <div className="relative my-4 sm:my-6 py-12 sm:py-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center overflow-hidden border-y border-[#FFF8F2]/20">
        
        {/* Full-width crisp AD Brut image background with sharp edges */}
        <div className="absolute inset-0 -z-0">
          <img
            src={IMAGES.adBrut}
            alt="AD Brut - Casa de Vinos"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-100 contrast-105"
          />
          {/* Light subtle dark gradient overlay for crystal clear text readability without turning red */}
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* HUGE CAPS CENTER TITLE */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[0.95] tracking-tight uppercase text-[#FFF8F2] max-w-5xl font-normal select-none px-2 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        >
          {t.heroTitle}
        </motion.h1>

        {/* Subtitle / Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 text-sm sm:text-base md:text-xl text-[#F9EBE0] max-w-2xl font-sans-clean font-medium leading-relaxed text-center px-4 relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        >
          {t.heroTagline}
        </motion.p>

      </div>

      {/* Action Buttons: Reserve Table (Green SMS/RCS/iMessage First), Address & Instagram */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="space-y-3 pt-6 border-t border-[#FFF8F2]/15 relative z-10"
      >
        {/* 1. GREEN BUTTON FIRST: Reserve Table via SMS / RCS / iMessage */}
        <a
          href={BAR_DATA.smsUrl}
          className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#34A853] text-white hover:bg-[#2e964a] transition-all hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-[#34A853]/25 group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-white/20 text-white shrink-0 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div className="text-left">
              <div className="font-bold text-base sm:text-xl leading-tight font-sans-clean">
                {t.heroSmsLabel}
              </div>
              <div className="text-xs sm:text-sm font-mono opacity-90 mt-0.5">
                SMS / RCS / iMessage
              </div>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-mono font-bold bg-white/20 px-3.5 py-1.5 rounded-full group-hover:translate-x-1 transition-transform">
            →
          </span>
        </a>

        {/* 2. SECOND ROW: Address & Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Address Card */}
          <div className="glass-bubble-solid rounded-2xl p-4 border border-[#FFF8F2]/20 hover:border-[#E5C07B]/60 transition-all group">
            <div className="flex items-center justify-between gap-3">
              <a
                href={BAR_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center space-x-3 text-left overflow-hidden"
              >
                <div className="p-2.5 rounded-xl bg-[#7A0C1E] border border-[#FFF8F2]/20 text-[#E5C07B] shrink-0 group-hover:scale-110 transition-transform">
                  <Navigation className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] uppercase tracking-widest text-[#E5C07B] block font-sans-clean font-semibold">
                    {t.heroAddressLabel}
                  </span>
                  <span className="font-editorial text-lg sm:text-xl text-[#FFF8F2] group-hover:text-[#E5C07B] transition-colors border-b border-dotted border-[#FFF8F2]/40 truncate block">
                    {BAR_DATA.address}
                  </span>
                </div>
              </a>

              <button
                onClick={copyAddress}
                className="p-2.5 rounded-xl bg-[#580714] border border-[#FFF8F2]/15 text-[#FFF8F2]/80 hover:text-[#FFF8F2] hover:border-[#FFF8F2]/40 text-xs transition-colors shrink-0 flex items-center space-x-1"
                title="Copiar dirección"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-[#E5C07B]" />}
                <span className="hidden sm:inline font-mono text-[11px]">{copied ? t.locationCopied : t.locationCopy}</span>
              </button>
            </div>
          </div>

          {/* Instagram Button */}
          <a
            href={BAR_DATA.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-[#580714] border border-[#FFF8F2]/20 hover:border-[#E5C07B]/60 text-[#FFF8F2] hover:bg-[#6b0919] transition-all hover:scale-[1.01] active:scale-[0.98] group"
          >
            <div className="flex items-center space-x-3">
              <Instagram className="w-5 h-5 text-[#E5C07B] shrink-0" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-[#FFF8F2]/60">{t.heroInstagramLabel}</div>
                <div className="font-medium text-sm sm:text-base text-[#E5C07B] truncate">
                  {BAR_DATA.instagramHandle}
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-[#E5C07B] group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>

        </div>

      </motion.div>

    </section>
  );
};
