import React, { useEffect, useState } from 'react';
import { X, Navigation, Ticket, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BAR_DATA, IMAGES, getWhatsAppReservationUrl } from '../data/barInfo';
import { ContentTranslation, Language } from '../data/translations';

export type BannerMode = 'ostras-weekend' | 'cabaret-promo' | 'sunday-feria';

interface WelcomeBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  t: ContentTranslation;
  mode: BannerMode;
}

const GOOGLE_MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=BRUT+bar,+Av.+Independencia+320,+Buenos+Aires&destination_place_id=ChIJiSgZaZs1o5UR79s9miaCKus';

const CABARET_TICKETS_URL =
  'https://www.plateanet.com/obra/35791?obra=CABARET-COURAGE_&paso=inicio';

const CABARET_BANNER_IMAGE = '/assets/aistudio/image_b49125f9.png';
const OSTRAS_BANNER_IMAGE = '/assets/aistudio/image_935e6ca4.png';

const MODAL_LABELS: Record<
  Language,
  {
    close: string;
    buyTicket: string;
    bookTable: string;
    goToSite: string;
    cabaretAlt: string;
    ostrasAlt: string;
    ostrasWaMessage: string;
  }
> = {
  ES: {
    close: 'Cerrar',
    buyTicket: 'Comprar entrada',
    bookTable: 'Reservar mesa',
    goToSite: 'Ir al sitio',
    cabaretAlt: 'Hoy, 26 de noviembre — 15% OFF en BRUT bar con tu entrada para Cabaret Courage',
    ostrasAlt: 'Viernes y sábado de ostras en BRUT bar',
    ostrasWaMessage:
      '¡Hola, BRUT bar! Quiero reservar una mesa para el viernes y sábado de ostras.',
  },
  PT: {
    close: 'Fechar',
    buyTicket: 'Comprar ingresso',
    bookTable: 'Reservar mesa',
    goToSite: 'Ir para o site',
    cabaretAlt: 'Hoje, 26 de novembro — 15% OFF no BRUT bar com seu ingresso para Cabaret Courage',
    ostrasAlt: 'Sexta e sábado de ostras no BRUT bar',
    ostrasWaMessage:
      'Olá, BRUT bar! Quero reservar uma mesa para sexta e sábado de ostras.',
  },
  EN: {
    close: 'Close',
    buyTicket: 'Buy ticket',
    bookTable: 'Book a table',
    goToSite: 'Go to site',
    cabaretAlt: 'Today, November 26 — 15% OFF at BRUT bar with your Cabaret Courage ticket',
    ostrasAlt: 'Friday and Saturday Oysters at BRUT bar',
    ostrasWaMessage:
      'Hi BRUT bar! I would like to book a table for Friday & Saturday Oysters.',
  },
  RU: {
    close: 'Закрыть',
    buyTicket: 'Купить билет',
    bookTable: 'Забронировать столик',
    goToSite: 'На сайт',
    cabaretAlt: 'Сегодня, 26 ноября — скидка 15% в BRUT bar по билету на Cabaret Courage',
    ostrasAlt: 'Пятница и суббота устриц в BRUT bar',
    ostrasWaMessage:
      'Здравствуйте, BRUT bar! Хочу забронировать столик на устрицы в пятницу/субботу.',
  },
};

export const WelcomeBannerModal: React.FC<WelcomeBannerModalProps> = ({
  isOpen,
  onClose,
  lang,
  t,
  mode,
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const labels = MODAL_LABELS[lang] || MODAL_LABELS.ES;
  const isOstrasWeekend = mode === 'ostras-weekend';
  const isCabaretPromo = mode === 'cabaret-promo';

  const bannerSrc = isOstrasWeekend
    ? OSTRAS_BANNER_IMAGE
    : isCabaretPromo
      ? CABARET_BANNER_IMAGE
      : IMAGES.feriaBanner;

  const bannerAlt = isOstrasWeekend
    ? labels.ostrasAlt
    : isCabaretPromo
      ? labels.cabaretAlt
      : BAR_DATA.name;

  useEffect(() => {
    setImgFailed(false);
  }, [mode]);

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
          aria-label={bannerAlt}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-[3px] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Wrapper with close button above and action CTA(s) below the vertical banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center w-[min(88vw,440px,calc(68vh*1792/2380))]"
          >
            {/* Close Button ("крестик") hanging right above the banner */}
            <div className="w-full flex justify-end mb-3">
              <button
                type="button"
                onClick={onClose}
                aria-label={labels.close}
                title={labels.close}
                className="w-11 h-11 rounded-full bg-[#FBF7F1]/95 hover:bg-[#A84452] text-[#2B2B2D] hover:text-[#FBF7F1] border border-[#2B2B2D]/15 hover:border-[#A84452] flex items-center justify-center shadow-xl transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A84452]"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* Clean Vertical Banner Frame (~3:4) */}
            <div className="relative w-full aspect-[1792/2380] rounded-[24px] overflow-hidden border border-[#FBF7F1]/50 shadow-[0_30px_80px_rgba(0,0,0,0.45)] bg-[#2B2B2D]">
              {!imgFailed ? (
                <img
                  src={bannerSrc}
                  alt={bannerAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#F6EFE6] via-[#EFE5D8] to-[#E5D4C2]" />
              )}
            </div>

            {/* Action Buttons below the banner */}
            {isOstrasWeekend ? (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full">
                <a
                  href={getWhatsAppReservationUrl(labels.ostrasWaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm transition-colors duration-150 inline-flex items-center justify-center space-x-2 shadow-xl whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBF7F1]"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 fill-current" />
                  <span>{labels.bookTable}</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-[#FBF7F1] hover:bg-white text-[#2B2B2D] border border-[#2B2B2D]/15 hover:border-[#A84452]/50 font-semibold text-sm transition-colors duration-150 inline-flex items-center justify-center shadow-xl whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A84452]"
                >
                  <span>{labels.goToSite}</span>
                </button>
              </div>
            ) : isCabaretPromo ? (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full">
                <a
                  href={CABARET_TICKETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#A84452] hover:bg-[#8E3442] text-[#FBF7F1] font-semibold text-sm transition-colors duration-150 inline-flex items-center justify-center space-x-2 shadow-xl whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBF7F1]"
                >
                  <Ticket className="w-4 h-4 shrink-0" />
                  <span>{labels.buyTicket}</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-[#FBF7F1] hover:bg-white text-[#2B2B2D] border border-[#2B2B2D]/15 hover:border-[#A84452]/50 font-semibold text-sm transition-colors duration-150 inline-flex items-center justify-center shadow-xl whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A84452]"
                >
                  <span>{labels.goToSite}</span>
                </button>
              </div>
            ) : (
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
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
