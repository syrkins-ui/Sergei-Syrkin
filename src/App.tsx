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
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const t = TRANSLATIONS[lang];

  // Listen for Google Maps quota exceeded event
  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

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
      
      {/* Quota Exceeded Notification Banner */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

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
