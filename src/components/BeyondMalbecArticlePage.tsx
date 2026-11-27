import React, { useState } from 'react';
import { Language } from '../data/translations';
import {
  ARTICLE_COVER_IMAGE,
  BEYOND_MALBEC_ARTICLE,
  ArticleWineSection,
} from '../data/beyondMalbecArticle';
import { BAR_DATA, getWhatsAppReservationUrl } from '../data/barInfo';
import {
  ArrowLeft,
  Check,
  Share2,
  MessageCircle,
  Navigation,
  Sparkles,
  Mountain,
} from 'lucide-react';
import { motion } from 'motion/react';

interface BeyondMalbecArticlePageProps {
  lang: Language;
  onBackToHome: () => void;
  onGoToTasting: () => void;
}

const WineEditorialBlock: React.FC<{
  wine: ArticleWineSection;
  wineryLabel: string;
  regionLabel: string;
  methodLabel: string;
}> = ({ wine, wineryLabel, regionLabel, methodLabel }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.section
      id={wine.id}
      aria-labelledby={`heading-${wine.id}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-24 pt-10 sm:pt-14 border-t border-[#2B2B2D]/12"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-7 md:gap-10 items-start">
        {/* Visual column: real bottle cutout when available, or crisp Andean altitude card for Salentein */}
        <div className="md:col-span-4 flex flex-col items-center">
          <div className="w-full rounded-[24px] bg-[#FBF7F1] border border-[#2B2B2D]/10 px-6 py-7 flex flex-col items-center justify-center relative overflow-hidden">
            <span className="font-editorial text-sm text-[#A84452] tracking-widest absolute top-4 left-5">
              {wine.number}
            </span>

            {wine.image && !imgFailed ? (
              <div className="h-56 sm:h-64 w-full flex items-center justify-center">
                <img
                  src={encodeURI(wine.image)}
                  alt={wine.heading.replace(/^\d+\.\s*/, '')}
                  loading="lazy"
                  onError={() => setImgFailed(true)}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_14px_24px_rgba(43,43,45,0.2)]"
                />
              </div>
            ) : (
              <div className="h-56 sm:h-64 w-full flex flex-col items-center justify-center text-center px-3">
                <Mountain className="w-9 h-9 text-[#A84452] stroke-[1.4] mb-4" />
                <div className="font-editorial text-4xl text-[#2B2B2D] leading-none">
                  1 150–1 200 m
                </div>
                <div className="mt-2.5 text-xs tracking-wide text-[#6E6A6D] font-sans-clean">
                  Finca El Oasis · Tunuyán
                </div>
                <div className="mt-1 text-xs font-semibold text-[#A84452] font-sans-clean">
                  100% Chardonnay · Blanc de Blancs
                </div>
              </div>
            )}
          </div>

          {/* Crisp unboxed technical notes */}
          <dl className="w-full mt-4 space-y-2 text-xs font-sans-clean px-1">
            <div className="flex items-baseline justify-between gap-3 border-b border-[#2B2B2D]/8 pb-1.5">
              <dt className="text-[#6E6A6D] shrink-0">{wineryLabel}</dt>
              <dd className="text-[#2B2B2D] font-semibold text-right">{wine.winery}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-[#2B2B2D]/8 pb-1.5">
              <dt className="text-[#6E6A6D] shrink-0">{regionLabel}</dt>
              <dd className="text-[#2B2B2D] font-medium text-right">{wine.region}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[#6E6A6D] shrink-0">{methodLabel}</dt>
              <dd className="text-[#A84452] font-medium text-right">{wine.method}</dd>
            </div>
          </dl>
        </div>

        {/* Editorial copy column */}
        <div className="md:col-span-8 flex flex-col justify-center">
          <h2
            id={`heading-${wine.id}`}
            className="font-editorial text-2xl sm:text-3xl lg:text-[34px] text-[#2B2B2D] tracking-tight leading-[1.12] text-balance"
          >
            {wine.heading}
          </h2>

          <div className="mt-5 space-y-4 text-base sm:text-[17px] text-[#3B393C] leading-[1.72] font-sans-clean">
            {wine.paragraphs.map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export const BeyondMalbecArticlePage: React.FC<BeyondMalbecArticlePageProps> = ({
  lang,
  onBackToHome,
  onGoToTasting,
}) => {
  const article = BEYOND_MALBEC_ARTICLE[lang] || BEYOND_MALBEC_ARTICLE.ES;
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2200);
  };

  return (
    <article
      itemScope
      itemType="https://schema.org/Article"
      className="pt-6 sm:pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
    >
      {/* Top Utility Bar: Back + Share URL */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center justify-between gap-4 pb-6 border-b border-[#2B2B2D]/10"
      >
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.18em] text-[#2B2B2D] hover:text-[#A84452] font-semibold transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-[#A84452] group-hover:-translate-x-0.5 transition-transform" />
          <span>{article.backLabel}</span>
        </button>

        <button
          type="button"
          onClick={handleCopyUrl}
          className="inline-flex items-center space-x-1.5 text-xs text-[#5C595D] hover:text-[#A84452] transition-colors cursor-pointer"
        >
          {linkCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">{article.copiedLinkLabel}</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>{article.copyLinkLabel}</span>
            </>
          )}
        </button>
      </nav>

      {/* Editorial Header */}
      <header className="pt-8 sm:pt-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-sans-clean text-[#6E6A6D] mb-4">
          <span className="text-[#A84452] font-semibold tracking-wide">{article.eyebrow}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime}</span>
          <span aria-hidden="true">·</span>
          <span itemProp="author">{article.publishedLabel}</span>
        </div>

        <h1
          itemProp="headline"
          className="font-editorial text-4xl sm:text-5xl lg:text-[56px] text-[#2B2B2D] tracking-tight leading-[1.04] text-balance"
        >
          {article.h1}
        </h1>

        <meta itemProp="description" content={article.metaDescription} />

        {/* Editorial Hero Image */}
        <figure className="mt-7 sm:mt-9 rounded-[28px] overflow-hidden border border-[#2B2B2D]/12 shadow-lg bg-[#2B2B2D] aspect-[16/10] sm:aspect-[16/9]">
          <img
            src={ARTICLE_COVER_IMAGE}
            alt={article.h1}
            itemProp="image"
            className="w-full h-full object-cover object-center"
          />
        </figure>
      </header>

      {/* Lead Intro Copy */}
      <div
        itemProp="articleBody"
        className="mt-8 sm:mt-10 space-y-5 text-base sm:text-lg text-[#2B2B2D] leading-[1.72] font-sans-clean"
      >
        {article.introParagraphs.map((para, index) => (
          <p key={index} className={index === 0 ? 'text-lg sm:text-[19px] font-normal' : 'text-[#3B393C]'}>
            {para}
          </p>
        ))}

        {/* Clean Anchor Navigation / Table of Contents */}
        <aside className="mt-8 rounded-2xl bg-[#FBF7F1] border border-[#2B2B2D]/10 p-5 sm:p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A84452] mb-3">
            {article.tocTitle}
          </div>
          <ol className="space-y-2">
            {article.wines.map((wine) => (
              <li key={wine.id}>
                <a
                  href={`#${wine.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(wine.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="group flex items-baseline gap-2.5 text-sm sm:text-[15px] text-[#2B2B2D] hover:text-[#A84452] transition-colors"
                >
                  <span className="font-mono text-xs text-[#A84452] shrink-0">{wine.number}</span>
                  <span className="group-hover:underline underline-offset-4 decoration-[#A84452]/40">
                    {wine.heading.replace(/^\d+\.\s*/, '')}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        {/* Five Wines Sections */}
        <div className="mt-10 sm:mt-12 space-y-10 sm:space-y-14">
          {article.wines.map((wine) => (
            <WineEditorialBlock
              key={wine.id}
              wine={wine}
              wineryLabel={article.wineryLabel}
              regionLabel={article.regionLabel}
              methodLabel={article.methodLabel}
            />
          ))}
        </div>

        {/* Closing Location & Tasting CTA Section */}
        <section className="mt-12 sm:mt-16 rounded-[28px] bg-[#FBF7F1] border border-[#A84452]/25 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 md:gap-8 items-center">
            <div className="md:col-span-7">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-[1px] w-10 bg-[#A84452]" />
                <span className="text-xs font-semibold tracking-wide text-[#A84452]">
                  BRUT Bar · Av. Independencia 320, San Telmo
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl text-[#2B2B2D] tracking-tight leading-tight">
                {article.closingHeading}
              </h2>

              <p className="mt-4 text-base sm:text-[17px] text-[#3B393C] leading-[1.7] font-sans-clean">
                {article.closingParagraph}
              </p>
            </div>

            <div className="md:col-span-5">
              <button
                type="button"
                onClick={onGoToTasting}
                className="group block w-full rounded-2xl overflow-hidden border border-[#2B2B2D]/12 shadow-md aspect-[4/3] bg-[#2B2B2D] cursor-pointer"
                aria-label={article.ctaTasting}
              >
                <img
                  src="/assets/aistudio/Gemini_Generated_Image_piyftbpiyftbpiyf_f0f697ec.png"
                  alt={article.ctaTasting}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </button>
            </div>
          </div>

          <div className="mt-7 pt-6 border-t border-[#2B2B2D]/10 flex flex-wrap items-center gap-3">
            <a
              href={getWhatsAppReservationUrl(article.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold transition-colors shadow-sm whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>{article.ctaWhatsApp}</span>
            </a>

            <button
              type="button"
              onClick={onGoToTasting}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-[#A84452] hover:bg-[#8E3442] text-[#FBF7F1] text-sm font-semibold transition-colors shadow-sm whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{article.ctaTasting}</span>
            </button>

            <a
              href={BAR_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-[#F6EFE6] hover:bg-[#EFE5D8] text-[#2B2B2D] border border-[#2B2B2D]/15 text-sm font-semibold transition-colors whitespace-nowrap"
            >
              <Navigation className="w-4 h-4 text-[#A84452] shrink-0" />
              <span>{article.ctaMaps}</span>
            </a>
          </div>
        </section>
      </div>
    </article>
  );
};
