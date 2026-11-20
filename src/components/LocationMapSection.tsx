import React from 'react';
import { ContentTranslation, Language } from '../data/translations';
import { SanTelmoGoogleMap } from './SanTelmoGoogleMap';
import { SAN_TELMO_LANDMARKS } from '../data/landmarks3D';
import { ExternalLink, Footprints } from 'lucide-react';
import { motion } from 'motion/react';

interface LocationMapSectionProps {
  t: ContentTranslation;
  lang: Language;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({ t, lang }) => {
  const landmarks = SAN_TELMO_LANDMARKS.filter(l => !l.isOrigin);

  return (
    <section id="location" className="pt-12 sm:pt-20 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Magazine Eyebrow */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-[1px] w-12 bg-[#A84452]" />
        <span className="text-xs uppercase tracking-widest text-[#A84452] font-semibold font-sans-clean">
          {t.locationEyebrow}
        </span>
      </div>

      {/* Main Section Heading */}
      <div className="mb-8">
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2D] leading-tight font-normal">
          {t.map3dTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#4E4C4F] mt-3 max-w-3xl font-sans-clean font-normal leading-relaxed">
          {t.map3dSubtitle}
        </p>
      </div>

      {/* 3D Satellite Google Map with Standard Pins & InfoWindow */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <SanTelmoGoogleMap t={t} lang={lang} />

        {/* Quick Walking Distances to Surrounding Landmarks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {landmarks.slice(0, 4).map((lm) => (
            <a 
              key={lm.id}
              href={lm.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl p-4 bg-[#FBF7F1] border border-[#2B2B2D]/10 hover:border-[#A84452]/50 hover:bg-[#FFFFFF] transition-all flex flex-col justify-between group cursor-pointer shadow-sm"
            >
              <div className="flex items-center justify-between text-[#A84452] text-[10px] uppercase tracking-wider font-semibold">
                <span className="flex items-center space-x-1">
                  <Footprints className="w-3 h-3" />
                  <span>{lm.walkingTimeMin} min ({lm.distanceMeters}m)</span>
                </span>
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </div>
              <div className="font-editorial text-base sm:text-lg text-[#2B2B2D] group-hover:text-[#A84452] transition-colors mt-2 line-clamp-1">
                {lm.name[lang]}
              </div>
              <div className="text-[11px] text-[#6E6A6D] line-clamp-1 mt-0.5">
                {lm.address}
              </div>
            </a>
          ))}
        </div>

      </motion.div>

    </section>
  );
};
