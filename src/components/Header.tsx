import React, { useState, useRef, useEffect } from 'react';
import { ContentTranslation, Language } from '../data/translations';
import { BAR_DATA } from '../data/barInfo';
import { ChevronDown, Globe, Instagram } from 'lucide-react';

interface HeaderProps {
  t: ContentTranslation;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  currentPage?: 'home' | 'sommelier' | 'events' | 'tasting';
  onNavigate?: (page: 'home' | 'sommelier' | 'events' | 'tasting') => void;
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
    <header id="top-nav" className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#F6EFE6]/90 border-b border-[#2B2B2D]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Left: Brand Identity with address underneath */}
        <div className="flex flex-col justify-center text-left shrink-0">
          <button 
            onClick={handleLogoClick} 
            className="group inline-flex items-center text-left cursor-pointer"
            aria-label="BRUT bar home"
          >
            <span className="font-editorial text-2xl sm:text-4xl tracking-tight text-[#2B2B2D] group-hover:text-[#A84452] transition-colors leading-none whitespace-nowrap">
              BRUT bar
            </span>
          </button>
          <a
            href={BAR_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-editorial text-[10px] sm:text-xs text-[#A84452] hover:text-[#2B2B2D] transition-colors mt-0.5 tracking-normal hover:underline underline-offset-2 decoration-[#A84452]/40 truncate max-w-[140px] sm:max-w-none"
            title="Google Maps: av.Independencia 320, Buenos Aires"
          >
            av.Independencia 320, Buenos Aires
          </a>
        </div>

        {/* Center / Right: Nav links, Instagram Icon & Language Switcher Dropdown */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">

          {/* Blind Tasting Page Button */}
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('tasting')}
              className={`hidden md:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'tasting'
                  ? 'bg-[#A84452] text-[#FBF7F1] border border-[#A84452]'
                  : 'bg-[#FBF7F1] border border-[#2B2B2D]/15 hover:border-[#A84452] text-[#2B2B2D] hover:text-[#A84452]'
              }`}
            >
              <span>{t.headerTasting}</span>
            </button>
          )}

          {/* External Menu Button */}
          <a
            href="https://brut-bar-774838171565.us-east1.run.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FBF7F1] border border-[#2B2B2D]/15 hover:border-[#A84452] text-[#2B2B2D] hover:text-[#A84452] text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0"
          >
            <span>{t.headerMenu}</span>
          </a>

          {/* Instagram Icon (placed to the left of language switcher) */}
          <a
            href={BAR_DATA.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full text-[#2B2B2D] hover:text-[#A84452] hover:bg-[#EFE5D8]/80 transition-all shrink-0 cursor-pointer"
            aria-label={`Instagram ${BAR_DATA.instagramHandle}`}
            title={`Instagram ${BAR_DATA.instagramHandle}`}
          >
            <Instagram className="w-5 h-5 stroke-[1.75]" />
          </a>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#FBF7F1] border border-[#2B2B2D]/15 hover:border-[#A84452] text-[#2B2B2D] hover:text-[#A84452] transition-all text-xs font-semibold font-mono tracking-wider cursor-pointer shadow-sm"
              aria-label="Select language"
              aria-expanded={isOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#A84452]" />
              <span>{currentLang}</span>
              <ChevronDown className={`w-3 h-3 text-[#A84452] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/12 shadow-xl p-1.5 z-50 backdrop-blur-xl animate-fade-in">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-sans-clean transition-colors cursor-pointer ${
                      currentLang === lang.code
                        ? 'bg-[#A84452] text-[#FBF7F1] font-bold'
                        : 'text-[#2B2B2D] hover:bg-[#EFE5D8] hover:text-[#A84452]'
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
