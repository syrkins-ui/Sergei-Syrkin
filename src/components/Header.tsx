import React, { useState, useRef, useEffect } from 'react';
import { ContentTranslation, Language } from '../data/translations';
import { BAR_DATA } from '../data/barInfo';
import { ChevronDown, Globe } from 'lucide-react';

interface HeaderProps {
  t: ContentTranslation;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  currentPage?: 'home' | 'sommelier' | 'events';
  onNavigate?: (page: 'home' | 'sommelier' | 'events') => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  t, 
  currentLang, 
  onSelectLang,
  currentPage = 'home',
  onNavigate 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string }[] = [
    { code: 'ES', name: 'Español (AR)' },
    { code: 'PT', name: 'Português' },
    { code: 'EN', name: 'English' },
    { code: 'RU', name: 'Русский' },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header id="top-nav" className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#7A0C1E]/85 border-b border-[#FFF8F2]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Left: Brand Identity with address underneath */}
        <div className="flex flex-col justify-center text-left shrink-0">
          <button 
            onClick={handleLogoClick} 
            className="group inline-flex items-center text-left cursor-pointer"
            aria-label="BRUT bar home"
          >
            <span className="font-editorial text-2xl sm:text-4xl tracking-tight text-[#FFF8F2] group-hover:text-[#E5C07B] transition-colors leading-none whitespace-nowrap">
              BRUT bar
            </span>
          </button>
          <a
            href={BAR_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-editorial text-[10px] sm:text-xs text-[#E5C07B] hover:text-[#FFF8F2] transition-colors mt-0.5 tracking-normal hover:underline underline-offset-2 decoration-[#E5C07B]/40 truncate max-w-[140px] sm:max-w-none"
            title="Google Maps: av.Independencia 320, Buenos Aires"
          >
            av.Independencia 320, Buenos Aires
          </a>
        </div>

        {/* Center / Right: Nav links & Language Switcher Dropdown */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">

          {/* External Menu Button */}
          <a
            href="https://brut-bar-774838171565.us-east1.run.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#580714]/50 border border-[#FFF8F2]/15 hover:border-[#E5C07B] text-[#FFF8F2]/80 hover:text-[#E5C07B] text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0"
          >
            <span>{t.headerMenu}</span>
          </a>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#580714]/80 border border-[#FFF8F2]/20 hover:border-[#E5C07B] text-[#FFF8F2] hover:text-[#E5C07B] transition-all text-xs font-semibold font-mono tracking-wider cursor-pointer shadow-md"
              aria-label="Select language"
              aria-expanded={isOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#E5C07B]" />
              <span>{currentLang}</span>
              <ChevronDown className={`w-3 h-3 text-[#E5C07B] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 rounded-2xl bg-[#580714] border border-[#FFF8F2]/20 shadow-2xl p-1.5 z-50 backdrop-blur-xl animate-fade-in">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-sans-clean transition-colors cursor-pointer ${
                      currentLang === lang.code
                        ? 'bg-[#E5C07B] text-[#580714] font-bold'
                        : 'text-[#FFF8F2] hover:bg-[#7A0C1E] hover:text-[#E5C07B]'
                    }`}
                  >
                    <span className="font-mono font-bold tracking-wider">{lang.code}</span>
                    <span className="text-[11px] opacity-80">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
