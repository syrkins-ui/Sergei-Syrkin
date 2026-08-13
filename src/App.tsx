import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InteriorBubbleSection } from './components/InteriorBubbleSection';
import { MenuSection } from './components/MenuSection';
import { LocationMapSection } from './components/LocationMapSection';
import { Footer } from './components/Footer';
import { Language, TRANSLATIONS } from './data/translations';
import { MessageSquare } from 'lucide-react';
import { BAR_DATA } from './data/barInfo';

export default function App() {
  const [lang, setLang] = useState<Language>('ES');
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-[#7A0C1E] text-[#FFF8F2] font-sans-clean relative selection:bg-[#FFF8F2] selection:text-[#7A0C1E]">
      
      {/* Navigation Header with Language Switcher */}
      <Header t={t} currentLang={lang} onSelectLang={setLang} />

      {/* Main Single Page Sections */}
      <main>
        {/* Hero Section */}
        <Hero t={t} lang={lang} />

        {/* Interior & Concept Bubble Section */}
        <InteriorBubbleSection t={t} />

        {/* Location & Map Section */}
        <LocationMapSection t={t} lang={lang} />

        {/* Menu & Drinks Section */}
        <MenuSection t={t} lang={lang} />
      </main>

      {/* Footer */}
      <Footer t={t} lang={lang} />

      {/* Floating Quick SMS Action Button on Mobile */}
      <div className="fixed bottom-5 right-5 z-40 sm:hidden">
        <a
          href={BAR_DATA.smsUrl}
          className="w-13 h-13 rounded-full bg-[#34A853] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all border border-white/20"
          title="SMS / RCS"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
        </a>
      </div>

    </div>
  );
}
