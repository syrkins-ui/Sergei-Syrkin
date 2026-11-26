import { Language } from '../data/translations';
import { BAR_DATA } from '../data/barInfo';
import {
  ARTICLE_COVER_IMAGE,
  ARTICLE_PUBLISHED_DATE,
  ARTICLE_SLUGS,
  BEYOND_MALBEC_ARTICLE,
} from '../data/beyondMalbecArticle';

export type AppPage = 'home' | 'sommelier' | 'events' | 'tasting' | 'article-beyond-malbec';

const HTML_LANG_MAP: Record<Language, string> = {
  ES: 'es-AR',
  PT: 'pt-BR',
  EN: 'en',
  RU: 'ru',
};

const OG_LOCALE_MAP: Record<Language, string> = {
  ES: 'es_AR',
  PT: 'pt_BR',
  EN: 'en_US',
  RU: 'ru_RU',
};

const BASE_PAGE_SEO: Record<
  Exclude<AppPage, 'article-beyond-malbec'>,
  Record<Language, { title: string; description: string }>
> = {
  home: {
    ES: {
      title: 'BRUT bar — Casa de vinos espumantes argentinos | San Telmo, Buenos Aires',
      description:
        'El primer bar de vinos espumantes argentinos en Buenos Aires. Más de 40 etiquetas, pet nat, brunch de autor, degustaciones y coctelería en Av. Independencia 320, San Telmo.',
    },
    EN: {
      title: 'BRUT bar — House of Argentine Sparkling Wines | San Telmo, Buenos Aires',
      description:
        'The first Argentine sparkling wine bar in Buenos Aires. Discover 40+ sparkling labels, natural pét-nats, curated tastings, and brunch at Av. Independencia 320, San Telmo.',
    },
    RU: {
      title: 'BRUT bar — Дом аргентинских игристых вин | Сан-Тельмо, Буэнос-Айрес',
      description:
        'Первый бар аргентинских игристых вин в Буэнос-Айресе: более 40 этикеток, натуральные пет-наты, дегустации и бранчи на Av. Independencia 320 в Сан-Тельмо.',
    },
    PT: {
      title: 'BRUT bar — Casa de vinhos espumantes argentinos | San Telmo, Buenos Aires',
      description:
        'O primeiro bar de espumantes argentinos em Buenos Aires. Mais de 40 rótulos, pét-nats, brunch autoral e degustações na Av. Independencia 320, San Telmo.',
    },
  },
  tasting: {
    ES: {
      title: 'Degustación a ciegas de 4 espumantes argentinos | BRUT bar San Telmo',
      description:
        'Probá 4 copas de espumantes argentinos a ciegas con pistas, quesos y jamón crudo en BRUT bar, Buenos Aires. Si acertás todas, ganás una 5ª copa de regalo.',
    },
    EN: {
      title: 'Blind Tasting of 4 Argentine Sparkling Wines | BRUT bar Buenos Aires',
      description:
        'Taste 4 Argentine sparkling wines blind with riddle cards, cheese, and cured ham at BRUT bar in San Telmo. Match all 4 correctly and win a bonus 5th glass.',
    },
    RU: {
      title: 'Слепая дегустация 4 аргентинских игристых вин | BRUT bar Буэнос-Айрес',
      description:
        '4 бокала разных аргентинских игристых с загадками, сыром и хамоном в BRUT bar в Сан-Тельмо. Угадайте все 4 и получите 5-й бокал в подарок.',
    },
    PT: {
      title: 'Degustação às cegas de 4 espumantes argentinos | BRUT bar San Telmo',
      description:
        'Prove 4 taças de espumantes argentinos às cegas com enigmas, queijos e presunto cru no BRUT bar em Buenos Aires e ganhe uma 5ª taça de presente.',
    },
  },
  sommelier: {
    ES: {
      title: 'Polina Schteiner — Head Sommelier y Degustaciones | BRUT bar Buenos Aires',
      description:
        'Degustaciones privadas y grupales de vinos argentinos en el salón exclusivo de BRUT bar (hasta 25 personas) guiadas por nuestra Head Sommelier Polina Schteiner.',
    },
    EN: {
      title: 'Polina Schteiner — Head Sommelier & Wine Tastings | BRUT bar Buenos Aires',
      description:
        'Private and group Argentine wine tastings at BRUT bar in San Telmo (up to 25 guests) curated and hosted by Head Sommelier Polina Schteiner.',
    },
    RU: {
      title: 'Полина Штайнер — Шеф-сомелье и дегустации вин | BRUT bar Буэнос-Айрес',
      description:
        'Организация индивидуальных и групповых винных дегустаций в отдельном зале BRUT bar (до 25 гостей) с шеф-сомелье Полиной Штайнер в Сан-Тельмо.',
    },
    PT: {
      title: 'Polina Schteiner — Head Sommelier e Degustações | BRUT bar Buenos Aires',
      description:
        'Degustações privadas e em grupo de vinhos argentinos na sala exclusiva do BRUT bar (até 25 pessoas) com a Head Sommelier Polina Schteiner.',
    },
  },
  events: {
    ES: {
      title: 'Eventos Privados y Cumpleaños — Salón Negro | BRUT bar San Telmo',
      description:
        'Celebrá tu cumpleaños o evento privado en el Salón Negro de BRUT bar, Buenos Aires. Espumantes argentinos, gastronomía y barra exclusiva en San Telmo.',
    },
    EN: {
      title: 'Private Events & Birthdays — Black Hall | BRUT bar Buenos Aires',
      description:
        'Host your birthday or private event in the Black Hall at BRUT bar in San Telmo, Buenos Aires. Argentine sparkling wines, food pairings, and private service.',
    },
    RU: {
      title: 'Частные мероприятия и дни рождения — Чёрный зал | BRUT bar Буэнос-Айрес',
      description:
        'Аренда Чёрного зала в BRUT bar в Сан-Тельмо для дней рождения, вечеринок и частных мероприятий с аргентинскими игристыми и закусками.',
    },
    PT: {
      title: 'Eventos Privados e Aniversários — Salão Preto | BRUT bar San Telmo',
      description:
        'Comemore seu aniversário ou evento privado no Salão Preto do BRUT bar em Buenos Aires, com espumantes argentinos e gastronomia em San Telmo.',
    },
  },
};

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMetaTag(attr: 'name' | 'property', key: string) {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
}

