import React from 'react';
import { BAR_DATA, IMAGES } from '../data/barInfo';
import { ContentTranslation, Language } from '../data/translations';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface LocationMapSectionProps {
  t: ContentTranslation;
  lang: Language;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({ t }) => {
  return (
    <section id="location" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Magazine Eyebrow */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="h-[1px] w-12 bg-[#E5C07B]" />
        <span className="text-xs uppercase tracking-widest text-[#E5C07B] font-medium font-sans-clean">
          {t.locationEyebrow}
        </span>
      </div>

      {/* Main Location Bubble Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Photo Bubble + Title Quote + Subtitle */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 glass-bubble-solid rounded-[32px] p-6 sm:p-8 flex flex-col justify-between border border-[#FFF8F2]/20 relative overflow-hidden group"
        >
          {/* Location Image Frame */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-[#FFF8F2]/15 shadow-xl">
            <img
              src={IMAGES.locationNeighborhood}
              alt="Facultad de Ingeniería UBA, San Telmo, Buenos Aires"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#580714] via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#FFF8F2] bg-[#580714]/90 backdrop-blur-md px-3 py-2 rounded-lg border border-[#FFF8F2]/10">
              <span className="font-editorial text-xs sm:text-sm text-[#E5C07B] leading-tight">
                {t.locationImageCaption}
              </span>
            </div>
          </div>

          {/* Location Quote & Subtitle */}
          <div className="mt-6">
            <a
              href={BAR_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/addr inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#E5C07B] mb-2 font-sans-clean hover:underline"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{BAR_DATA.address}</span>
            </a>

            <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#FFF8F2] leading-snug font-normal">
              {t.locationTitle}
            </h3>

            <p className="text-xs sm:text-sm text-[#FFF8F2]/75 mt-3 font-sans-clean font-light leading-relaxed">
              {t.locationSubtitle}
            </p>
          </div>

          {/* Navigation Link */}
          <div className="mt-6 pt-4 border-t border-[#FFF8F2]/10 flex justify-end">
            <a
              href={BAR_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#E5C07B] text-[#580714] font-semibold text-xs transition-all flex items-center space-x-2 shadow-md hover:bg-[#FFF8F2] hover:scale-102"
            >
              <Navigation className="w-3.5 h-3.5 fill-current" />
              <span>{t.locationDirections}</span>
            </a>
          </div>

        </motion.div>

        {/* Right Column: Google Maps Interactive Embed */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 glass-bubble rounded-[32px] p-2 border border-[#FFF8F2]/20 flex flex-col justify-between min-h-[380px] relative overflow-hidden"
        >
          <div className="w-full h-full min-h-[360px] rounded-[26px] overflow-hidden relative bg-[#580714]">
            <iframe
              title="BRUT bar Google Map Location"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Av.%20Independencia%20320,%20C1099%20AAD,%20CABA,%20Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed"
            />

            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 glass-bubble-solid px-4 py-2 rounded-2xl border border-[#FFF8F2]/20 flex items-center space-x-2.5 shadow-xl">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E5C07B] animate-ping" />
              <div>
                <div className="font-editorial text-base text-[#FFF8F2] leading-none">BRUT bar</div>
                <div className="text-[10px] uppercase text-[#E5C07B] mt-0.5 font-sans-clean">{BAR_DATA.address}</div>
              </div>
            </div>

            {/* Direct Link to Google Maps */}
            <a
              href={BAR_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-[#580714]/95 hover:bg-[#580714] text-[#E5C07B] text-xs font-semibold border border-[#FFF8F2]/20 transition-all flex items-center space-x-1.5 shadow-xl group"
            >
              <span>{t.locationDirections}</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </motion.div>

      </div>

    </section>
  );
};
