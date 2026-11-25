import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LocationMapSection } from './components/LocationMapSection';
import { Footer } from './components/Footer';
import { SommelierPage } from './components/SommelierPage';
import { EventsPage } from './components/EventsPage';
import { BlindTastingPage } from './components/BlindTastingPage';
import { WelcomeBannerModal } from './components/WelcomeBannerModal';
import { Language, TRANSLATIONS } from './data/translations';
import { BLIND_TASTING_DATA } from './data/tastingData';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { getWhatsAppReservationUrl } from './data/barInfo';
import blindTastingHeroImg from './assets/images/blind_tasting_hero_1795516580318.jpg';

const isSundayInBuenosAires = (): boolean => {
  try {
    const weekday = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Argentina/Buenos_Aires',
      weekday: 'short',
    }).format(new Date());
    return weekday === 'Sun';
  } catch {
    return new Date().getDay() === 0;
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('ES');
  const [currentPage, setCurrentPage] = useState<'home' | 'sommelier' | 'events' | 'tasting'>('home');
  const [isBannerOpen, setIsBannerOpen] = useState<boolean>(() => isSundayInBuenosAires());
  const t = TRANSLATIONS[lang];
  const tastingContent = BLIND_TASTING_DATA[lang] || BLIND_TASTING_DATA.ES;

  // Initialize and sync page with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#sommelier' || hash === '#/sommelier') {
        setCurrentPage('sommelier');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#events' || hash === '#/events') {
        setCurrentPage('events');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#tasting') || hash.startsWith('#/tasting')) {
        setCurrentPage('tasting');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'sommelier' | 'events' | 'tasting') => {
    setCurrentPage(page);
    if (page === 'sommelier') {
      window.location.hash = '#sommelier';
    } else if (page === 'events') {
      window.location.hash = '#events';
    } else if (page === 'tasting') {
      window.location.hash = '#tasting';
    } else {
      if (
        window.location.hash === '#sommelier' ||
        window.location.hash === '#events' ||
        window.location.hash.startsWith('#tasting')
      ) {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#2B2B2D] font-sans-clean relative selection:bg-[#A84452] selection:text-[#FBF7F1]">
      
      {/* Navigation Header with Language Switcher */}
      <Header 
        t={t} 
        currentLang={lang} 
        onSelectLang={setLang}
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      {/* Main Content Area */}
      <main>
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <Hero t={t} lang={lang} onNavigate={navigateTo} />

            {/* Dedicated Editorial Blind Sparkling Wine Tasting Showcase Block (Above Polina) */}
            <section className="pt-2 sm:pt-4 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <button
                type="button"
                onClick={() => navigateTo('tasting')}
                className="group relative block w-full text-left rounded-[32px] overflow-hidden aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] max-h-[600px] border border-[#2B2B2D]/12 shadow-lg bg-[#2B2B2D] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A84452]"
              >
                <img
                  src={blindTastingHeroImg}
                  alt={tastingContent.homeTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Measured contrast scrim for crisp editorial typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />

                {/* Overlaid Laconic Editorial Heading */}
                <div className="absolute inset-0 p-6 sm:p-10 md:p-14 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] sm:text-xs tracking-[0.22em] text-[#F4C7CE] font-sans-clean font-semibold mb-3 sm:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                    {tastingContent.homeEyebrow}
                  </span>

                  <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#FAF5EE] tracking-tight leading-[0.96] max-w-4xl text-balance drop-shadow-[0_6px_28px_rgba(0,0,0,0.85)]">
                    {tastingContent.homeTitle}
                  </h2>

                  <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#FAF5EE]/90 max-w-xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]">
                    {tastingContent.homeSubtitle}
                  </p>

                  <span className="mt-6 sm:mt-8 inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#FBF7F1]/95 group-hover:bg-[#A84452] text-[#2B2B2D] group-hover:text-[#FBF7F1] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg whitespace-nowrap">
                    <span>{tastingContent.homeCta}</span>
                    <span className="font-mono group-hover:translate-x-0.5 transition-transform">→</span>
                  </span>
                </div>
              </button>
            </section>

            {/* Editorial Sommelier Spotlight: Mobile overlaid quote on circle, Desktop quote to the right of Polina */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="py-12 sm:py-16 border-t border-[#2B2B2D]/10"
              >
                {/* Mobile-only top eyebrow */}
                <div className="flex md:hidden items-center justify-center space-x-3 mb-6">
                  <div className="h-[1px] w-8 bg-[#A84452]" />
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#A84452] font-semibold font-sans-clean">
                    {lang === 'RU' ? 'Шеф-сомелье' : 'Head Sommelier'}
                  </span>
                  <div className="h-[1px] w-8 bg-[#A84452]" />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 max-w-5xl mx-auto">
                  {/* Circular Portrait Frame */}
                  <button
                    type="button"
                    onClick={() => navigateTo('sommelier')}
                    className="group relative flex flex-col items-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A84452] rounded-full shrink-0"
                    aria-label={lang === 'RU' ? 'Полина Штайнер — Шеф-сомелье' : 'Polina Schteiner — Head Sommelier'}
                  >
                    <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-[340px] md:h-[340px] lg:w-[390px] lg:h-[390px] rounded-full overflow-hidden border border-[#A84452]/25 shadow-[0_24px_60px_rgba(43,43,45,0.16)] bg-[#EDE2D4]">
                      <img
                        src="/images/Polina.png"
                        alt="Polina Schteiner"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-[50%_40%] origin-[61%_33%] scale-[1.85] transition-transform duration-700 ease-out group-hover:scale-[1.93]"
                      />

                      {/* Mobile-only gradient scrim & overlaid quote (hidden on desktop md+) */}
                      <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                      <div className="md:hidden absolute inset-x-0 bottom-0 px-7 sm:px-10 pb-8 sm:pb-11 pt-10 flex flex-col items-center justify-end text-center">
                        <blockquote className="font-editorial italic text-xl sm:text-2xl text-[#FAF5EE] leading-[1.15] tracking-tight text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                          {lang === 'RU'
                            ? '«Вино — самое честное послание сквозь время»'
                            : lang === 'ES'
                              ? '«El vino es el mensaje más honesto a través del tiempo»'
                              : lang === 'PT'
                                ? '«O vinho é a mensagem mais honesta através do tempo»'
                                : '“Wine is the most honest message across time”'}
                        </blockquote>
                        <span className="mt-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#F4C7CE] font-sans-clean font-semibold drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                          {lang === 'RU' ? 'Полина Штайнер' : 'Polina Schteiner'}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Desktop-only Right Column: Editorial Quote, Name & Action Link */}
                  <div className="hidden md:flex flex-col items-start text-left max-w-lg space-y-5">
                    <div className="flex items-center space-x-3">
                      <div className="h-[1px] w-10 bg-[#A84452]" />
                      <span className="text-xs uppercase tracking-[0.25em] text-[#A84452] font-semibold font-sans-clean">
                        {lang === 'RU' ? 'Шеф-сомелье · BRUT bar' : 'Head Sommelier · BRUT bar'}
                      </span>
                    </div>

                    <blockquote className="font-editorial italic text-3xl lg:text-4xl xl:text-[42px] text-[#2B2B2D] leading-[1.14] tracking-tight text-balance">
                      {lang === 'RU'
                        ? '«Вино — самое честное послание сквозь время»'
                        : lang === 'ES'
                          ? '«El vino es el mensaje más honesto a través del tiempo»'
                          : lang === 'PT'
                            ? '«O vinho é a mensagem mais honesta através do tempo»'
                            : '“Wine is the most honest message across time”'}
                    </blockquote>

                    <div className="space-y-1">
                      <div className="font-editorial text-2xl text-[#2B2B2D]">
                        {lang === 'RU' ? 'Полина Штайнер' : 'Polina Schteiner'}
                      </div>
                      <div className="text-xs text-[#6E6A6D] font-sans-clean">
                        {lang === 'RU'
                          ? 'Сомелье · Организация винных дегустаций в BRUT bar'
                          : lang === 'ES'
                            ? 'Sommelier · Organización de degustaciones en BRUT bar'
                            : lang === 'PT'
                              ? 'Sommelier · Organização de degustações no BRUT bar'
                              : 'Sommelier · Curated wine tastings at BRUT bar'}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigateTo('sommelier')}
                      className="pt-1 inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#2B2B2D] hover:text-[#A84452] font-semibold transition-colors cursor-pointer group"
                    >
                      <span>
                        {lang === 'RU'
                          ? 'Узнать подробнее'
                          : lang === 'PT'
                            ? 'Saiba mais'
                            : lang === 'EN'
                              ? 'Learn more'
                              : 'Ver más'}
                      </span>
                      <span className="font-mono text-[#A84452] group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>

                  {/* Mobile-only subtle action link below circle */}
                  <button
                    type="button"
                    onClick={() => navigateTo('sommelier')}
                    className="md:hidden inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#2B2B2D] hover:text-[#A84452] font-semibold transition-colors cursor-pointer group"
                  >
                    <span>
                      {lang === 'RU'
                        ? 'Узнать подробнее'
                        : lang === 'PT'
                          ? 'Saiba mais'
                          : lang === 'EN'
                            ? 'Learn more'
                            : 'Ver más'}
                    </span>
                    <span className="font-mono text-[#A84452] group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </motion.div>
            </section>

            {/* Location & Map Section */}
            <LocationMapSection t={t} lang={lang} />

            {/* Dedicated Editorial Events Showcase Block (Large photo with big overlaid headline) */}
            <section className="pt-4 sm:pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <button
                type="button"
                onClick={() => navigateTo('events')}
                className="group relative block w-full text-left rounded-[32px] overflow-hidden aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] max-h-[600px] border border-[#2B2B2D]/12 shadow-lg bg-[#2B2B2D] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A84452]"
              >
                <img
                  src="/images/Eventos.png"
                  alt={t.headerEvents}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Measured contrast scrim for crisp editorial typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

                {/* Overlaid Large Editorial Heading */}
                <div className="absolute inset-0 p-6 sm:p-10 md:p-14 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#F4C7CE] font-sans-clean font-semibold mb-3 sm:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                    {lang === 'RU'
                      ? 'Частные события · Чёрный зал'
                      : lang === 'ES'
                        ? 'Eventos Privados · Salón Negro'
                        : lang === 'PT'
                          ? 'Eventos Privados · Salão Preto'
                          : 'Private Events · Black Hall'}
                  </span>

                  <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF5EE] tracking-tight leading-[0.95] max-w-4xl text-balance drop-shadow-[0_6px_28px_rgba(0,0,0,0.85)]">
                    {lang === 'RU'
                      ? 'Мероприятия и дни рождения'
                      : lang === 'ES'
                        ? 'Eventos y cumpleaños'
                        : lang === 'PT'
                          ? 'Eventos e aniversários'
                          : 'Events & Birthdays'}
                  </h2>

                  <span className="mt-6 sm:mt-8 inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#FBF7F1]/95 group-hover:bg-[#A84452] text-[#2B2B2D] group-hover:text-[#FBF7F1] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg whitespace-nowrap">
                    <span>
                      {lang === 'RU'
                        ? 'Узнать цену'
                        : lang === 'PT'
                          ? 'Ver preços'
                          : lang === 'EN'
                            ? 'See pricing'
                            : 'Ver precios'}
                    </span>
                    <span className="font-mono group-hover:translate-x-0.5 transition-transform">→</span>
                  </span>
                </div>
              </button>
            </section>
          </>
        )}

        {currentPage === 'sommelier' && (
          <SommelierPage 
            lang={lang} 
            onBackToHome={() => navigateTo('home')} 
          />
        )}

        {currentPage === 'events' && (
          <EventsPage 
            lang={lang} 
            onBackToHome={() => navigateTo('home')} 
          />
        )}

        {currentPage === 'tasting' && (
          <BlindTastingPage
            lang={lang}
            onBackToHome={() => navigateTo('home')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        t={t} 
        lang={lang} 
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      {/* Floating Quick WhatsApp Action Button on Mobile */}
      <div className="fixed bottom-5 right-5 z-40 sm:hidden">
        <a
          href={getWhatsAppReservationUrl(t.waPresetMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all border border-white/20 shadow-[#25D366]/30 cursor-pointer"
          title="WhatsApp Business"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </a>
      </div>

      {/* Sunday-Only Popup Banner */}
      <WelcomeBannerModal
        isOpen={isBannerOpen}
        onClose={() => setIsBannerOpen(false)}
        lang={lang}
        t={t}
      />

    </div>
  );
}
