import React, { useState } from 'react';
import { Language } from '../data/translations';
import { SOMMELIER_DATA } from '../data/sommelierData';
import { getWhatsAppReservationUrl } from '../data/barInfo';
import { ArrowLeft, MessageCircle, GraduationCap, Share2, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface SommelierPageProps {
  lang: Language;
  onBackToHome: () => void;
}

export const SommelierPage: React.FC<SommelierPageProps> = ({ lang, onBackToHome }) => {
  const sommelier = SOMMELIER_DATA[lang] || SOMMELIER_DATA.ES;
  const [copiedLink, setCopiedLink] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${sommelier.name} · ${sommelier.roleSubtitle}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const whatsappUrl = getWhatsAppReservationUrl(sommelier.whatsappMessage);

  return (
    <article className="min-h-screen bg-[#F6EFE6] text-[#2B2B2D] font-sans-clean selection:bg-[#A84452] selection:text-[#FBF7F1] pb-24">
      {/* Top Breadcrumb & Return Bar */}
      <div className="border-b border-[#2B2B2D]/10 bg-[#EDE2D4]/85 backdrop-blur-md sticky top-20 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#A84452] hover:text-[#2B2B2D] transition-colors font-semibold group cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{sommelier.backToHome}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#FBF7F1] border border-[#2B2B2D]/15 hover:border-[#A84452] text-[#2B2B2D] hover:text-[#A84452] text-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Share profile"
          >
            {copiedLink ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Share2 className="w-3.5 h-3.5 text-[#A84452]" />
            )}
            <span className="font-mono text-[11px]">{copiedLink ? '✓' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Hero Section: Portrait, Name & Quote */}
      <section className="pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[28px] overflow-hidden border border-[#2B2B2D]/12 shadow-lg bg-[#EDE2D4]">
              <img
                src={photoError ? '/images/004.png' : '/images/Polina.png'}
                alt={`${sommelier.name} · ${sommelier.roleSubtitle}`}
                referrerPolicy="no-referrer"
                onError={() => setPhotoError(true)}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#FBF7F1]/92 backdrop-blur-md border border-[#2B2B2D]/10">
                <div className="text-[11px] text-[#A84452] font-semibold">
                  {sommelier.pageTitleBadge}
                </div>
                <div className="font-editorial text-xl text-[#2B2B2D] leading-tight">
                  {sommelier.name}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Name, Roles & Quote */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-[1px] w-12 bg-[#A84452]" />
                <span className="text-xs tracking-wide text-[#A84452] font-semibold">
                  {sommelier.pageTitleBadge}
                </span>
              </div>

              <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl text-[#2B2B2D] tracking-tight leading-[0.95] text-balance">
                {sommelier.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs sm:text-sm text-[#A84452] font-medium">
                {sommelier.roles.map((role, idx) => (
                  <React.Fragment key={role}>
                    <span>{role}</span>
                    {idx < sommelier.roles.length - 1 && (
                      <span aria-hidden="true" className="text-[#2B2B2D]/30">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="p-6 sm:p-8 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10 relative overflow-hidden">
              <span
                aria-hidden="true"
                className="font-editorial text-6xl text-[#A84452]/20 absolute -top-2 left-4 select-none pointer-events-none"
              >
                “
              </span>
              <p className="font-editorial text-lg sm:text-xl lg:text-2xl text-[#2B2B2D] leading-relaxed italic relative z-10">
                {sommelier.quote}
              </p>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* About Me & Education */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2B2B2D]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* About Me */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="h-[1px] w-8 bg-[#A84452]" />
              <h2 className="text-xs tracking-widest uppercase text-[#A84452] font-semibold">
                {sommelier.aboutTitle}
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#4E4C4F] leading-relaxed">
              {sommelier.aboutParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-2.5">
              <GraduationCap className="w-4 h-4 text-[#A84452]" />
              <h2 className="text-xs tracking-widest uppercase text-[#A84452] font-semibold">
                {sommelier.educationTitle}
              </h2>
            </div>

            <div className="space-y-3">
              {sommelier.educationBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10"
                >
                  <div className="font-editorial text-xl text-[#2B2B2D] leading-snug">
                    {badge.institution}
                  </div>
                  <div className="text-xs text-[#A84452] mt-1 leading-relaxed">
                    {badge.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wine Tastings Organization at BRUT bar + WhatsApp Booking */}
      <section className="pt-12 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2B2B2D]/10">
        <div className="max-w-2xl mb-10">
          <div className="flex items-center space-x-3 mb-2.5">
            <div className="h-[1px] w-10 bg-[#A84452]" />
            <span className="text-xs tracking-wide text-[#A84452] font-semibold">
              {sommelier.tastingEyebrow}
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2D] tracking-tight text-balance">
            {sommelier.tastingTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sommelier.tastingHighlights.map((item) => (
            <div
              key={item.number}
              className="p-6 sm:p-7 rounded-3xl bg-[#FBF7F1] border border-[#2B2B2D]/10 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[#A84452] font-semibold tracking-widest tabular-nums">
                  {item.number}.
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#2B2B2D] leading-snug mt-3">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[#4E4C4F] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Clean WhatsApp Booking Strip */}
        <div className="mt-8 p-6 sm:p-9 rounded-[28px] bg-[#EFE5D8] border border-[#2B2B2D]/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="font-editorial text-2xl sm:text-3xl text-[#2B2B2D] leading-snug max-w-xl text-balance">
            {sommelier.tastingCtaText}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2.5 px-7 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span>{sommelier.ctaButtonWhatsApp}</span>
          </a>
        </div>
      </section>
    </article>
  );
};
