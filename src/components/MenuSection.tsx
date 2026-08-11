import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FOOD_MENU, COCKTAIL_MENU, WINE_MENU, FoodItem, CocktailItem, WineMenuItem } from '../data/menuData';
import { ContentTranslation } from '../data/translations';
import { Utensils, Wine, GlassWater, Sparkles, Tag } from 'lucide-react';

interface MenuSectionProps {
  t: ContentTranslation;
}

type TabType = 'wines' | 'food' | 'cocktails';

export const MenuSection: React.FC<MenuSectionProps> = () => {
  const [activeTab, setActiveTab] = useState<TabType>('wines');

  return (
    <section id="menu" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#FFF8F2]/15 relative">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <h2 className="font-editorial text-4xl sm:text-6xl text-[#FFF8F2] tracking-tight uppercase">
          Carta Vinos & Menú Gastronómico
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-[#E5C07B] font-sans-clean font-medium max-w-2xl mx-auto leading-relaxed flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E5C07B] animate-pulse shrink-0 hidden sm:inline-block" />
          <span>
            En nuestro local contamos con un <strong className="text-[#FFF8F2] font-semibold underline decoration-[#E5C07B]/50">Sommelier con Inteligencia Artificial</strong> único, que te asistirá para seleccionar el vino perfecto según tus gustos.
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
            <span className="truncate">Vino</span>
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
            <span className="truncate">Comida</span>
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
            <span className="truncate">Cócteles</span>
          </button>

        </div>
      </div>

      {/* Tab Content Display */}
      <AnimatePresence mode="wait">
        
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
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-editorial text-2xl text-[#FFF8F2] group-hover:text-[#E5C07B] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-lg text-[#E5C07B]">
                        {item.price}
                      </span>
                      {item.originalPrice && (
                        <div className="text-xs text-[#FFF8F2]/50 line-through font-mono">
                          {item.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F9EBE0]/80 font-sans-clean leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#FFF8F2]/10 mt-2 text-xs">
                  {item.badge && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-[#E5C07B]/15 text-[#E5C07B] border border-[#E5C07B]/30 font-mono text-[11px] uppercase tracking-wider font-semibold">
                      <Tag className="w-3 h-3" />
                      <span>{item.badge}</span>
                    </span>
                  )}

                  {item.winePairing && (
                    <span className="inline-flex items-center space-x-1.5 text-xs text-[#E5C07B]/90 font-sans-clean italic ml-auto">
                      <Wine className="w-3.5 h-3.5 text-[#E5C07B]" />
                      <span>Maridaje: <strong className="text-[#FFF8F2] not-italic">{item.winePairing}</strong></span>
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
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-editorial text-2xl text-[#FFF8F2] group-hover:text-[#E5C07B] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-lg text-[#E5C07B]">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F9EBE0]/80 font-sans-clean leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {item.badge && (
                  <div className="pt-2 border-t border-[#FFF8F2]/10 mt-2">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-[#E5C07B]/15 text-[#E5C07B] border border-[#E5C07B]/30 font-mono text-[11px] uppercase tracking-wider font-semibold">
                      <Sparkles className="w-3 h-3" />
                      <span>{item.badge}</span>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* WINES TAB */}
        {activeTab === 'wines' && (
          <motion.div
            key="wines-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="bg-[#580714]/80 border border-[#FFF8F2]/15 rounded-3xl p-4 sm:p-8 shadow-2xl overflow-hidden"
          >
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-[#FFF8F2]/15 text-xs font-mono uppercase tracking-wider text-[#E5C07B]">
              <div className="col-span-6">Etiqueta & Estilo</div>
              <div className="col-span-3 text-right">Copa</div>
              <div className="col-span-3 text-right">Botella</div>
            </div>

            <div className="divide-y divide-[#FFF8F2]/10">
              {WINE_MENU.map((item: WineMenuItem) => (
                <div
                  key={item.id}
                  className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center hover:bg-[#7A0C1E]/40 px-2 rounded-xl transition-colors"
                >
                  {/* Wine Name & Style */}
                  <div className="sm:col-span-6">
                    <h4 className="font-editorial text-xl sm:text-2xl text-[#FFF8F2] leading-snug">
                      {item.name}
                    </h4>
                    <span className="inline-block mt-1 text-xs text-[#E5C07B]/90 font-mono bg-[#7A0C1E] px-2 py-0.5 rounded border border-[#E5C07B]/20">
                      {item.style}
                    </span>
                  </div>

                  {/* Glass Price (Mobile vs Desktop) */}
                  <div className="sm:col-span-3 flex sm:justify-end items-center justify-between text-xs sm:text-sm">
                    <span className="sm:hidden text-[#F9EBE0]/60 font-mono uppercase">Copa:</span>
                    <span className="font-mono font-bold text-[#FFF8F2]">
                      {item.glassPrice ? item.glassPrice : '—'}
                    </span>
                  </div>

                  {/* Bottle Price (Mobile vs Desktop) */}
                  <div className="sm:col-span-3 flex sm:justify-end items-center justify-between text-xs sm:text-sm">
                    <span className="sm:hidden text-[#F9EBE0]/60 font-mono uppercase">Botella:</span>
                    <span className="font-mono font-bold text-[#E5C07B] text-base">
                      {item.bottlePrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </section>
  );
};
