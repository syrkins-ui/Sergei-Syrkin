import React, { useState, useEffect, useCallback } from 'react';
import { INTERIOR_PHOTOS } from '../data/barInfo';
import { ContentTranslation } from '../data/translations';
import { InteriorPhoto } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles } from 'lucide-react';

interface InteriorBubbleSectionProps {
  t: ContentTranslation;
  photos?: InteriorPhoto[];
}

export const InteriorBubbleSection: React.FC<InteriorBubbleSectionProps> = ({
  t,
  photos = INTERIOR_PHOTOS
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const activePhoto = photos[currentIndex] || photos[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Keyboard navigation for lightbox & gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <section id="interior" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Eyebrow */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="h-[1px] w-12 bg-[#E5C07B]" />
        <span className="text-xs uppercase tracking-widest text-[#E5C07B] font-medium font-sans-clean">
          {t.interiorEyebrow}
        </span>
      </div>

      {/* Main Container Bubble Card */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass-bubble-solid rounded-[32px] p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-[#FFF8F2]/20 shadow-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Vertical Photo Carousel */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div 
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] w-full max-w-md border border-[#FFF8F2]/20 shadow-2xl bg-black/40 group select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Animated Photo Transition */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activePhoto.id + activePhoto.url}
                  src={activePhoto.url}
                  alt={activePhoto.alt || activePhoto.caption || 'Interior de BRUT bar'}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="w-full h-full object-cover object-center cursor-pointer"
                  onClick={() => setIsLightboxOpen(true)}
                />
              </AnimatePresence>

              {/* Subtle Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#580714]/85 via-transparent to-black/25 pointer-events-none" />

              {/* Top Left: Frame Counter */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 pointer-events-none">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono font-semibold text-[#FFF8F2] border border-[#FFF8F2]/15 shadow-md">
                  <Sparkles className="w-3 h-3 text-[#E5C07B]" />
                  <span>{String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
                </span>
              </div>

              {/* Top Right: Fullscreen Lightbox Trigger */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-[#FFF8F2] hover:text-[#E5C07B] border border-[#FFF8F2]/15 transition-all hover:scale-105 active:scale-95 shadow-md"
                  title="Ver en pantalla completa"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#580714]/85 hover:bg-[#7A0C1E] text-white backdrop-blur-md border border-[#FFF8F2]/20 shadow-xl opacity-90 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#580714]/85 hover:bg-[#7A0C1E] text-white backdrop-blur-md border border-[#FFF8F2]/20 shadow-xl opacity-90 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all"
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6 pointer-events-none z-10">
                <div className="text-xs sm:text-sm font-editorial text-[#E5C07B] drop-shadow-md">
                  {activePhoto.caption || activePhoto.alt || t.interiorImageCaption}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title and Concept Subtitle */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Main Title Quote */}
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl leading-[1.18] text-[#FFF8F2] font-normal">
              {t.interiorTitle}
            </h2>

            <div className="w-20 h-[1px] bg-[#E5C07B]/50 my-5 sm:my-6" />

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base lg:text-lg text-[#FFF8F2]/85 font-sans-clean font-light leading-relaxed">
              {t.interiorSubtitle}
            </p>

          </div>

        </div>

      </motion.div>

      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 select-none"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between w-full max-w-6xl mx-auto z-10" onClick={(e) => e.stopPropagation()}>
              <div className="text-xs sm:text-sm font-mono text-[#E5C07B] tracking-wider">
                {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 active:scale-90"
                aria-label="Cerrar vista completa"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Center Image Container with Navigation */}
            <div 
              className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePhoto.url}
                alt={activePhoto.alt || 'Interior BRUT bar'}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              />

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-[#580714]/90 hover:bg-[#7A0C1E] text-white border border-[#FFF8F2]/20 shadow-2xl hover:scale-110 active:scale-95 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-[#580714]/90 hover:bg-[#7A0C1E] text-white border border-[#FFF8F2]/20 shadow-2xl hover:scale-110 active:scale-95 transition-all"
                  >
                    <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption in Lightbox */}
            <div className="w-full max-w-4xl mx-auto text-center py-2 z-10" onClick={(e) => e.stopPropagation()}>
              <p className="font-editorial text-base sm:text-xl text-[#E5C07B]">
                {activePhoto.caption || activePhoto.alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

