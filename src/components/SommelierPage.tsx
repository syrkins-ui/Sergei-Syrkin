import React, { useState } from 'react';
import { Language } from '../data/translations';
import { SOMMELIER_DATA } from '../data/sommelierData';
import { getWhatsAppReservationUrl } from '../data/barInfo';
import { 
  ArrowLeft, 
  MessageCircle, 
  GraduationCap, 
  Sparkles, 
  Compass, 
  BookOpen, 
  Wine, 
  Share2, 
  Check 
} from 'lucide-react';
import { motion } from 'motion/react';

interface SommelierPageProps {
  lang: Language;
  onBackToHome: () => void;
}

export const SommelierPage: React.FC<SommelierPageProps> = ({ lang, onBackToHome }) => {
  const sommelier = SOMMELIER_DATA[lang] || SOMMELIER_DATA['ES'];
  const [copiedLink, setCopiedLink] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${sommelier.name} • ${sommelier.roleSubtitle}`,
        url: window.location.href,
      }).catch(() => {});
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#A84452] hover:text-[#2B2B2D] transition-colors font-semibold group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{sommelier.backToHome}</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#FBF7F1] border border-[#2B2B2D]/15 hover:border-[#A84452] text-[#2B2B2D] hover:text-[#A84452] text-xs transition-all cursor-pointer shadow-sm"
            title="Compartir perfil"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#A84452]" />}
            <span className="font-mono text-[11px]">{copiedLink ? '✓' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="pt-10 sm:pt-16 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[28px] overflow-hidden border border-[#2B2B2D]/12 shadow-xl bg-[#EDE2D4] group">
              <img
                src={photoError ? '/images/004.png' : '/images/Polina.png'}
                alt={`${sommelier.name} • ${sommelier.roleSubtitle}`}
                referrerPolicy="no-referrer"
                onError={() => setPhotoError(true)}
                className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02] group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Bottom Badge inside portrait */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#FBF7F1]/92 backdrop-blur-md border border-[#2B2B2D]/10 flex items-center justify-between shadow-md">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-widest text-[#A84452] font-semibold">
                    {sommelier.pageTitleBadge}
                  </div>
                  <div className="font-editorial text-lg text-[#2B2B2D] leading-tight">
                    {sommelier.name}
                  </div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#A84452]" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Name, Titles, Quote & Direct CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-[1px] w-12 bg-[#A84452]" />
                <span className="text-xs uppercase tracking-widest text-[#A84452] font-semibold">
                  {sommelier.pageTitleBadge}
                </span>
              </div>

              <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl text-[#2B2B2D] tracking-tight leading-[0.95]">
                {sommelier.name}
              </h1>

              {/* Roles tag list */}
              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs sm:text-sm text-[#A84452] font-sans-clean font-medium">
                {sommelier.roles.map((role, idx) => (
                  <React.Fragment key={role}>
                    <span>{role}</span>
                    {idx < sommelier.roles.length - 1 && <span className="text-[#2B2B2D]/30 font-mono">/</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Quote Callout */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#FBF7F1] border border-[#A84452]/20 shadow-sm relative overflow-hidden">
              <span className="font-editorial text-6xl text-[#A84452]/20 absolute -top-2 left-3 select-none pointer-events-none">
                “
              </span>
              <p className="font-editorial text-lg sm:text-xl lg:text-2xl text-[#2B2B2D] leading-relaxed italic relative z-10">
                {sommelier.quote}
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-[#A84452] hover:bg-[#8E3442] text-[#FBF7F1] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#A84452]/20 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{sommelier.ctaButtonWhatsApp}</span>
              </a>

              <button
                onClick={onBackToHome}
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-full bg-[#FBF7F1] hover:bg-[#EFE5D8] text-[#2B2B2D] border border-[#2B2B2D]/15 hover:border-[#A84452]/40 text-xs sm:text-sm transition-all cursor-pointer"
              >
                <span>{sommelier.backToHome}</span>
              </button>
            </div>

          </motion.div>

        </div>
      </section>

      {/* Main Content Grid: About & Academic Background */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2B2B2D]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* About Me Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-[1px] w-8 bg-[#A84452]" />
              <h2 className="text-xs uppercase tracking-widest text-[#A84452] font-semibold">
                {sommelier.aboutTitle}
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#4E4C4F] leading-relaxed font-normal font-sans-clean">
              {sommelier.aboutParagraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Academic Background / Credentials */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-4 h-4 text-[#A84452]" />
              <h2 className="text-xs uppercase tracking-widest text-[#A84452] font-semibold">
                {sommelier.educationTitle}
              </h2>
            </div>

            <div className="space-y-3">
              {sommelier.educationBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10 hover:border-[#A84452]/40 transition-colors shadow-sm"
                >
                  <div className="font-editorial text-lg text-[#2B2B2D] leading-snug">
                    {badge.institution}
                  </div>
                  <div className="text-xs text-[#A84452] mt-1 font-sans-clean font-normal leading-relaxed">
                    {badge.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Philosophy & Tasting Focus (3 Pillars) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2B2B2D]/10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#A84452] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BRUT bar Manifesto</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2D] tracking-tight">
            {sommelier.philosophyTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#4E4C4F] mt-2 font-normal font-sans-clean">
            {sommelier.philosophySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {sommelier.philosophyPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-[24px] bg-[#FBF7F1] border border-[#2B2B2D]/10 hover:border-[#A84452]/45 transition-all duration-300 shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="text-xs font-mono font-bold text-[#A84452] uppercase tracking-widest mb-3">
                  0{idx + 1}
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl text-[#2B2B2D] leading-snug group-hover:text-[#A84452] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4E4C4F] mt-3 font-normal font-sans-clean leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="h-[1px] w-full bg-[#2B2B2D]/10 mt-6 group-hover:bg-[#A84452]/40 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Experience & Projects Showcase */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2B2B2D]/10">
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center space-x-3 mb-2">
            <Compass className="w-4 h-4 text-[#A84452]" />
            <span className="text-xs uppercase tracking-widest text-[#A84452] font-semibold">
              Curaduría & Trayectoria
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2D] tracking-tight">
            {sommelier.experienceTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#4E4C4F] mt-1 font-normal font-sans-clean">
            {sommelier.experienceSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {sommelier.projects.map((proj, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10 hover:border-[#A84452]/45 transition-all duration-300 shadow-sm group"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A84452] font-semibold inline-block mb-2">
                {proj.tag}
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl text-[#2B2B2D] group-hover:text-[#A84452] transition-colors leading-snug">
                {proj.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4E4C4F] mt-2 font-normal font-sans-clean leading-relaxed">
                {proj.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[32px] bg-[#EFE5D8] border border-[#A84452]/25 shadow-sm text-center space-y-6 relative overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-[#A84452]/10 border border-[#A84452]/25 flex items-center justify-center mx-auto text-[#A84452]">
            <Wine className="w-5 h-5" />
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2D] leading-tight">
              {sommelier.ctaHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[#4E4C4F] font-normal font-sans-clean max-w-xl mx-auto leading-relaxed">
              {sommelier.ctaText}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#25D366]/25 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{sommelier.ctaButtonWhatsApp}</span>
            </a>

            <button
              onClick={onBackToHome}
              className="inline-flex items-center space-x-2 px-6 py-4 rounded-full bg-[#FBF7F1] hover:bg-[#FFFFFF] text-[#2B2B2D] border border-[#2B2B2D]/15 hover:border-[#A84452]/40 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer"
            >
              <span>{sommelier.backToHome}</span>
            </button>
          </div>
        </div>
      </section>

    </article>
  );
};
