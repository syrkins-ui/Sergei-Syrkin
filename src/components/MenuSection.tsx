import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FOOD_MENU, COCKTAIL_MENU, WINE_MENU, FoodItem, CocktailItem, WineMenuItem } from '../data/menuData';
import { ContentTranslation, Language } from '../data/translations';
import { Utensils, Wine, GlassWater, Sparkles, Tag, ShieldCheck } from 'lucide-react';

interface MenuSectionProps {
  t: ContentTranslation;
  lang: Language;
}

type TabType = 'wines' | 'food' | 'cocktails';

export const MenuSection: React.FC<MenuSectionProps> = ({ t, lang }) => {
  const [activeTab, setActiveTab] = useState<TabType>('wines');

  return (
    <section id="menu" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#FFF8F2]/15 relative">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <h2 className="font-editorial text-4xl sm:text-6xl text-[#FFF8F2] tracking-tight uppercase">
          {t.menuTitle}
        </h2>
        
        <p className="mt-4 text-sm sm:text-base md:text-lg text-[#E5C07B] font-sans-clean font-medium max-w-2xl mx-auto leading-relaxed flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E5C07B] animate-pulse shrink-0 hidden sm:inline-block" />
          <span>
            {lang === 'ES' && (
              <>En nuestro local contamos con un <strong className="text-[#FFF8F2] font-semibold underline decoration-[#E5C07B]/50">Sommelier con Inteligencia Artificial</strong> único, que te asistirá para seleccionar el vino perfecto según tus gustos.</>
            )}
            {lang === 'PT' && (
              <>Em nosso local contamos com um <strong className="text-[#FFF8F2] font-semibold underline decoration-[#E5C07B]/50">Sommelier de Inteligência Artificial</strong> único, que o ajudará a selecionar o vinho perfeito de acordo com seus gostos.</>
            )}
            {lang === 'EN' && (
              <>At our bar we have a unique <strong className="text-[#FFF8F2] font-semibold underline decoration-[#E5C07B]/50">AI Sommelier</strong> to assist you in choosing the perfect wine tailored to your taste.</>
            )}
            {lang === 'RU' && (
              <>В нашем баре работает уникальный <strong className="text-[#FFF8F2] font-semibold underline decoration-[#E5C07B]/50">ИИ-Сомелье</strong>, который поможет подобрать идеальное вино по вашему вкусу.</>
            )}
          </span>
        </p>

        {/* Tab Navigation Controls (Grid layout ensuring single row on mobile) */}
        <div className="mt-8 grid grid-cols-3 gap-1 sm:gap-2 p-1.5 bg-[#580714]/90 rounded-2xl border border-[#FFF8F2]/15 shadow-2xl backdrop-blur-md max-w-xl mx-auto w-full">
          
          {/* 1. Vino */}
          <button
            onClick={() => setActiveTab('wines')}
            className={`flex items-center justify-center space-x-1 sm:space-x-2 px-1 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap overflow-hidden ${
              activeTab === 'wines'
                ? 'bg-[#E5C07B] text-[#580714] shadow-lg scale-102'
                : 'text-[#FFF8F2]/80 hover:text-[#FFF8F2] hover:bg-[#7A0C1E]/60'
            }`}
          >
            <Wine className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">{t.tabWine}</span>
          </button>

          {/* 2. Comida */}
          <button
            onClick={() => setActiveTab('food')}
            className={`flex items-center justify-center space-x-1 sm:space-x-2 px-1 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap overflow-hidden ${
              activeTab === 'food'
                ? 'bg-[#E5C07B] text-[#580714] shadow-lg scale-102'
                : 'text-[#FFF8F2]/80 hover:text-[#FFF8F2] hover:bg-[#7A0C1E]/60'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">{t.tabFood}</span>
          </button>

          {/* 3. Cócteles */}
          <button
            onClick={() => setActiveTab('cocktails')}
            className={`flex items-center justify-center space-x-1 sm:space-x-2 px-1 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap overflow-hidden ${
              activeTab === 'cocktails'
                ? 'bg-[#E5C07B] text-[#580714] shadow-lg scale-102'
                : 'text-[#FFF8F2]/80 hover:text-[#FFF8F2] hover:bg-[#7A0C1E]/60'
            }`}
          >
            <GlassWater className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">{t.tabCocktails}</span>
          </button>

        </div>
      </div>

      {/* Tab Content Display */}
      <AnimatePresence mode="wait">
        
        {/* WINES TAB */}
        {activeTab === 'wines' && (
          <motion.div
            key="wines-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {WINE_MENU.map((item: WineMenuItem) => (
              <div
                key={item.id}
                className="bg-[#580714]/80 border border-[#FFF8F2]/15 hover:border-[#E5C07B]/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#FFF8F2] group-hover:text-[#E5C07B] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      {item.winery && (
                        <p className="text-xs text-[#E5C07B]/90 font-sans-clean font-medium mt-0.5">
                          {item.winery} {item.region ? `— ${item.region}` : ''}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 mb-3">
                    <span className="inline-block text-xs text-[#E5C07B] font-mono bg-[#7A0C1E] px-2.5 py-1 rounded-md border border-[#E5C07B]/30 font-semibold">
                      {item.style[lang] || item.style['ES']}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-xs sm:text-sm text-[#F9EBE0]/80 font-sans-clean leading-relaxed mb-4">
                      {item.description[lang] || item.description['ES']}
                    </p>
                  )}
                </div>

                {item.badge && (
                  <div className="pt-3 border-t border-[#FFF8F2]/10 mt-2">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-[#E5C07B]/15 text-[#E5C07B] border border-[#E5C07B]/30 font-mono text-[11px] uppercase tracking-wider font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{item.badge[lang] || item.badge['ES']}</span>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* FOOD TAB */}
        {activeTab === 'food' && (
          <motion.div
            key="food-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {FOOD_MENU.map((item: FoodItem) => (
              <div
                key={item.id}
                className="bg-[#580714]/80 border border-[#FFF8F2]/15 hover:border-[#E5C07B]/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <h3 className="font-editorial text-2xl text-[#FFF8F2] group-hover:text-[#E5C07B] transition-colors leading-snug mb-2">
                    {item.name[lang] || item.name['ES']}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#F9EBE0]/80 font-sans-clean leading-relaxed mb-4">
                    {item.description[lang] || item.description['ES']}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#FFF8F2]/10 mt-2 text-xs">
                  {item.badge && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-[#E5C07B]/15 text-[#E5C07B] border border-[#E5C07B]/30 font-mono text-[11px] uppercase tracking-wider font-semibold">
                      <Tag className="w-3 h-3" />
                      <span>{item.badge[lang] || item.badge['ES']}</span>
                    </span>
                  )}

                  {item.winePairing && (
                    <span className="inline-flex items-center space-x-1.5 text-xs text-[#E5C07B]/90 font-sans-clean italic ml-auto">
                      <Wine className="w-3.5 h-3.5 text-[#E5C07B]" />
                      <span>{t.pairingLabel} <strong className="text-[#FFF8F2] not-italic">{item.winePairing}</strong></span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* COCKTAILS TAB */}
        {activeTab === 'cocktails' && (
          <motion.div
            key="cocktails-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {COCKTAIL_MENU.map((item: CocktailItem) => (
              <div
                key={item.id}
                className="bg-[#580714]/80 border border-[#FFF8F2]/15 hover:border-[#E5C07B]/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <h3 className="font-editorial text-2xl text-[#FFF8F2] group-hover:text-[#E5C07B] transition-colors leading-snug mb-2">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#F9EBE0]/80 font-sans-clean leading-relaxed mb-4">
                    {item.description[lang] || item.description['ES']}
                  </p>
                </div>

                {item.badge && (
                  <div className="pt-2 border-t border-[#FFF8F2]/10 mt-2">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-[#E5C07B]/15 text-[#E5C07B] border border-[#E5C07B]/30 font-mono text-[11px] uppercase tracking-wider font-semibold">
                      <Sparkles className="w-3 h-3" />
                      <span>{item.badge[lang] || item.badge['ES']}</span>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

      </AnimatePresence>

    </section>
  );
};
