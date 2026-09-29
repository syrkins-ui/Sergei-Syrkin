import React, { useState } from 'react';
import { FEATURED_WINES, WineItem } from '../data/wines';
import { ChevronLeft, ChevronRight, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../data/translations';

interface WineBottleCarouselProps {
  lang?: Language;
}

export const WineBottleCarousel: React.FC<WineBottleCarouselProps> = ({ lang = 'ES' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentWine: WineItem = FEATURED_WINES[currentIndex];

  const prevWine = () => {
    setCurrentIndex((prev) => (prev - 1 + FEATURED_WINES.length) % FEATURED_WINES.length);
  };

  const nextWine = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURED_WINES.length);
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
    if (distance > 45) {
      nextWine();
    } else if (distance < -45) {
      prevWine();
    }
  };

  const handleImageError = (wineId: string) => {
    setImageErrorMap((prev) => ({ ...prev, [wineId]: true }));
  };

  // Localized field labels and section texts
  const labels = {
    ES: {
      sectionTitle: 'Los vinos favoritos de nuestros clientes',
      menuTitle: 'TODO MENÚ',
      menuSubtitle: 'COMIDA, VINO, CÓCTELES',
      bodega: 'bodega',
      sweetness: 'dulzor',
      notes: 'notas',
    },
    PT: {
      sectionTitle: 'Os vinhos favoritos dos nossos clientes',
      menuTitle: 'TODO O CARDÁPIO',
      menuSubtitle: 'COMIDA, VINHO, COQUETÉIS',
      bodega: 'vinícola',
      sweetness: 'doçura',
      notes: 'notas',
    },
    EN: {
      sectionTitle: "Our guests' favorite wines",
      menuTitle: 'FULL MENU',
      menuSubtitle: 'FOOD, WINE, COCKTAILS',
      bodega: 'winery',
      sweetness: 'dosage',
      notes: 'notes',
    },
    RU: {
      sectionTitle: 'Любимые вина наших гостей',
      menuTitle: 'ВСЁ МЕНЮ',
      menuSubtitle: 'ЕДА, ВИНО, КОКТЕЙЛИ',
      bodega: 'бодега',
      sweetness: 'сладость',
      notes: 'ноты',
    }
  }[lang] || {
    sectionTitle: 'Los vinos favoritos de nuestros clientes',
    menuTitle: 'TODO MENÚ',
    menuSubtitle: 'COMIDA, VINO, CÓCTELES',
    bodega: 'bodega',
    sweetness: 'dulzor',
    notes: 'notas',
  };

  return (
    <div 
      className="mt-8 sm:mt-12 pt-8 border-t border-[#FFF8F2]/15 relative select-none"
      onTouchStart={onTouchStartHandler}
      onTouchMove={onTouchMoveHandler}
      onTouchEnd={onTouchEndHandler}
    >
      {/* Top section title (centered, without 01/06 counter) */}
      <div className="flex items-center justify-center mb-4 sm:mb-6 px-2 text-center">
        <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#E5C07B] font-sans-clean font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          {labels.sectionTitle}
        </span>
      </div>

      {/* Main Wine Area - Pure, clean, no background cards or nested boxes */}
      <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center px-1 sm:px-8 md:px-12">
        
        {/* Navigation Arrows: Left and Right (clean minimalist "уголки" like the hero) */}
        <button
          onClick={prevWine}
          className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-[#E5C07B] active:text-[#FFF8F2] transition-all cursor-pointer z-30 hover:scale-110 active:scale-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
          aria-label="Previous wine"
        >
          <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.25] transition-transform hover:-translate-x-1" />
        </button>

        <button
          onClick={nextWine}
          className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-[#E5C07B] active:text-[#FFF8F2] transition-all cursor-pointer z-30 hover:scale-110 active:scale-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
          aria-label="Next wine"
        >
          <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.25] transition-transform hover:translate-x-1" />
        </button>

        {/* Wine Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWine.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full flex flex-row items-center gap-4 sm:gap-8 md:gap-12"
          >
            {/* Left: Bottle Image (always on left) */}
            <div className="w-[36%] sm:w-[35%] md:w-[32%] shrink-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center h-64 sm:h-80 md:h-96 w-full">
                {!imageErrorMap[currentWine.id] ? (
                  <img
                    src={encodeURI(currentWine.image)}
                    alt={currentWine.name}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(currentWine.id)}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <svg
                      viewBox="0 0 100 320"
                      className="h-56 sm:h-72 md:h-84 w-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] fill-current text-[#FFF8F2]/25 hover:text-[#E5C07B]/35 transition-colors"
                    >
                      <path d="M42 12 C42 8, 58 8, 58 12 L58 35 C58 40, 56 46, 54 50 L46 50 C44 46, 42 40, 42 35 Z" fill="#E5C07B" fillOpacity="0.4" />
                      <rect x="40" y="10" width="20" height="6" rx="2" fill="#E5C07B" fillOpacity="0.8" />
                      <path d="M42 50 L42 90 C30 115, 20 135, 20 170 L20 295 C20 305, 28 312, 38 312 L62 312 C72 312, 80 305, 80 295 L80 170 C80 135, 70 115, 58 90 L58 50 Z" />
                      <path d="M26 175 L26 285 C26 295, 30 300, 35 302" stroke="#FFF8F2" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
                      <rect x="28" y="170" width="44" height="65" rx="3" fill="#580714" stroke="#E5C07B" strokeWidth="1" strokeOpacity="0.6" />
                      <line x1="33" y1="185" x2="67" y2="185" stroke="#E5C07B" strokeWidth="0.8" strokeOpacity="0.5" />
                      <text x="50" y="202" textAnchor="middle" fill="#FFF8F2" fontSize="7" fontFamily="serif" fontWeight="bold">BRUT</text>
                      <text x="50" y="214" textAnchor="middle" fill="#E5C07B" fontSize="5" fontFamily="sans-serif">SAN TELMO</text>
                      <line x1="33" y1="222" x2="67" y2="222" stroke="#E5C07B" strokeWidth="0.8" strokeOpacity="0.5" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Wine name above phrase, huge phrase, and metadata list with lowercase labels & uppercase values */}
            <div className="w-[64%] sm:w-[65%] md:w-[68%] flex flex-col justify-center text-left py-2">
              {/* Wine Name (placed above phrase) */}
              <div className="font-editorial text-base sm:text-xl md:text-2xl lg:text-3xl text-[#E5C07B] mb-2 sm:mb-3 font-normal tracking-wide select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {currentWine.name}
              </div>

              {/* Phrase: Extra Large, white, NO quotes, in 2-3 lines */}
              <h3 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px] text-[#FFF8F2] tracking-tight leading-[0.98] sm:leading-[1.0] mb-5 sm:mb-7 select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                {currentWine.shortPhrase}
              </h3>

              {/* Information list: labels in lowercase, values in uppercase */}
              <ul className="space-y-2.5 sm:space-y-3.5 text-left font-sans-clean">
                <li className="flex flex-col sm:flex-row sm:items-baseline">
                  <span className="text-xs sm:text-sm text-[#E5C07B] lowercase shrink-0 sm:w-20 md:w-24">
                    {labels.bodega}:
                  </span>
                  <span className="text-xs sm:text-sm md:text-base text-[#FFF8F2] uppercase tracking-wide font-medium">
                    {currentWine.bodega}
                  </span>
                </li>

                <li className="flex flex-col sm:flex-row sm:items-baseline">
                  <span className="text-xs sm:text-sm text-[#E5C07B] lowercase shrink-0 sm:w-20 md:w-24">
                    {labels.sweetness}:
                  </span>
                  <span className="text-xs sm:text-sm md:text-base text-[#FFF8F2] uppercase tracking-wide font-medium">
                    {currentWine.sweetness}
                  </span>
                </li>

                <li className="flex flex-col sm:flex-row sm:items-baseline">
                  <span className="text-xs sm:text-sm text-[#E5C07B] lowercase shrink-0 sm:w-20 md:w-24">
                    {labels.notes}:
                  </span>
                  <span className="text-[11px] sm:text-xs md:text-sm text-[#F9EBE0] uppercase tracking-wide leading-relaxed">
                    {currentWine.notes}
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Pagination Dots: Clean without background pod */}
      <div className="flex items-center justify-center space-x-2 pt-6">
        {FEATURED_WINES.map((wine, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={wine.id}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-6 h-1.5 sm:w-7 sm:h-2 rounded-full bg-[#E5C07B] shadow-sm shadow-[#E5C07B]/50'
                  : 'w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Wine ${index + 1}: ${wine.name}`}
            />
          );
        })}
      </div>

      {/* Button: View Full Menu (TODO MENÚ) */}
      <div className="flex justify-center pt-7 sm:pt-8">
        <a
          href="https://brut-bar-774838171565.us-east1.run.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center space-x-3.5 sm:space-x-4 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#E5C07B] hover:bg-[#F3D59B] text-[#580714] border border-[#F3D59B] shadow-xl shadow-black/40 transition-all duration-300 hover:scale-[1.03] active:scale-95 text-left cursor-pointer"
        >
          <UtensilsCrossed className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2] text-[#580714] shrink-0 transition-transform duration-300 group-hover:rotate-12" />
          <div className="flex flex-col">
            <span className="font-editorial text-xl sm:text-2xl font-bold uppercase tracking-wider leading-none text-[#580714]">
              {labels.menuTitle}
            </span>
            <span className="font-sans-clean text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#580714]/85 leading-tight mt-1">
              {labels.menuSubtitle}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};
