import React, { useState, useEffect } from 'react';
import { BAR_DATA, INTERIOR_PHOTOS, getWhatsAppReservationUrl } from '../data/barInfo';
import { ContentTranslation, Language } from '../data/translations';
import { MessageCircle, Navigation, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WineBottleCarousel } from './WineBottleCarousel';
import { WorkingHoursWidget } from './WorkingHoursWidget';

interface HeroProps {
  t: ContentTranslation;
  lang: Language;
  onNavigate?: (page: 'home' | 'sommelier' | 'events' | 'tasting') => void;
}

interface HeroSlide {
  id: string;
  url: string;
  alt: string;
  imageClassName?: string;
  promo?: {
    targetPage: 'events' | 'sommelier';
    eyebrow: Record<Language, string>;
    title: Record<Language, string>;
    subtitle?: Record<Language, string>;
    ctaLabel: Record<Language, string>;
  };
}

const buildHeroSlides = (): HeroSlide[] => {
  const photos = INTERIOR_PHOTOS;
  const eventsPromo: HeroSlide = {
    id: 'promo-events',
    url: '/images/Eventos.png',
    alt: 'Eventos y cumpleaños en BRUT bar',
    imageClassName: 'object-center',
    promo: {
      targetPage: 'events',
      eyebrow: {
        RU: 'Частные события · Чёрный зал',
        ES: 'Eventos Privados · Salón Negro',
        PT: 'Eventos Privados · Salão Preto',
        EN: 'Private Events · Black Hall',
      },
      title: {
        RU: 'Мероприятия и дни рождения',
        ES: 'Eventos y cumpleaños',
        PT: 'Eventos e aniversários',
        EN: 'Events & Birthdays',
      },
      ctaLabel: {
        RU: 'Узнать цену',
        ES: 'Ver precios',
        PT: 'Ver preços',
        EN: 'See pricing',
      },
    },
  };

  const sommelierPromo: HeroSlide = {
    id: 'promo-sommelier',
    url: '/images/Polina.png',
    alt: 'Polina Schteiner — Degustaciones de vinos espumantes',
    imageClassName: 'object-[50%_26%]',
    promo: {
      targetPage: 'sommelier',
      eyebrow: {
        RU: 'Шеф-сомелье · Полина Штайнер',
        ES: 'Head Sommelier · Polina Schteiner',
        PT: 'Head Sommelier · Polina Schteiner',
        EN: 'Head Sommelier · Polina Schteiner',
      },
      title: {
        RU: 'Дегустации игристых вин',
        ES: 'Degustaciones de espumantes',
        PT: 'Degustações de espumantes',
        EN: 'Sparkling Wine Tastings',
      },
      subtitle: {
        RU: 'Авторские сеты и истории виноделен Аргентины',
        ES: 'Selecciones de autor e historias de bodegas argentinas',
        PT: 'Seleções autorais e histórias de vinícolas argentinas',
        EN: 'Curated flights & stories from Argentine wineries',
      },
      ctaLabel: {
        RU: 'Узнать подробнее',
        ES: 'Ver degustaciones',
        PT: 'Ver degustações',
        EN: 'Explore tastings',
      },
    },
  };

  // Interleave regular photos and active promo cards (keeping Brunch 1st and Gin Tonic 4th)
  const ordered: HeroSlide[] = [];
  if (photos[0]) ordered.push(photos[0]); // 1. Brunch 01
  ordered.push(eventsPromo);              // 2. Events & Birthdays (Active Promo)
  if (photos[1]) ordered.push(photos[1]); // 3. Interior 001
  if (photos[3]) ordered.push(photos[3]); // 4. Gin Tonic
  ordered.push(sommelierPromo);           // 5. Polina & Tastings (Active Promo)
  if (photos[2]) ordered.push(photos[2]); // 6. Interior 002
  if (photos[4]) ordered.push(photos[4]); // 7. Interior 003
  if (photos[5]) ordered.push(photos[5]); // 8. Interior 004
  if (photos[6]) ordered.push(photos[6]); // 9. Interior 005
  return ordered;
};

const HERO_SLIDES = buildHeroSlides();

