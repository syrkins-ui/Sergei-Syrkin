import { Language } from './translations';

export interface ArticleWineSection {
  id: string;
  number: string;
  heading: string;
  winery: string;
  region: string;
  method: string;
  image?: string;
  paragraphs: string[];
}

export interface BeyondMalbecArticleContent {
  slug: string;
  htmlLang: string;
  ogLocale: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  readingTime: string;
  publishedLabel: string;
  backLabel: string;
  copyLinkLabel: string;
  copiedLinkLabel: string;
  tocTitle: string;
  wineryLabel: string;
  regionLabel: string;
  methodLabel: string;
  h1: string;
  introParagraphs: string[];
  wines: ArticleWineSection[];
  closingHeading: string;
  closingParagraph: string;
  ctaWhatsApp: string;
  ctaTasting: string;
  ctaMaps: string;
  waMessage: string;
}

export const ARTICLE_SLUGS: Record<Language, string> = {
  RU: '5-neobychnyh-argentinskih-vin-krome-malbeka',
  EN: '5-unusual-argentine-wines-beyond-malbec',
  ES: '5-vinos-argentinos-fuera-del-malbec',
  PT: '5-vinhos-argentinos-alem-do-malbec',
};

export const SLUG_TO_LANGUAGE: Record<string, Language> = {
  '5-neobychnyh-argentinskih-vin-krome-malbeka': 'RU',
  '5-unusual-argentine-wines-beyond-malbec': 'EN',
  '5-vinos-argentinos-fuera-del-malbec': 'ES',
  '5-vinhos-argentinos-alem-do-malbec': 'PT',
};

export const ARTICLE_PUBLISHED_DATE = '2026-11-26';
export const ARTICLE_COVER_IMAGE = '/images/Vino_vew.png';

