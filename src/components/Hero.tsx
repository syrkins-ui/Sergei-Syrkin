import React, { useState, useEffect } from 'react';
import { BAR_DATA, INTERIOR_PHOTOS, getWhatsAppReservationUrl } from '../data/barInfo';
import { ContentTranslation, Language } from '../data/translations';
import { MessageCircle, Instagram, Navigation, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WineBottleCarousel } from './WineBottleCarousel';

interface HeroProps {
  t: ContentTranslation;
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ t, lang }) => {
  const [copied, setCopied] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTitle, setShowTitle] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Fade out title after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + INTERIOR_PHOTOS.length) % INTERIOR_PHOTOS.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % INTERIOR_PHOTOS.length);
  };

  const onTouchStartHandler = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMoveHandler = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 40) {
      nextSlide();
    } else if (distance < -40) {
      prevSlide();
    }
  };

  const copyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(BAR_DATA.addressFull);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-between pt-0 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-b-[40px] overflow-hidden bg-[#7A0C1E]">
      {/* Photo Carousel: Vertical 4:3 (3:4) on mobile/tablet, wide on desktop */}
      <div 
        className="relative mt-0 mb-6 sm:mb-8 -mx-4 sm:-mx-6 lg:-mx-8 aspect-[3/4] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[4/3] lg:max-h-[75vh] w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)] overflow-hidden border-b border-[#FFF8F2]/20 select-none group"
        onTouchStart={onTouchStartHandler}
        onTouchMove={onTouchMoveHandler}
        onTouchEnd={onTouchEndHandler}
      >
        {/* Active Photo with smooth fade transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={INTERIOR_PHOTOS[currentSlide].url}
              alt={INTERIOR_PHOTOS[currentSlide].alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center brightness-[0.92] contrast-105"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Overlay: Darker when title is visible, then dissolves to subtle vignette */}
        <AnimatePresence>
          {showTitle ? (
            <motion.div
              key="overlay-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1.2 } }}
              className="absolute inset-0 bg-black/45 pointer-events-none z-10"
            />
          ) : (
            <motion.div
              key="overlay-clear"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20 pointer-events-none z-10"
            />
          )}
        </AnimatePresence>

        {/* Large Multi-line Centered Title (hangs for 5s then fades away) */}
        <AnimatePresence>
          {showTitle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center z-20 pointer-events-none"
            >
              <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[112px] xl:text-[124px] text-[#FFF8F2] tracking-tight leading-[0.92] sm:leading-[0.95] max-w-5xl drop-shadow-[0_6px_28px_rgba(0,0,0,0.98)] select-none">
                La casa<br />
                de los vinos<br />
                espumantes<br />
                argentinos
              </h1>

              {/* Subtitle in clean secondary font */}
              <p className="mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#E5C07B] font-sans-clean font-semibold drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                COMIDA \ COCTELES \ VINOS
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left Arrow: pure minimalist "уголок" without circle background */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-[#E5C07B] active:text-[#FFF8F2] transition-all cursor-pointer z-20 hover:scale-110 active:scale-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 stroke-[1.25] transition-transform hover:-translate-x-1" />
        </button>

        {/* Right Arrow: pure minimalist "уголок" without circle background */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-[#E5C07B] active:text-[#FFF8F2] transition-all cursor-pointer z-20 hover:scale-110 active:scale-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
          aria-label="Next slide"
        >
          <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 stroke-[1.25] transition-transform hover:translate-x-1" />
        </button>

        {/* Bottom Pagination Dots: floating directly over image with no background container */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2.5 z-20">
          {INTERIOR_PHOTOS.map((photo, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={photo.id}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 cursor-pointer drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] ${
                  isActive
                    ? 'w-6 sm:w-7 h-1.5 sm:h-2 rounded-full bg-[#E5C07B] shadow-sm shadow-[#E5C07B]/60'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white/50 hover:bg-white/90'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>

      </div>

      {/* Action Buttons: Reserve Table (WhatsApp Green First), Address & Instagram */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="space-y-3 pt-6 border-t border-[#FFF8F2]/15 relative z-10"
      >
        {/* 1. GREEN BUTTON FIRST: Reserve Table via WhatsApp Business */}
        <a
          href={getWhatsAppReservationUrl(t.waPresetMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-[#25D366]/30 group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-black/15 text-white shrink-0 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div className="text-left">
              <div className="font-bold text-base sm:text-xl leading-tight font-sans-clean">
                {t.heroSmsLabel}
              </div>
              <div className="text-xs sm:text-sm font-mono opacity-90 mt-0.5">
                {t.heroSms}
              </div>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-mono font-bold bg-black/15 px-3.5 py-1.5 rounded-full group-hover:translate-x-1 transition-transform">
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

      {/* Wine Bottle Carousel (Directly after action buttons) */}
      <WineBottleCarousel lang={lang} />

    </section>
  );
};