export const Hero: React.FC<HeroProps> = ({ t, lang, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTitle, setShowTitle] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Fade out mobile intro title after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate carousel slides smoothly (pauses on hover/focus)
  useEffect(() => {
    if (isPaused) return;
    const delay = currentSlide === 0 && showTitle ? 5500 : 5200;
    const timer = setTimeout(() => {
      setShowTitle(false);
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, delay);
    return () => clearTimeout(timer);
  }, [currentSlide, isPaused, showTitle]);

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowTitle(false);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowTitle(false);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const goToSlide = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowTitle(false);
    setCurrentSlide(index);
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

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section id="hero" className="relative flex flex-col justify-between pt-5 sm:pt-7 lg:pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F6EFE6]">
      {/* Hero Top Block: Mobile vertical 3:4 carousel with fading overlay; Desktop split layout (3:4 carousel left, persistent editorial headline right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center mb-6 sm:mb-8 lg:mb-10">
        
        {/* Left Column: Framed 3:4 Vertical Photo & Active Promo Carousel */}
        <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-start">
          <div 
            className="relative w-full max-w-[480px] lg:max-w-none aspect-[3/4] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-[#2B2B2D]/12 shadow-[0_20px_50px_rgba(43,43,45,0.12)] bg-[#2B2B2D] select-none group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={onTouchStartHandler}
            onTouchMove={onTouchMoveHandler}
            onTouchEnd={onTouchEndHandler}
          >
            {/* Active Slide (Regular Photo or Interactive Promo Card) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={encodeURI(activeSlide.url)}
                  alt={activeSlide.alt}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover ${activeSlide.imageClassName || 'object-center'} brightness-[0.95] contrast-[1.03] transition-transform duration-700 ${activeSlide.promo ? 'group-hover:scale-[1.03]' : ''}`}
                />

                {/* Active Promo Card Overlay (Events & Birthdays / Polina Tastings) */}
                {activeSlide.promo && (
                  <div
                    onClick={() => onNavigate && onNavigate(activeSlide.promo!.targetPage)}
                    className="absolute inset-0 z-20 flex flex-col justify-end items-center text-center px-6 sm:px-8 pb-12 sm:pb-14 pt-16 bg-gradient-to-t from-black/88 via-black/45 to-black/10 cursor-pointer"
                  >
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#F4C7CE] font-sans-clean font-semibold mb-2.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                      {activeSlide.promo.eyebrow[lang]}
                    </span>

                    <h2 className="font-editorial text-3xl sm:text-4xl text-[#FAF5EE] tracking-tight leading-[1.02] max-w-sm text-balance drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
                      {activeSlide.promo.title[lang]}
                    </h2>

                    {activeSlide.promo.subtitle && (
                      <p className="mt-2 text-xs sm:text-[13px] text-[#FAF5EE]/85 font-sans-clean max-w-xs leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                        {activeSlide.promo.subtitle[lang]}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate && onNavigate(activeSlide.promo!.targetPage);
                      }}
                      className="mt-5 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#FBF7F1]/95 hover:bg-[#A84452] text-[#2B2B2D] hover:text-[#FBF7F1] text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap group/cta"
                    >
                      <span>{activeSlide.promo.ctaLabel[lang]}</span>
                      <span className="font-mono group-hover/cta:translate-x-0.5 transition-transform">→</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Mobile-only Dynamic Overlay: Darker while mobile intro title is visible on Slide 1 */}
            <AnimatePresence>
              {showTitle && !activeSlide.promo && (
                <motion.div
                  key="overlay-title-mobile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 1.2 } }}
                  className="lg:hidden absolute inset-0 bg-black/45 pointer-events-none z-10"
                />
              )}
            </AnimatePresence>

            {/* Subtle persistent vignette for crisp pagination dots & arrows */}
            {!activeSlide.promo && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15 pointer-events-none z-10" />
            )}

            {/* Mobile-only Overlaid Title (hangs for 5s on first slide then fades away; desktop displays persistent title on the right) */}
            <AnimatePresence>
              {showTitle && !activeSlide.promo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="lg:hidden absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 text-center z-20 pointer-events-none"
                >
                  <div className="font-editorial text-5xl sm:text-6xl text-[#FAF5EE] tracking-tight leading-[0.93] max-w-md drop-shadow-[0_6px_28px_rgba(0,0,0,0.85)] select-none">
                    La casa<br />
                    de los vinos<br />
                    espumantes<br />
                    argentinos
                  </div>

                  <p className="mt-5 text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#F4C7CE] font-sans-clean font-semibold drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                    {lang === 'RU'
                      ? 'БРАНЧИ · КОКТЕЙЛИ · ВИНА · КУХНЯ'
                      : lang === 'PT'
                        ? 'BRUNCH · COQUETÉIS · VINHOS · COMIDA'
                        : lang === 'EN'
                          ? 'BRUNCH · COCKTAILS · WINES · CUISINE'
                          : 'BRUNCH · CÓCTELES · VINOS · COMIDA'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Left Arrow: pure minimalist chevron */}
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-2 sm:left-3.5 top-1/2 -translate-y-1/2 p-2 text-white/85 hover:text-[#F4C7CE] active:text-white transition-all cursor-pointer z-30 hover:scale-110 active:scale-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.25] transition-transform hover:-translate-x-1" />
            </button>

            {/* Right Arrow: pure minimalist chevron */}
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2 p-2 text-white/85 hover:text-[#F4C7CE] active:text-white transition-all cursor-pointer z-30 hover:scale-110 active:scale-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]"
              aria-label="Next slide"
            >
              <ChevronRight className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.25] transition-transform hover:translate-x-1" />
            </button>

            {/* Bottom Pagination Dots */}
            <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-30">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={(e) => goToSlide(index, e)}
                    className={`transition-all duration-300 cursor-pointer drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] ${
                      isActive
                        ? 'w-6 sm:w-7 h-1.5 sm:h-2 rounded-full bg-[#F4C7CE] shadow-sm shadow-[#F4C7CE]/50'
                        : 'w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white/55 hover:bg-white/95'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (Desktop Persistent Editorial Headline & Subtitle) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="hidden lg:flex lg:col-span-7 xl:col-span-7 flex-col items-start justify-center text-left pl-2 xl:pl-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-[1px] w-10 bg-[#A84452]" />
            <span className="text-xs uppercase tracking-[0.28em] text-[#A84452] font-semibold font-sans-clean">
              San Telmo · Buenos Aires
            </span>
          </div>

          <h1 className="font-editorial text-[68px] xl:text-[84px] text-[#2B2B2D] tracking-tight leading-[0.94] select-none">
            La casa<br />
            de los vinos<br />
            espumantes<br />
            argentinos
          </h1>

          <div className="mt-8 pt-6 border-t border-[#2B2B2D]/12 w-full max-w-lg space-y-3">
            <p className="text-xs xl:text-[13px] uppercase tracking-[0.26em] text-[#A84452] font-sans-clean font-semibold">
              {lang === 'RU'
                ? 'БРАНЧИ · КОКТЕЙЛИ · ВИНА · КУХНЯ'
                : lang === 'PT'
                  ? 'BRUNCH · COQUETÉIS · VINHOS · GASTRONOMIA'
                  : lang === 'EN'
                    ? 'BRUNCH · COCKTAILS · WINES · CUISINE'
                    : 'BRUNCH · CÓCTELES · VINOS · COMIDA'}
            </p>
            <p className="text-base xl:text-[17px] text-[#4E4C4F] font-sans-clean leading-relaxed">
              {lang === 'RU'
                ? 'Более 40 аргентинских игристых вин, авторские бранчи, классические коктейли и гастрономия в самом сердце Сан-Тельмо.'
                : lang === 'PT'
                  ? 'Mais de 40 rótulos de espumantes argentinos, brunch autoral, coquetelaria clássica e gastronomia no coração de San Telmo.'
                  : lang === 'EN'
                    ? 'Over 40 Argentine sparkling wines, signature brunch, classic cocktails, and kitchen pairings in the heart of San Telmo.'
                    : 'Más de 40 etiquetas de espumantes argentinos, brunch de autor, coctelería clásica y cocina de estación en el corazón de San Telmo.'}
            </p>
          </div>
        </motion.div>

      </div>

      {/* Action Buttons: Unified Minimalist 3-Item Grid (Reserva, Dirección, Horarios) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="pt-6 border-t border-[#2B2B2D]/10 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 sm:gap-3 items-start">
          
          {/* 1. Reserva por WhatsApp */}
          <a
            href={getWhatsAppReservationUrl(t.waPresetMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 px-4 py-2.5 sm:py-3 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10 hover:border-[#A84452]/45 hover:bg-[#FFFFFF] transition-all duration-300 shadow-sm group cursor-pointer"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 fill-current" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A84452] font-semibold shrink-0 font-sans-clean">
                {t.heroSmsLabel}:
              </span>
              <span className="font-editorial text-base sm:text-lg text-[#2B2B2D] tracking-wide truncate">
                {t.heroSms}
              </span>
            </div>
            <div className="flex items-center space-x-1 shrink-0 text-[#A84452]/70 group-hover:text-[#A84452] group-hover:translate-x-0.5 transition-all">
              <span className="text-xs font-mono">→</span>
            </div>
          </a>

          {/* 2. Dirección con acceso a mapa y copiado */}
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:py-3 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10 hover:border-[#A84452]/45 hover:bg-[#FFFFFF] transition-all duration-300 shadow-sm group">
            <a
              href={BAR_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2.5 min-w-0 flex-1 group/addr"
            >
              <Navigation className="w-4 h-4 text-[#A84452] shrink-0 group-hover/addr:scale-110 transition-transform" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A84452] font-semibold shrink-0 font-sans-clean">
                {t.heroAddressLabel}:
              </span>
              <span className="font-editorial text-base sm:text-lg text-[#2B2B2D] tracking-wide truncate group-hover/addr:text-[#A84452] transition-colors">
                {BAR_DATA.address}
              </span>
            </a>
            <div className="flex items-center space-x-1.5 shrink-0">
              <button
                onClick={copyAddress}
                className="p-1 rounded-lg text-[#6E6A6D] hover:text-[#A84452] transition-colors cursor-pointer"
                title="Copiar"
                aria-label="Copiar dirección"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <a
                href={BAR_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A84452]/70 group-hover:text-[#A84452] group-hover:translate-x-0.5 transition-all text-xs font-mono"
                aria-label="Abrir mapa"
              >
                →
              </a>
            </div>
          </div>

          {/* 3. Horarios de atención */}
          <WorkingHoursWidget lang={lang} variant="card" />

        </div>
      </motion.div>

      {/* Wine Bottle Carousel (Directly after action buttons) */}
      <WineBottleCarousel lang={lang} />
    </section>
  );
};
