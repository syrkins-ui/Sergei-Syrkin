import React from 'react';
import { IMAGES } from '../data/barInfo';
import { ContentTranslation } from '../data/translations';
import { motion } from 'motion/react';

interface InteriorBubbleSectionProps {
  t: ContentTranslation;
}

export const InteriorBubbleSection: React.FC<InteriorBubbleSectionProps> = ({ t }) => {
  return (
    <section id="interior" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Eyebrow */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="h-[1px] w-12 bg-[#E5C07B]" />
        <span className="text-xs uppercase tracking-widest text-[#E5C07B] font-medium font-sans-clean">
          {t.interiorEyebrow}
        </span>
      </div>

      {/* Simplified Image & Card Bubble */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass-bubble-solid rounded-[32px] p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-[#FFF8F2]/20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Wine Collection Picture */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#FFF8F2]/20 shadow-2xl">
              <img
                src={IMAGES.wineCollection}
                alt="Colección de vinos BRUT bar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#580714]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs font-editorial text-[#E5C07B]">
                {t.interiorImageCaption}
              </div>
            </div>
          </div>

          {/* Right Column: Title and Subtitle ONLY */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Main Title Quote */}
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl leading-[1.18] text-[#FFF8F2] font-normal">
              {t.interiorTitle}
            </h2>

            <div className="w-16 h-[1px] bg-[#E5C07B]/40 my-6" />

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#FFF8F2]/85 font-sans-clean font-light leading-relaxed">
              {t.interiorSubtitle}
            </p>

          </div>

        </div>
      </motion.div>

    </section>
  );
};