function upsertLinkTag(rel: string, href: string, extraAttrs?: Record<string, string>) {
  const selector = extraAttrs?.hreflang
    ? `link[rel="${rel}"][hreflang="${extraAttrs.hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  if (extraAttrs) {
    Object.entries(extraAttrs).forEach(([k, v]) => el!.setAttribute(k, v));
  }
}

function clearHreflangLinks() {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
}

function upsertJsonLd(data: Record<string, unknown>) {
  let script = document.head.querySelector('script#dynamic-seo-jsonld') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'dynamic-seo-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function applyPageSeo(page: AppPage, lang: Language) {
  const origin = window.location.origin;
  const barBusinessSchema = {
    '@type': 'BarOrPub',
    '@id': `${origin}/#organization`,
    name: 'BRUT Bar',
    alternateName: 'BRUT bar San Telmo',
    url: origin,
    telephone: BAR_DATA.phone,
    servesCuisine: ['Wine Bar', 'Argentine Sparkling Wine', 'Tapas', 'Brunch'],
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Independencia 320',
      addressLocality: 'San Telmo, Buenos Aires',
      addressRegion: 'CABA',
      postalCode: 'C1099AAQ',
      addressCountry: 'AR',
    },
    sameAs: [BAR_DATA.instagramUrl, BAR_DATA.googleMapsUrl],
  };

  if (page === 'article-beyond-malbec') {
    const article = BEYOND_MALBEC_ARTICLE[lang] || BEYOND_MALBEC_ARTICLE.ES;
    const canonicalUrl = `${origin}/${article.slug}`;
    const imageUrl = `${origin}${ARTICLE_COVER_IMAGE}`;

    document.documentElement.lang = article.htmlLang;
    document.title = article.seoTitle;

    upsertMetaTag('name', 'description', article.metaDescription);
    upsertMetaTag('name', 'keywords', article.keywords.join(', '));
    upsertMetaTag('name', 'robots', 'index, follow, max-image-preview:large');

    upsertMetaTag('property', 'og:type', 'article');
    upsertMetaTag('property', 'og:site_name', 'BRUT Bar San Telmo');
    upsertMetaTag('property', 'og:title', article.seoTitle);
    upsertMetaTag('property', 'og:description', article.metaDescription);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:image', imageUrl);
    upsertMetaTag('property', 'og:locale', article.ogLocale);
    upsertMetaTag('property', 'article:published_time', `${ARTICLE_PUBLISHED_DATE}T12:00:00-03:00`);
    upsertMetaTag('property', 'article:section', 'Wine Guide');

    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', article.seoTitle);
    upsertMetaTag('name', 'twitter:description', article.metaDescription);
    upsertMetaTag('name', 'twitter:image', imageUrl);

    upsertLinkTag('canonical', canonicalUrl);

    clearHreflangLinks();
    upsertLinkTag('alternate', `${origin}/${ARTICLE_SLUGS.ES}`, { hreflang: 'es' });
    upsertLinkTag('alternate', `${origin}/${ARTICLE_SLUGS.EN}`, { hreflang: 'en' });
    upsertLinkTag('alternate', `${origin}/${ARTICLE_SLUGS.RU}`, { hreflang: 'ru' });
    upsertLinkTag('alternate', `${origin}/${ARTICLE_SLUGS.PT}`, { hreflang: 'pt' });
    upsertLinkTag('alternate', `${origin}/${ARTICLE_SLUGS.ES}`, { hreflang: 'x-default' });

    upsertJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        barBusinessSchema,
        {
          '@type': 'Article',
          '@id': `${canonicalUrl}#article`,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
          },
          headline: article.h1,
          alternativeHeadline: article.seoTitle,
          description: article.metaDescription,
          inLanguage: article.htmlLang,
          keywords: article.keywords.join(', '),
          datePublished: `${ARTICLE_PUBLISHED_DATE}T12:00:00-03:00`,
          dateModified: `${ARTICLE_PUBLISHED_DATE}T12:00:00-03:00`,
          image: [imageUrl],
          author: {
            '@type': 'Organization',
            name: 'BRUT Bar San Telmo',
            url: origin,
          },
          publisher: {
            '@id': `${origin}/#organization`,
          },
        },
        {
          '@type': 'ItemList',
          name: article.h1,
          numberOfItems: article.wines.length,
          itemListElement: article.wines.map((wine, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: wine.heading.replace(/^\d+\.\s*/, ''),
            url: `${canonicalUrl}#${wine.id}`,
            description: wine.paragraphs[0],
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'BRUT Bar',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: article.h1,
              item: canonicalUrl,
            },
          ],
        },
      ],
    });
    return;
  }

  // Standard site pages
  const pageSeo = BASE_PAGE_SEO[page][lang] || BASE_PAGE_SEO.home.ES;
  const canonicalUrl = `${origin}${window.location.pathname === '/' ? '/' : window.location.pathname}`;
  const defaultImage = `${origin}/images/001.png`;

  document.documentElement.lang = HTML_LANG_MAP[lang] || 'es-AR';
  document.title = pageSeo.title;

  upsertMetaTag('name', 'description', pageSeo.description);
  upsertMetaTag('name', 'robots', 'index, follow');
  removeMetaTag('name', 'keywords');
  removeMetaTag('property', 'article:published_time');
  removeMetaTag('property', 'article:section');

  upsertMetaTag('property', 'og:type', 'website');
  upsertMetaTag('property', 'og:site_name', 'BRUT Bar San Telmo');
  upsertMetaTag('property', 'og:title', pageSeo.title);
  upsertMetaTag('property', 'og:description', pageSeo.description);
  upsertMetaTag('property', 'og:url', canonicalUrl);
  upsertMetaTag('property', 'og:image', defaultImage);
  upsertMetaTag('property', 'og:locale', OG_LOCALE_MAP[lang] || 'es_AR');

  upsertMetaTag('name', 'twitter:card', 'summary_large_image');
  upsertMetaTag('name', 'twitter:title', pageSeo.title);
  upsertMetaTag('name', 'twitter:description', pageSeo.description);
  upsertMetaTag('name', 'twitter:image', defaultImage);

  upsertLinkTag('canonical', canonicalUrl);
  clearHreflangLinks();

  upsertJsonLd({
    '@context': 'https://schema.org',
    ...barBusinessSchema,
    description: pageSeo.description,
  });
}
