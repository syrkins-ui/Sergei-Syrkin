import React, { useState } from 'react';
import { Language } from '../data/translations';
import { FRIENDS_PARTNERS, FRIENDS_SECTION_COPY, FriendPartner } from '../data/friendsData';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FriendsCarouselProps {
  lang: Language;
}

const FriendLogoCard: React.FC<{
  partner: FriendPartner;
  visitLabel: string;
}> = ({ partner, visitLabel }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${partner.name} — ${visitLabel}`}
      aria-label={`${partner.name} — ${visitLabel}`}
      className="group h-[144px] sm:h-[164px] rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10 hover:border-[#A84452]/50 hover:bg-white transition-all duration-300 px-6 py-3 flex items-center justify-center relative overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A84452]"
    >
      <ArrowUpRight className="w-4 h-4 text-[#A84452] opacity-0 group-hover:opacity-100 transition-opacity absolute top-3.5 right-3.5" />

      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        {!imgFailed ? (
          <img
            src={partner.logoSrc}
            alt={partner.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className={`${partner.logoClassName ?? 'w-[200px]'} max-w-full h-auto object-contain opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-300 select-none`}
          />
        ) : (
          <span className="font-editorial text-2xl sm:text-3xl text-[#2B2B2D] group-hover:text-[#A84452] transition-colors leading-none tracking-tight text-center">
            {partner.name}
          </span>
        )}
      </div>
    </a>
  );
};

export const FriendsCarousel: React.FC<FriendsCarouselProps> = ({ lang }) => {
  const copy = FRIENDS_SECTION_COPY[lang] || FRIENDS_SECTION_COPY.ES;

  return (
    <section
      id="friends"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="pt-8 sm:pt-10 border-t border-[#2B2B2D]/10"
      >
        <div className="max-w-2xl mb-7 sm:mb-8">
          <div className="flex items-center space-x-3 mb-2.5">
            <div className="h-[1px] w-10 bg-[#A84452]" />
            <span className="text-xs tracking-wide text-[#A84452] font-semibold">
              {copy.eyebrow}
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2D] tracking-tight leading-tight text-balance">
            {copy.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4E4C4F] leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {FRIENDS_PARTNERS.map((partner) => (
            <FriendLogoCard
              key={partner.id}
              partner={partner}
              visitLabel={copy.visitLabel}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};
