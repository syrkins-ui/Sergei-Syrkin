import React, { useEffect, useState } from 'react';
import { X, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BAR_DATA, IMAGES } from '../data/barInfo';
import { ContentTranslation, Language } from '../data/translations';

interface WelcomeBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  t: ContentTranslation;
}

const GOOGLE_MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=BRUT+bar,+Av.+Independencia+320,+Buenos+Aires&destination_place_id=ChIJiSgZaZs1o5UR79s9miaCKus';

const CLOSE_LABELS: Record<Language, string> = {
  ES: 'Cerrar',
  PT: 'Fechar',
  EN: 'Close',
  RU: 'Закрыть',
};

export const WelcomeBannerModal: React.FC<WelcomeBannerModalProps> = ({
  isOpen,
  onClose,
  lang,
  t,
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const closeLabel = CLOSE_LABELS[lang] || CLOSE_LABELS.ES;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="welcome-banner-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={BAR_DATA.name}
          className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-[3px] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Wrapper with close button above and directions CTA below the vertical banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center w-[min(88vw,460px,calc(68vh*3/4))]"
          >
            {/* Close Button ("крестик") hanging right above the banner */}
            <div className="w-full flex justify-end mb-3">
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                title={closeLabel}
                className="w-11 h-11 rounded-full bg-[#FBF7F1]/95 hover:bg-[#A84452] text-[#2B2B2D] hover:text-[#FBF7F1] border border-[#2B2B2D]/15 hover:border-[#A84452] flex items-center justify-center shadow-xl transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A84452]"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* Clean Vertical Banner Frame matching 1200x1607 (~3:4) */}
            <div className="relative w-full aspect-[1200/1607] rounded-[24px] overflow-hidden border border-[#FBF7F1]/50 shadow-[0_30px_80px_rgba(0,0,0,0.45)] bg-[#EFE5D8]">
              {!imgFailed ? (
                <img
                  src={IMAGES.feriaBanner}
                  alt={BAR_DATA.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#F6EFE6] via-[#EFE5D8] to-[#E5D4C2]" />
              )}
            </div>

            {/* Compact Google Maps Directions Button hugging its label outside & below the banner */}
            <div className="mt-4 flex justify-center">
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-auto px-5 py-2.5 rounded-full bg-[#A84452] hover:bg-[#8E3442] text-[#FBF7F1] font-semibold text-sm transition-colors duration-150 inline-flex items-center justify-center space-x-2 shadow-xl whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBF7F1]"
              >
                <Navigation className="w-4 h-4 shrink-0 fill-current" />
                <span>{t.locationDirections}</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