export const BEYOND_MALBEC_ARTICLE: Record<Language, BeyondMalbecArticleContent> = {
  RU: {
    slug: ARTICLE_SLUGS.RU,
    htmlLang: 'ru',
    ogLocale: 'ru_RU',
    seoTitle: '5 необычных аргентинских вин кроме Мальбека в Буэнос-Айресе | BRUT Bar San Telmo',
    metaDescription:
      'Ищете дегустацию вин в Буэнос-Айресе? Попробуйте 5 редких аргентинских игристых вин и пет-натов кроме Мальбека в винном баре BRUT Bar в Сан-Тельмо.',
    keywords: [
      'необычные аргентинские вина',
      'аргентинские вина кроме Мальбека',
      'дегустация вин в Буэнос-Айресе',
      'аргентинские игристые вина',
      'пет-наты Аргентина',
      'винный бар Сан-Тельмо',
      'BRUT Bar Buenos Aires',
    ],
    eyebrow: 'Винный гид · Буэнос-Айрес · Сан-Тельмо',
    readingTime: '4 мин чтения',
    publishedLabel: 'BRUT Bar Editorial',
    backLabel: 'На главную',
    copyLinkLabel: 'Скопировать ссылку',
    copiedLinkLabel: 'Ссылка скопирована',
    tocTitle: 'Пять бутылок в подборке',
    wineryLabel: 'Винодельня',
    regionLabel: 'Регион',
    methodLabel: 'Стиль',
    h1: '5 необычных аргентинских вин, которые обязательно нужно попробовать в Буэнос-Айресе (кроме Мальбека)',
    introParagraphs: [
      'Приехать в Буэнос-Айрес и пить только Мальбек — всё равно что прилететь в Рим и ограничиться пиццей маргаритой. За пределами классических мендосских красных в Аргентине прямо сейчас происходит тихая винная революция: виноделы осваивают холодное побережье Атлантики, перепридумывают сам Мальбек в белом игристом формате и возвращают моду на автохтонные сорта в стиле натуральных пет-натов.',
      'Мы собрали пять ярких бутылок, которые ломают стереотипы об аргентинском виноделии. Попробовать эти необычные аргентинские вина по бокалам и бутылкам можно в самом сердце Сан-Тельмо — в нашем винном баре в Буэнос-Айресе BRUT Bar.',
    ],
    wines: [
      {
        id: 'prima-prova-moscato-nature',
        number: '01',
        heading: '1. Prima Prova Moscato Nature — Атлантический бриз в бокале',
        winery: 'Castel Conegliano',
        region: 'Провинция Буэнос-Айрес · Мар-дель-Плата',
        method: 'Классическая шампанизация · 24 мес. · Zero Dosage',
        image: '/images/bottles/Moscato Prima Prova.png',
        paragraphs: [
          'Когда говорят об аргентинском вине, все представляют заснеженные Анды, но никак не океан. Винодельня Castel Conegliano доказала обратное, разбив виноградники в провинции Буэнос-Айрес, недалеко от Мар-дель-Платы, где лозы обдувает прохладный атлантический ветер.',
          'Для этого релиза виноделы взяли ароматный итальянский сорт Moscato Giallo, который обычно ассоциируется со сладкими винами, и сделали из него строгий, абсолютно сухой брют натюр (Zero Dosage). После классической шампанизации и 24 месяцев выдержки на осадке это аргентинское игристое раскрывается цветами апельсина, жасмином, лёгким медовым оттенком и тёплой корочкой свежеиспечённого хлеба.',
        ],
      },
      {
        id: 'castel-conegliano-glera-extra-brut',
        number: '02',
        heading: '2. Castel Conegliano Glera Extra Brut — Аргентинский ответ Просекко',
        winery: 'Castel Conegliano',
        region: 'Sierras del Atlántico · Провинция Буэнос-Айрес',
        method: 'Метод Шарма · Glera Extra Brut',
        image: '/images/bottles/Glera.png',
        paragraphs: [
          'Ещё одна находка с побережья провинции Буэнос-Айрес — из зоны Sierras del Atlántico, зажатой между Мар-дель-Платой и холмами Сьерра-де-лос-Падрес. На каменистых склонах с известковыми почвами здесь прижился сорт Glera — тот самый, из которого в Италии делают Просекко.',
          'Виноделы Томас Старингер и Мариано Сердан используют метод Шарма, чтобы сохранить максимум свежести и хрустящей фруктовости. В бокале — зелёное яблоко, спелая груша, цитрусы и тонкий, деликатный перляж с освежающим послевкусием. Идеальный лёгкий старт вечера в жарком Буэнос-Айресе.',
        ],
      },
      {
        id: 'indomable-blanc-de-malbec',
        number: '03',
        heading: '3. Indomable Espumante Blanc de Malbec — Мальбек, который притворился белым',
        winery: 'Colosso Wines',
        region: 'Лос-Чакайес · Долина Уко, Мендоса',
        method: 'Метод Шампенуаз · 30–36 мес. на осадке',
        image: '/images/bottles/indomable-blanc-malbec-1.png',
        paragraphs: [
          'Даже если вы решили отдохнуть от классических красных, в Аргентине главный сорт страны умеет удивлять. Проект Colosso Wines из Лос-Чакайес (Долина Уко, Мендоса) поставил смелый эксперимент: взял красный виноград Malbec с 20-летних лоз и винифицировал его по-белому — методом бережного прессования целых гроздей.',
          'Дальше — классический метод Шампенуаз и долгая выдержка на осадке (от 30 до 36 месяцев перед дегоржажем). В результате получается игристое неуловимого бледно-розового оттенка, в котором свежесть красных ягод и весенних цветов сочетается с пряными нотами и объёмной, шелковистой текстурой.',
        ],
      },
      {
        id: 'alpamanta-breva-pet-nat-criolla',
        number: '04',
        heading: '4. Alpamanta Breva Pét-Nat Criolla Grande — Дикая история под пивной крышкой',
        winery: 'Alpamanta',
        region: 'Мендоса · Органика и биодинамика',
        method: 'Ансестральный метод · Дикие дрожжи · Без сульфитов',
        image: '/images/bottles/alpamanta breva pet nat rojo.png',
        paragraphs: [
          'Задолго до того, как в Южную Америку завезли Мальбек, главным виноградом региона была Criolla — семейство исторических местных сортов. Органическая и биодинамическая винодельня Alpamanta из Мендосы (винодел Виктория Бронд) подарила сорту Criolla Grande новую жизнь в формате аргентинского пет-ната.',
          'Вино сбраживают на диких дрожжах без добавления сульфитов и разливают в бутылки под кронен-пробку ещё до окончания брожения по дедовскому ансестральному методу. Внутри — взрывной ягодный коктейль насыщенного вишнёвого цвета с ароматами черешни, сливы, малины и смородины, где лёгкая сладость на старте сменяется освежающей кислотностью.',
        ],
      },
      {
        id: 'salentein-cuvee-exceptionnelle-blanc-de-blancs',
        number: '05',
        heading: '5. Salentein Cuvée Exceptionnelle Blanc de Blancs — Высокогорная точность Анд',
        winery: 'Bodegas Salentein',
        region: 'Finca El Oasis · Тунуян, Долина Уко (1150–1200 м)',
        method: '100% Chardonnay · Blanc de Blancs',
        paragraphs: [
          'Чтобы понять, почему Долину Уко называют главной винной жемчужиной Аргентины, нужно подняться на высоту 1150–1200 метров над уровнем моря на виноградник Finca El Oasis в Тунуяне. Именно здесь Bodegas Salentein и винодел Карлос Бауса выращивают Chardonnay для этого изысканного Blanc de Blancs.',
          'Каменистые, хорошо дренированные почвы предгорий Анд дают винограду яркую природную кислотность. В бокале тонкие устойчивые пузырьки раскрывают оттенки зелёного яблока, свежего ананаса и чистую горную минеральность.',
        ],
      },
    ],
    closingHeading: 'Где устроить дегустацию вин в Буэнос-Айресе',
    closingParagraph:
      'Не обязательно лететь в Мендосу или ехать к океану, чтобы собрать всю эту коллекцию в одном маршруте. Заглядывайте в BRUT Bar в Сан-Тельмо (Av. Independencia 320) — мы собрали лучшие аргентинские вина кроме Мальбека, редкие игристые и натуральные пет-наты со всей страны, чтобы открывать для вас другую Аргентину с первого глотка.',
    ctaWhatsApp: 'Забронировать столик в WhatsApp',
    ctaTasting: 'Слепая дегустация 4 вин',
    ctaMaps: 'Построить маршрут',
    waMessage: 'Привет! Прочитал(а) статью про 5 необычных аргентинских вин и хочу попробовать их в BRUT Bar.',
  },

  EN: {
    slug: ARTICLE_SLUGS.EN,
    htmlLang: 'en',
    ogLocale: 'en_US',
    seoTitle: '5 Unusual Argentine Wines to Try in Buenos Aires Beyond Malbec | BRUT Bar',
    metaDescription:
      'Looking for the best wine tasting in Buenos Aires? Discover 5 rare Argentine sparkling wines and pét-nats beyond Malbec at BRUT Bar in San Telmo.',
    keywords: [
      'unusual Argentine wines',
      'Argentine wine beyond Malbec',
      'wine tasting Buenos Aires',
      'Argentine sparkling wine',
      'Argentine pet-nat',
      'San Telmo wine bar',
      'BRUT Bar Buenos Aires',
    ],
    eyebrow: 'Wine Guide · Buenos Aires · San Telmo',
    readingTime: '4 min read',
    publishedLabel: 'BRUT Bar Editorial',
    backLabel: 'Back to home',
    copyLinkLabel: 'Copy article link',
    copiedLinkLabel: 'Link copied',
    tocTitle: 'Five bottles in this guide',
    wineryLabel: 'Winery',
    regionLabel: 'Region',
    methodLabel: 'Style',
    h1: '5 Unusual Argentine Wines You Must Try in Buenos Aires (Beyond Malbec)',
    introParagraphs: [
      'Visiting Buenos Aires and only drinking Malbec is like flying to Rome and ordering nothing but Margherita pizza. Beyond Mendoza’s iconic reds, Argentina is experiencing a quiet wine revolution: winemakers are pioneering cool-climate vineyards along the Atlantic coast, reinventing Malbec as a white sparkling wine, and reviving centuries-old native grapes as vibrant natural pét-nats.',
      'We curated five standout bottles that shatter every stereotype about Argentine wine beyond Malbec—and you can taste every single one by the glass or bottle at BRUT Bar, our San Telmo wine bar in Buenos Aires.',
    ],
    wines: [
      {
        id: 'prima-prova-moscato-nature',
        number: '01',
        heading: '1. Prima Prova Moscato Nature — An Atlantic Breeze in Your Glass',
        winery: 'Castel Conegliano',
        region: 'Buenos Aires Province · Near Mar del Plata',
        method: 'Traditional Method · 24 months on lees · Zero Dosage',
        image: '/images/bottles/Moscato Prima Prova.png',
        paragraphs: [
          'When people picture Argentine vineyards, they think of the snow-capped Andes, rarely the ocean. Castel Conegliano flipped the script by planting vines in Buenos Aires Province near Mar del Plata, where cool Atlantic winds shape the fruit.',
          'For this cuvée, the winery took Moscato Giallo—an aromatic Italian grape usually associated with sweet wines—and crafted a razor-sharp, bone-dry Zero Dosage sparkling wine. Made via the traditional method and aged 24 months on its lees, this rare coastal Argentine sparkling wine opens with orange blossom, jasmine, delicate honey, and warm baked bread.',
        ],
      },
      {
        id: 'castel-conegliano-glera-extra-brut',
        number: '02',
        heading: '2. Castel Conegliano Glera Extra Brut — Argentina’s Answer to Prosecco',
        winery: 'Castel Conegliano',
        region: 'Sierras del Atlántico · Buenos Aires Province',
        method: 'Charmat Method · Glera Extra Brut',
        image: '/images/bottles/Glera.png',
        paragraphs: [
          'Another coastal gem hails from Sierras del Atlántico, tucked between Mar del Plata and the Sierra de los Padres hills in Buenos Aires Province. On steep, rocky slopes rich in limestone, Glera—the signature grape behind Italian Prosecco—has found an unexpected South American home.',
          'Winemakers Tomás Stahringer and Mariano Cerdán use the Charmat method to lock in pure, zesty freshness. Expect crisp green apple, ripe pear, and bright citrus carried by fine, delicate bubbles and a refreshing finish—an effortless way to kick off an evening in Buenos Aires.',
        ],
      },
      {
        id: 'indomable-blanc-de-malbec',
        number: '03',
        heading: '3. Indomable Espumante Blanc de Malbec — Malbec Disguised as a White Wine',
        winery: 'Colosso Wines',
        region: 'Los Chacayes · Uco Valley, Mendoza',
        method: 'Champenoise Method · 30–36 months on lees',
        image: '/images/bottles/indomable-blanc-malbec-1.png',
        paragraphs: [
          'Even when you take a break from heavy reds, Argentina’s flagship grape still finds ways to surprise. Colosso Wines in Los Chacayes (Uco Valley, Mendoza) took red Malbec from 20-year-old vines and vinified it as a white wine using gentle whole-cluster pressing.',
          'Fermented via the classic Champenoise method and aged on its lees for 30 to 36 months before disgorgement, the result is an elusive pale-blush sparkler. Fresh red berries and spring blossoms meet subtle spice and a broad, silky texture.',
        ],
      },
      {
        id: 'alpamanta-breva-pet-nat-criolla',
        number: '04',
        heading: '4. Alpamanta Breva Pét-Nat Criolla Grande — Wild Heritage Under a Crown Cap',
        winery: 'Alpamanta',
        region: 'Mendoza · Organic & Biodynamic',
        method: 'Ancestral Method · Native Yeasts · Zero Sulfites',
        image: '/images/bottles/alpamanta breva pet nat rojo.png',
        paragraphs: [
          "Long before Malbec arrived in South America, Criolla—a family of historic native grapes—ruled the region's vineyards. Certified organic and biodynamic winery Alpamanta in Mendoza (with winemaker Victoria Brond) gave Criolla Grande a bold, modern revival as an Argentine pét-nat.",
          'Fermented with native yeasts and zero added sulfites, it is bottled under a crown cap mid-fermentation using the ancestral method. Inside is a vivid cherry-red burst of sour cherry, plum, raspberry, and currant, balancing a touch of upfront fruit sweetness with crisp, refreshing acidity.',
        ],
      },
      {
        id: 'salentein-cuvee-exceptionnelle-blanc-de-blancs',
        number: '05',
        heading: '5. Salentein Cuvée Exceptionnelle Blanc de Blancs — High-Altitude Andean Precision',
        winery: 'Bodegas Salentein',
        region: 'Finca El Oasis · Tunuyán, Uco Valley (1,150–1,200 m)',
        method: '100% Chardonnay · Blanc de Blancs',
        paragraphs: [
          'To understand why the Uco Valley is Argentina’s premier fine-wine region, climb to 1,150–1,200 meters above sea level at Finca El Oasis in Tunuyán. Here, Bodegas Salentein and winemaker Carlos Bauzá cultivate Chardonnay for this refined Blanc de Blancs.',
          'Stony, well-drained Andean foothill soils give the grapes vibrant natural acidity. In the glass, fine, persistent bubbles highlight crisp green apple, fresh pineapple, and clean mountain minerality.',
        ],
      },
    ],
    closingHeading: 'Where to Experience Wine Tasting in Buenos Aires',
    closingParagraph:
      'You don’t need a flight to Mendoza or a road trip to the coast to explore these bottles. Drop by BRUT Bar in San Telmo (Av. Independencia 320)—our wine bar in Buenos Aires dedicated to rare Argentine sparkling wines, artisanal pét-nats, and coastal cuvées poured by the glass and bottle.',
    ctaWhatsApp: 'Book a table on WhatsApp',
    ctaTasting: 'Blind 4-Wine Tasting',
    ctaMaps: 'Get directions',
    waMessage: 'Hi! I just read your guide on 5 unusual Argentine wines beyond Malbec and would love to try them at BRUT Bar.',
  },

  ES: {
    slug: ARTICLE_SLUGS.ES,
    htmlLang: 'es-AR',
    ogLocale: 'es_AR',
    seoTitle: '5 vinos argentinos fuera del Malbec para probar en Buenos Aires | BRUT Bar',
    metaDescription:
      '¿Buscás una degustación de vinos en Buenos Aires? Descubrí 5 espumantes argentinos y pet nat únicos más allá del Malbec en BRUT Bar, San Telmo.',
    keywords: [
      'vinos argentinos fuera del Malbec',
      'degustación de vinos en Buenos Aires',
      'espumantes argentinos',
      'pet nat argentino',
      'bar de vinos San Telmo',
      'BRUT Bar Buenos Aires',
    ],
    eyebrow: 'Guía de vinos · Buenos Aires · San Telmo',
    readingTime: '4 min de lectura',
    publishedLabel: 'BRUT Bar Editorial',
    backLabel: 'Volver al inicio',
    copyLinkLabel: 'Copiar enlace',
    copiedLinkLabel: 'Enlace copiado',
    tocTitle: 'Las cinco etiquetas de esta guía',
    wineryLabel: 'Bodega',
    regionLabel: 'Región',
    methodLabel: 'Estilo',
    h1: '5 vinos argentinos fuera del Malbec que tenés que probar en Buenos Aires',
    introParagraphs: [
      'Venir a Buenos Aires y tomar solo Malbec es como viajar a Roma y pedir únicamente pizza margarita. Más allá de los tintos clásicos de Mendoza, Argentina vive hoy una silenciosa revolución vitivinícola: bodegas que apuestan al frío de la costa atlántica, reinventan el propio Malbec en versión espumante blanco y devuelven el protagonismo a las uvas criollas en formato pet nat.',
      'Seleccionamos cinco etiquetas imperdibles que rompen todos los moldes de los vinos argentinos más allá del Malbec. Podés probar cada una por copa o botella en el corazón de San Telmo, en nuestro bar de vinos en Buenos Aires: BRUT Bar.',
    ],
    wines: [
      {
        id: 'prima-prova-moscato-nature',
        number: '01',
        heading: '1. Prima Prova Moscato Nature — Brisa atlántica en la copa',
        winery: 'Castel Conegliano',
        region: 'Provincia de Buenos Aires · Cerca de Mar del Plata',
        method: 'Método tradicional · 24 meses sobre lías · Nature (Zero Dosage)',
        image: '/images/bottles/Moscato Prima Prova.png',
        paragraphs: [
          'Cuando se habla de vino argentino, todos imaginan la cordillera de los Andes, pero casi nadie piensa en el mar. La bodega Castel Conegliano demostró lo contrario al plantar viñedos en la provincia de Buenos Aires, cerca de Mar del Plata, bajo la influencia directa de los vientos oceánicos.',
          'Para esta etiqueta eligieron la aromática uva italiana Moscato Giallo —habitualmente asociada a vinos dulces— y crearon un espumante Nature (Zero Dosage) completamente seco. Elaborado bajo el método tradicional con 24 meses de crianza sobre lías, despliega notas de flor de azahar, jazmín, un sutil toque de miel y pan recién horneado.',
        ],
      },
      {
        id: 'castel-conegliano-glera-extra-brut',
        number: '02',
        heading: '2. Castel Conegliano Glera Extra Brut — La respuesta argentina al Prosecco',
        winery: 'Castel Conegliano',
        region: 'Sierras del Atlántico · Provincia de Buenos Aires',
        method: 'Método Charmat · Glera Extra Brut',
        image: '/images/bottles/Glera.png',
        paragraphs: [
          'Otra joya costera nace en Sierras del Atlántico, entre Mar del Plata y Sierra de los Padres, en la provincia de Buenos Aires. En pendientes pedregosas con suelos calcáreos encontró su lugar la Glera, la variedad emblemática del Prosecco italiano.',
          'Los enólogos Tomás Stahringer y Mariano Cerdán utilizan el método Charmat para preservar toda su frescura y perfil frutal. En copa ofrece manzana verde, pera, cítricos y una burbuja fina y delicada con final persistente: el comienzo ideal para una noche en Buenos Aires.',
        ],
      },
      {
        id: 'indomable-blanc-de-malbec',
        number: '03',
        heading: '3. Indomable Espumante Blanc de Malbec — El Malbec que se vistió de blanco',
        winery: 'Colosso Wines',
        region: 'Los Chacayes · Valle de Uco, Mendoza',
        method: 'Método Champenoise · 30 a 36 meses sobre lías',
        image: '/images/bottles/indomable-blanc-malbec-1.png',
        paragraphs: [
          'Incluso cuando buscás salir de los tintos tradicionales, la cepa insignia de Argentina sabe sorprender. El proyecto Colosso Wines, en Los Chacayes (Valle de Uco, Mendoza), tomó uvas tintas de Malbec de viñedos de 20 años y las vinificó en blanco mediante prensado de racimo entero.',
          'Elaborado con el método Champenoise y una crianza de 30 a 36 meses sobre lías antes del degüelle, logra un espumante de tono rosado pálido casi imperceptible. Combina frutos rojos frescos y flores primaverales con notas especiadas y una boca amplia y untuosa.',
        ],
      },
      {
        id: 'alpamanta-breva-pet-nat-criolla',
        number: '04',
        heading: '4. Alpamanta Breva Pét-Nat Criolla Grande — Historia salvaje bajo tapa corona',
        winery: 'Alpamanta',
        region: 'Mendoza · Orgánica y biodinámica',
        method: 'Método ancestral · Levaduras nativas · Sin sulfitos',
        image: '/images/bottles/alpamanta breva pet nat rojo.png',
        paragraphs: [
          'Mucho antes de que el Malbec llegara a Sudamérica, la Criolla —familia de variedades históricas locales— dominaba los viñedos de la región. La bodega orgánica y biodinámica Alpamanta, en Mendoza (junto a la enóloga Victoria Brond), le dio nueva vida a la Criolla Grande en formato pet nat argentino.',
          'Fermentado con levaduras nativas y sin sulfitos agregados, se embotella con tapa corona antes de terminar la fermentación siguiendo el método ancestral. El resultado es un vino de color guinda intenso con explosivos aromas a cereza, ciruela, frambuesa y grosellas, donde una entrada ligeramente dulce da paso a una acidez súper refrescante.',
        ],
      },
      {
        id: 'salentein-cuvee-exceptionnelle-blanc-de-blancs',
        number: '05',
        heading: '5. Salentein Cuvée Exceptionnelle Blanc de Blancs — Precisión de altura en los Andes',
        winery: 'Bodegas Salentein',
        region: 'Finca El Oasis · Tunuyán, Valle de Uco (1.150–1.200 m)',
        method: '100% Chardonnay · Blanc de Blancs',
        paragraphs: [
          'Para entender por qué el Valle de Uco es el epicentro de la alta gama en Argentina, hay que subir hasta los 1.150–1.200 metros sobre el nivel del mar en Finca El Oasis, Tunuyán. Allí Bodegas Salentein y el enólogo Carlos Bauzá cultivan el Chardonnay que da origen a este elegante Blanc de Blancs.',
          'Los suelos pedregosos y permeables al pie de los Andes aportan una acidez natural vibrante. En copa, sus burbujas finas y persistentes resaltan aromas de manzana verde, ananá fresco y una marcada mineralidad de montaña.',
        ],
      },
    ],
    closingHeading: 'Dónde hacer una degustación de vinos en Buenos Aires',
    closingParagraph:
      'No hace falta volar a Mendoza ni viajar a la costa para recorrer todas estas regiones en una misma noche. Pasá por BRUT Bar en San Telmo (Av. Independencia 320), nuestro bar de vinos en Buenos Aires especializado en espumantes argentinos, pet nat de autor y etiquetas poco convencionales por copa y botella.',
    ctaWhatsApp: 'Reservar mesa por WhatsApp',
    ctaTasting: 'Degustación a ciegas (4 copas)',
    ctaMaps: 'Cómo llegar',
    waMessage: '¡Hola! Leí el artículo sobre los 5 vinos argentinos fuera del Malbec y me gustaría probarlos en BRUT Bar.',
  },

  PT: {
    slug: ARTICLE_SLUGS.PT,
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    seoTitle: '5 vinhos argentinos além do Malbec para provar em Buenos Aires | BRUT Bar',
    metaDescription:
      'Procurando degustação de vinhos em Buenos Aires? Descubra 5 espumantes argentinos e pét-nats únicos além do Malbec no BRUT Bar, em San Telmo.',
    keywords: [
      'vinhos argentinos além do Malbec',
      'degustação de vinhos Buenos Aires',
      'espumantes argentinos',
      'pet nat argentino',
      'bar de vinhos San Telmo',
      'BRUT Bar Buenos Aires',
    ],
    eyebrow: 'Guia de vinhos · Buenos Aires · San Telmo',
    readingTime: '4 min de leitura',
    publishedLabel: 'BRUT Bar Editorial',
    backLabel: 'Voltar ao início',
    copyLinkLabel: 'Copiar link',
    copiedLinkLabel: 'Link copiado',
    tocTitle: 'Os cinco rótulos desta seleção',
    wineryLabel: 'Vinícola',
    regionLabel: 'Região',
    methodLabel: 'Estilo',
    h1: '5 vinhos argentinos além do Malbec que você precisa provar em Buenos Aires',
    introParagraphs: [
      'Visitar Buenos Aires e beber apenas Malbec é como voar até Roma e pedir somente pizza margherita. Além dos tintos clássicos de Mendoza, a Argentina vive hoje uma silenciosa revolução vinícola: produtores exploram o frio da costa atlântica, reinventam o próprio Malbec como espumante branco e devolvem o protagonismo às uvas nativas no formato de pét-nats naturais.',
      'Reunimos cinco garrafas marcantes que quebram todos os estereótipos sobre os vinhos argentinos além do Malbec. Você pode provar cada uma em taça ou garrafa no coração de San Telmo, no nosso bar de vinhos em Buenos Aires: BRUT Bar.',
    ],
    wines: [
      {
        id: 'prima-prova-moscato-nature',
        number: '01',
        heading: '1. Prima Prova Moscato Nature — Brisa atlântica na taça',
        winery: 'Castel Conegliano',
        region: 'Província de Buenos Aires · Perto de Mar del Plata',
        method: 'Método tradicional · 24 meses sobre borras · Zero Dosage',
        image: '/images/bottles/Moscato Prima Prova.png',
        paragraphs: [
          'Quando se fala em vinho argentino, todos imaginam a cordilheira dos Andes, mas quase ninguém pensa no oceano. A vinícola Castel Conegliano provou o contrário ao plantar vinhedos na província de Buenos Aires, perto de Mar del Plata, sob influência direta dos ventos frescos do Atlântico.',
          'Para este rótulo, escolheram a aromática uva italiana Moscato Giallo — normalmente associada a vinhos doces — e criaram um espumante Nature (Zero Dosage) completamente seco. Elaborado pelo método tradicional com 24 meses de maturação sobre borras, revela flor de laranjeira, jasmim, leve toque de mel e pão recém-assado.',
        ],
      },
      {
        id: 'castel-conegliano-glera-extra-brut',
        number: '02',
        heading: '2. Castel Conegliano Glera Extra Brut — A resposta argentina ao Prosecco',
        winery: 'Castel Conegliano',
        region: 'Sierras del Atlántico · Província de Buenos Aires',
        method: 'Método Charmat · Glera Extra Brut',
        image: '/images/bottles/Glera.png',
        paragraphs: [
          'Outra joia costeira nasce em Sierras del Atlántico, entre Mar del Plata e Sierra de los Padres, na província de Buenos Aires. Em encostas pedregosas com solos calcários, encontrou seu lar a uva Glera, variedade emblemática do Prosecco italiano.',
          'Os enólogos Tomás Stahringer e Mariano Cerdán utilizam o método Charmat para preservar o máximo de frescor e perfil frutado. Na taça, entrega maçã verde, pera madura, notas cítricas e perlage fino e delicado com final refrescante — o começo ideal para uma noite em Buenos Aires.',
        ],
      },
      {
        id: 'indomable-blanc-de-malbec',
        number: '03',
        heading: '3. Indomable Espumante Blanc de Malbec — O Malbec que se vestiu de branco',
        winery: 'Colosso Wines',
        region: 'Los Chacayes · Vale de Uco, Mendoza',
        method: 'Método Champenoise · 30 a 36 meses sobre borras',
        image: '/images/bottles/indomable-blanc-malbec-1.png',
        paragraphs: [
          'Mesmo quando você decide fazer uma pausa nos tintos clássicos, a uva símbolo da Argentina sabe surpreender. O projeto Colosso Wines, em Los Chacayes (Vale de Uco, Mendoza), colheu uvas tintas de Malbec de vinhedos de 20 anos e as vinificou em branco com prensagem suave de cachos inteiros.',
          'Elaborado pelo método Champenoise com maturação de 30 a 36 meses sobre borras antes do dégorgement, resulta em um espumante de tom rosado pálido quase imperceptível, combinando frutas vermelhas frescas, flores primaveris, notas especiadas e textura ampla e sedosa.',
        ],
      },
      {
        id: 'alpamanta-breva-pet-nat-criolla',
        number: '04',
        heading: '4. Alpamanta Breva Pét-Nat Criolla Grande — História selvagem sob tampa coroa',
        winery: 'Alpamanta',
        region: 'Mendoza · Orgânica e biodinâmica',
        method: 'Método ancestral · Leveduras nativas · Sem sulfitos',
        image: '/images/bottles/alpamanta breva pet nat rojo.png',
        paragraphs: [
          'Muito antes de o Malbec chegar à América do Sul, a Criolla — família de variedades históricas locais — dominava os vinhedos da região. A vinícola orgânica e biodinâmica Alpamanta, em Mendoza (com a enóloga Victoria Brond), deu nova vida à Criolla Grande em formato de pét-nat argentino.',
          'Fermentado com leveduras nativas e sem sulfitos adicionados, é engarrafado sob tampa coroa antes do término da fermentação seguindo o método ancestral. Na taça, revela cor cereja intensa e aromas vibrantes de cereja, ameixa, framboesa e groselha, equilibrando um toque frutado inicial com acidez refrescante.',
        ],
      },
      {
        id: 'salentein-cuvee-exceptionnelle-blanc-de-blancs',
        number: '05',
        heading: '5. Salentein Cuvée Exceptionnelle Blanc de Blancs — Precisão de altitude nos Andes',
        winery: 'Bodegas Salentein',
        region: 'Finca El Oasis · Tunuyán, Vale de Uco (1.150–1.200 m)',
        method: '100% Chardonnay · Blanc de Blancs',
        paragraphs: [
          'Para entender por que o Vale de Uco é considerado a grande joia vitivinícola da Argentina, é preciso subir até 1.150–1.200 metros de altitude no vinhedo Finca El Oasis, em Tunuyán. É ali que a Bodegas Salentein e o enólogo Carlos Bauzá cultivam o Chardonnay deste refinado Blanc de Blancs.',
          'Os solos pedregosos e bem drenados aos pés dos Andes garantem acidez natural vibrante. Na taça, borbulhas finas e persistentes destacam maçã verde, abacaxi fresco e uma limpa mineralidade de montanha.',
        ],
      },
    ],
    closingHeading: 'Onde fazer degustação de vinhos em Buenos Aires',
    closingParagraph:
      'Não é preciso voar para Mendoza nem viajar até a costa para percorrer todas essas regiões na mesma noite. Visite o BRUT Bar em San Telmo (Av. Independencia 320) — nosso bar de vinhos em Buenos Aires dedicado a espumantes argentinos raros, pét-nats autorais e rótulos fora do comum em taça e garrafa.',
    ctaWhatsApp: 'Reservar mesa pelo WhatsApp',
    ctaTasting: 'Degustação às cegas (4 taças)',
    ctaMaps: 'Como chegar',
    waMessage: 'Olá! Li o artigo sobre os 5 vinhos argentinos além do Malbec e gostaria de prová-los no BRUT Bar.',
  },
};
