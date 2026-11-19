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

            {/* Events & Birthdays Highlight Block (after map & location info) */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="p-5 sm:p-6 rounded-3xl bg-[#FBF7F1] border border-[#A84452]/20 hover:border-[#A84452]/45 transition-all shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4 min-w-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#A84452]/30 shrink-0 shadow-sm bg-[#EFE5D8]">
                    <img
                      src="/images/003.png"
                      alt={t.headerEvents}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-[#A84452] font-semibold">
                      BRUT bar
                    </div>
                    <div className="text-lg sm:text-xl text-[#2B2B2D] font-editorial leading-tight">
                      {lang === 'RU'
                        ? 'Мероприятия и дни рождения'
                        : lang === 'ES'
                          ? 'Eventos y Cumpleaños'
                          : lang === 'PT'
                            ? 'Eventos & Aniversários'
                            : 'Events & Birthdays'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('events')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#A84452] hover:bg-[#8E3442] text-[#FBF7F1] font-semibold text-xs uppercase tracking-wider transition-all shadow-sm shrink-0 cursor-pointer text-center whitespace-nowrap"
                >
                  {lang === 'RU'
                    ? 'Узнать подробнее'
                    : lang === 'PT'
                      ? 'Saiba mais'
                      : lang === 'EN'
                        ? 'Learn more'
                        : 'Ver más'}{' '}
                  →
                </button>
              </div>
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
