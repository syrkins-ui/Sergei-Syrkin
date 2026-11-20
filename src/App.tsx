import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LocationMapSection } from './components/LocationMapSection';
import { Footer } from './components/Footer';
import { SommelierPage } from './components/SommelierPage';
import { EventsPage } from './components/EventsPage';
import { WelcomeBannerModal } from './components/WelcomeBannerModal';
import { Language, TRANSLATIONS } from './data/translations';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppReservationUrl } from './data/barInfo';

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
  const [currentPage, setCurrentPage] = useState<'home' | 'sommelier' | 'events'>('home');
  const [isBannerOpen, setIsBannerOpen] = useState<boolean>(() => isSundayInBuenosAires());
  const t = TRANSLATIONS[lang];

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
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'sommelier' | 'events') => {
    setCurrentPage(page);
    if (page === 'sommelier') {
      window.location.hash = '#sommelier';
    } else if (page === 'events') {
      window.location.hash = '#events';
    } else {
      if (window.location.hash === '#sommelier' || window.location.hash === '#events') {
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
