import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LocationMapSection } from './components/LocationMapSection';
import { Footer } from './components/Footer';
import { SommelierPage } from './components/SommelierPage';
import { Language, TRANSLATIONS } from './data/translations';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppReservationUrl } from './data/barInfo';

export default function App() {
  const [lang, setLang] = useState<Language>('ES');
  const [currentPage, setCurrentPage] = useState<'home' | 'sommelier'>('home');
  const t = TRANSLATIONS[lang];

  // Initialize and sync page with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#sommelier' || hash === '#/sommelier') {
        setCurrentPage('sommelier');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'sommelier') => {
    setCurrentPage(page);
    if (page === 'sommelier') {
      window.location.hash = '#sommelier';
    } else {
      if (window.location.hash === '#sommelier') {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#7A0C1E] text-[#FFF8F2] font-sans-clean relative selection:bg-[#FFF8F2] selection:text-[#7A0C1E]">
      
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
        {currentPage === 'home' ? (
          <>
            {/* Hero Section */}
            <Hero t={t} lang={lang} onNavigate={navigateTo} />

            {/* Location & Map Section */}
            <LocationMapSection t={t} lang={lang} />
          </>
        ) : (
          /* Dedicated Sommelier Page */
          <SommelierPage 
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

    </div>
  );
}
