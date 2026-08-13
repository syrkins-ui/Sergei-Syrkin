import { Language } from './translations';

export interface FoodItem {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  badge?: Record<Language, string>;
  winePairing?: string;
}

export interface CocktailItem {
  id: string;
  name: string;
  description: Record<Language, string>;
  badge?: Record<Language, string>;
}

export interface WineMenuItem {
  id: string;
  name: string;
  winery?: string;
  region?: string;
  style: Record<Language, string>;
  description?: Record<Language, string>;
  badge?: Record<Language, string>;
}

export const FOOD_MENU: FoodItem[] = [
  {
    id: 'food-1',
    name: {
      ES: 'Hot Dog "Royal Shrimp"',
      PT: 'Hot Dog "Royal Shrimp"',
      EN: 'Hot Dog "Royal Shrimp"',
      RU: 'Хот-дог "Royal Shrimp"'
    },
    description: {
      ES: 'Pan tostado crujiente con crema de cangrejo, camarones y caviar rojo.',
      PT: 'Pão tostado crocante com creme de caranguejo, camarões e caviar vermelho.',
      EN: 'Crispy toasted bun with crab cream, shrimp, and red caviar.',
      RU: 'Хрустящая обжаренная булочка с крабовым кремом, креветками и красной икрой.'
    },
    badge: {
      ES: 'Novedad',
      PT: 'Novidade',
      EN: 'New',
      RU: 'Новинка'
    },
    winePairing: 'Terpenica',
  },
  {
    id: 'food-2',
    name: {
      ES: 'Fettuccine negro con mejillones y salsa de trufa',
      PT: 'Fettuccine negro com mexilhões e molho de trufa',
      EN: 'Black fettuccine with mussels & truffle sauce',
      RU: 'Черные феттуччине с мидиями и трюфельным соусом'
    },
    description: {
      ES: 'Fettuccine negro artesanal con mejillones frescos en salsa de crema de ajo suave y aceite de trufa aromático.',
      PT: 'Fettuccine negro artesanal com mexilhões frescos em molho de creme de alho suave e azeite de trufa aromático.',
      EN: 'Artisanal black fettuccine with fresh mussels in a delicate garlic cream sauce and aromatic truffle oil.',
      RU: 'Крафтовые черные феттуччине со свежими мидиями в нежном чесночно-сливочном соусе с трюфельным маслом.'
    },
    badge: {
      ES: 'Especialidad',
      PT: 'Especialidade',
      EN: 'Specialty',
      RU: 'Фирменное'
    },
    winePairing: 'Cruzat Naranjo',
  },
  {
    id: 'food-3',
    name: {
      ES: 'Spaghetti con pesto y stracciatella',
      PT: 'Spaghetti com pesto e stracciatella',
      EN: 'Spaghetti with pesto & stracciatella',
      RU: 'Спагетти с песто и страчателлой'
    },
    description: {
      ES: 'Spaghetti artesanal servido con pesto fresco de albahaca, cremosa stracciatella, tomates cherry confitados a fuego lento y albahaca fresca.',
      PT: 'Spaghetti artesanal servido com pesto fresco de manjericão, cremosa stracciatella, tomates cherry confitados e manjericão fresco.',
      EN: 'Artisanal spaghetti served with fresh basil pesto, creamy stracciatella, slow-confit cherry tomatoes, and fresh basil.',
      RU: 'Крафтовые спагетти со свежим базиликовым песто, сливочной страчателлой, томатами черри конфи и свежим базиликом.'
    },
    winePairing: 'Nieto Senetiner Brut 0%',
  },
  {
    id: 'food-4',
    name: {
      ES: 'Croque-Madame',
      PT: 'Croque-Madame',
      EN: 'Croque-Madame',
      RU: 'Croque-Madame'
    },
    description: {
      ES: 'Sándwich francés clásico en pan tostado con jamón, queso, salsa bechamel y coronado con un huevo frito.',
      PT: 'Sanduíche francês clássico em pão tostado com presunto, queijo, molho bechamel e coroado com um ovo frito.',
      EN: 'Classic French sandwich on toasted bread with ham, cheese, bechamel sauce, topped with a fried egg.',
      RU: 'Классический французский сэндвич на поджаренном хлебе с ветчиной, сыром, соусом бешамель и яичницей.'
    },
    winePairing: 'Piedras 202 Brut',
  },
  {
    id: 'food-5',
    name: {
      ES: 'Dúo de Brusquetas',
      PT: 'Duo de Brusquetas',
      EN: 'Bruschetta Duo',
      RU: 'Дуэт брускетт'
    },
    description: {
      ES: 'Una experiencia en dos tiempos: queso crema suave, eneldo y salmón curado; y cremosa stracciatella, pesto artesanal de albahaca y tomates asados.',
      PT: 'Uma experiência em dois tempos: queijo creme suave, endro e salmão curado; e cremosa stracciatella, pesto artesanal de manjericão e tomates assados.',
      EN: 'A two-part experience: light cream cheese, dill, and cured salmon; plus creamy stracciatella, artisanal basil pesto, and roasted tomatoes.',
      RU: 'Сет из двух брускетт: с нежным сливочным сыром, укропом и слабосоленым лососем; и со сливочной страчателлой, песто и печеными томатами.'
    },
    winePairing: 'Margarita Para Los Chanchos',
  },
  {
    id: 'food-6',
    name: {
      ES: 'Set BRUT',
      PT: 'Set BRUT',
      EN: 'BRUT Platter',
      RU: 'Сет BRUT'
    },
    description: {
      ES: 'Tabla selección para acompañar espumosos: variedad de quesos duros, tostadas con pesto artesanal, jamón crudo y aceite de oliva virgen extra con reducción balsámica.',
      PT: 'Tábua seleção para acompanhar espumantes: variedade de queijos duros, torradas com pesto artesanal, presunto cru e azeite extra virgem com redução balsâmica.',
      EN: 'Selection platter paired for sparkling wines: cured cheeses, crostini with artisanal pesto, prosciutto, and extra virgin olive oil with balsamic reduction.',
      RU: 'Сет-закуска к игристому: выдержанные сыры, тосты с домашним песто, хамон и оливковое масло extra virgin с бальзамическим кремом.'
    },
    winePairing: 'Chandon Extra Brut',
  },
  {
    id: 'food-7',
    name: {
      ES: 'Vieiras con Tostada Crocante y Pesto',
      PT: 'Vieiras com Torrada Crocante e Pesto',
      EN: 'Seared Scallops with Crispy Toast & Pesto',
      RU: 'Морские гребешки на хрустящем тосте с песто'
    },
    description: {
      ES: 'Tiernas vieiras selladas a la plancha acompañadas de tostada crujiente con pesto artesanal de albahaca y finas hierbas.',
      PT: 'Vieiras macias grelhadas acompanhadas de torrada crocante com pesto artesanal de manjericão e ervas finas.',
      EN: 'Tender pan-seared scallops served on crispy toast with artisanal basil pesto and fine herbs.',
      RU: 'Нежные обжаренные морские гребешки на хрустящем тосте с базиликовым песто и пряными травами.'
    },
    badge: {
      ES: 'Especialidad',
      PT: 'Especialidade',
      EN: 'Specialty',
      RU: 'Фирменное'
    },
  },
];

export const COCKTAIL_MENU: CocktailItem[] = [
  {
    id: 'cocktail-1',
    name: 'Pornstar Martini',
    description: {
      ES: 'Elegante cóctel tropical con vodka de vainilla, pulpa de maracuyá, licor de fruta de la pasión y un shot servido aparte de espumoso de la casa.',
      PT: 'Elegante coquetel tropical com vodka de baunilha, polpa de maracujá, licor de maracujá e um shot de espumante da casa servido à parte.',
      EN: 'Elegant tropical cocktail with vanilla vodka, passion fruit pulp, passion fruit liqueur, and a side shot of house sparkling wine.',
      RU: 'Тропический коктейль с ванильной водкой, мякотью маракуйи, ликером маракуйи и отдельно подаваемым шотом игристого.'
    },
    badge: {
      ES: 'Novedad',
      PT: 'Novidade',
      EN: 'New',
      RU: 'Новинка'
    },
  },
  {
    id: 'cocktail-2',
    name: 'Kir Royale',
    description: {
      ES: 'Cóctel sofisticado que combina nuestro espumoso de la casa y el célebre licor de cassis de Dijon, Francia. De notas frutales intensas.',
      PT: 'Coquetel sofisticado que combina nosso espumante da casa e o célebre licor de cassis de Dijon, França. Notas frutadas intensas.',
      EN: 'Sophisticated cocktail combining house sparkling wine and famous Crème de Cassis from Dijon, France. Rich fruity notes.',
      RU: 'Утонченный коктейль из домашнего игристого и смородинового ликера де Кассис из Дижона. Интенсивные ягодные ноты.'
    },
  },
  {
    id: 'cocktail-3',
    name: 'Aperol Spritz',
    description: {
      ES: 'El gran clásico italiano. Aperol, un chorro de soda y abundante espumoso de la casa Extra Brut, decorado con una rodaja de naranja fresca.',
      PT: 'O grande clássico italiano. Aperol, um toque de soda e abundante espumante da casa Extra Brut, decorado com uma fatia de laranja fresca.',
      EN: 'The Italian classic. Aperol, a splash of soda, and generous house Extra Brut sparkling wine, garnished with a fresh orange slice.',
      RU: 'Итальянская классика. Aperol, капля содовой и сухое игристое Extra Brut со свежей долькой апельсина.'
    },
  },
  {
    id: 'cocktail-4',
    name: 'Sgroppino',
    description: {
      ES: 'De origen veneciano, una mezcla batida y refrescante de espumoso de la casa, vodka premium y una deliciosa bocha de sorbete de limón artesanal.',
      PT: 'De origem veneziana, uma mistura batida e refrescante de espumante da casa, vodka premium e uma bola de sorbet de limão artesanal.',
      EN: 'Venetian classic: a whipped refreshing blend of house sparkling wine, premium vodka, and artisanal lemon sorbet.',
      RU: 'Венецианская классика: освежающий взбитый микс из игристого, премиальной водки и шарика ремесленного лимонного сорбета.'
    },
  },
  {
    id: 'cocktail-5',
    name: 'French 75',
    description: {
      ES: 'La combinación perfecta de gin de la Patagonia, jugo de limón fresco, almíbar simple y un toque generoso de espumoso Extra Brut. Elegante y potente.',
      PT: 'A combinação perfeita de gin da Patagônia, suco de limão fresco, xarope simples e um toque generoso de espumante Extra Brut. Elegante e potente.',
      EN: 'Patagonian gin, fresh lemon juice, simple syrup, and a splash of Extra Brut sparkling wine. Elegant and crisp.',
      RU: 'Патагонский джин, свежий лимонный сок, сахарный сироп и порция сухого игристого Extra Brut. Элегантный и яркий.'
    },
  },
  {
    id: 'cocktail-6',
    name: 'Mimosa Rouge',
    description: {
      ES: 'Un giro colorido a la clásica Mimosa. Jugo de pomelo, espumoso de la casa y un toque dulce de jarabe de granadina orgánica.',
      PT: 'Uma versão colorida da clássica Mimosa. Suco de toranja, espumante da casa e um toque doce de xarope de romã orgânico.',
      EN: 'A colorful twist on the classic Mimosa. Grapefruit juice, house sparkling wine, and a touch of organic pomegranate syrup.',
      RU: 'Яркий твист на классическую Мимозу. Грейпфрутовый сок, домашнее игристое и капля органического гранатового сиропа.'
    },
  },
  {
    id: 'cocktail-7',
    name: 'Gin Tonic',
    description: {
      ES: 'Gin patagónico artesanal premium y agua tónica premium de finas burbujas, servido con rodajas de pepino, pomelo o limón a elección.',
      PT: 'Gin patagônico artesanal premium e água tônica premium, servido com fatias de pepino, toranja ou limão à sua escolha.',
      EN: 'Artisanal Patagonian gin and premium tonic water, served with your choice of cucumber, grapefruit, or lemon slice.',
      RU: 'Патагонский крафтовый джин и премиальный тоник, подается с огурцом, грейпфрутом или лимоном на выбор.'
    },
  },
  {
    id: 'cocktail-8',
    name: 'Negroni',
    description: {
      ES: 'La proporción perfecta de Gin, Campari y Vermut Rosso premium. Un clásico aromático y equilibrado con un twist de piel de naranja.',
      PT: 'A proporção perfeita de Gin, Campari e Vermouth Rosso premium. Um clássico aromático e equilibrado com twist de casca de laranja.',
      EN: 'The perfect balance of Gin, Campari, and premium Rosso Vermouth. An aromatic classic with an orange peel twist.',
      RU: 'Идеальный баланс джина, Campari и премиального красного вермута. Ароматная классика с апельсиновой цедрой.'
    },
  },
  {
    id: 'cocktail-9',
    name: 'Jameson',
    description: {
      ES: 'Servido puro, on the rocks o con un chorrito de agua fresca. El clásico e inconfundible whisky irlandés de triple destilación.',
      PT: 'Servido puro, on the rocks ou com um toque de água fresca. O clássico uísque irlandês de tripla destilação.',
      EN: 'Served neat, on the rocks, or with a splash of water. Classic triple-distilled Irish whiskey.',
      RU: 'Подается чистым, со льдом или капелькой воды. Классический ирландский виски тройной дистилляции.'
    },
  },
  {
    id: 'cocktail-10',
    name: 'Tequila',
    description: {
      ES: 'Shot de tequila premium 100% agave, acompañado de rodaja de limón fresco y sal marina.',
      PT: 'Shot de tequila premium 100% agave, acompanhado de fatia de limão fresco e sal marinho.',
      EN: 'Shot of 100% agave premium tequila, served with a fresh lime wedge and sea salt.',
      RU: 'Шот премиальной текилы 100% агавы со свежим лаймом и морской солью.'
    },
  },
];

export const WINE_MENU: WineMenuItem[] = [
  {
    id: 'wine-15',
    name: 'Le Petit Voyage Pet Nat Criolla',
    winery: 'Le Petit Voyage',
    region: 'I.G. Tupungato, Valle de Uco, Mendoza',
    style: {
      ES: 'Pét-Nat Ancestral (100% Criolla)',
      PT: 'Pét-Nat Ancestral (100% Criolla)',
      EN: 'Ancestral Pét-Nat (100% Criolla)',
      RU: 'Пет-нат Ансестраль (100% Криолья)'
    },
    description: {
      ES: 'Fermentación espontánea en botella, sin sulfitos ni levaduras agregadas. Uvas de parral tradicional de 20 años.',
      PT: 'Fermentação espontânea em garrafa, sem sulfitos nem leveduras adicionadas. Uvas de latada tradicional de 20 anos.',
      EN: 'Spontaneous bottle fermentation, unfiltered with zero added sulfites. Vines from traditional 20-year-old pergolas.',
      RU: 'Спонтанное брожение в бутылке, без добавления сульфитов и дрожжей. Лозы с 20-летних традиционных пергол.'
    },
    badge: {
      ES: 'Natural / Orgánico',
      PT: 'Natural / Orgânico',
      EN: 'Natural / Organic',
      RU: 'Натуральное / Органическое'
    }
  },
  {
    id: 'wine-16',
    name: 'Kung Fu Pétillant Naturel',
    winery: 'Matias Riccitelli',
    region: 'Valle de Uco, Mendoza (1.400 msnm)',
    style: {
      ES: 'Pétillant Naturel (50% Pinot Noir, 50% Malbec)',
      PT: 'Pétillant Naturel (50% Pinot Noir, 50% Malbec)',
      EN: 'Pétillant Naturel (50% Pinot Noir, 50% Malbec)',
      RU: 'Пет-нат (50% Пино Нуар, 50% Мальбек)'
    },
    description: {
      ES: 'Pet Nat rosado salmón con aromas a frutas blancas y cítricos. Acidez natural, ligero y frutado. 6 meses sobre lías.',
      PT: 'Pét-Nat rosado salmão com aromas de frutas brancas e cítricos. Acidez natural, leve e frutado. 6 meses sobre borras.',
      EN: 'Salmon-pink Pet Nat with white fruit and citrus aromas. Fresh natural acidity, light and vibrant. Aged 6 months on lees.',
      RU: 'Лососево-розовый пет-нат с ароматами белых фруктов и цитрусов. Свежая кислотность, легкое и фруктовое. 6 месяцев на осадке.'
    },
    badge: {
      ES: 'Natural / Agroecológico',
      PT: 'Natural / Agroecológico',
      EN: 'Natural / Agroecological',
      RU: 'Натуральное / Агроэкологическое'
    }
  },
  {
    id: 'wine-17',
    name: 'Antro Burbujas 2025',
    winery: 'Antro',
    region: 'La Consulta, Valle de Uco, Mendoza',
    style: {
      ES: 'Método Charmat (50% Semillón, 50% Pedro Gimenez)',
      PT: 'Método Charmat (50% Semillón, 50% Pedro Gimenez)',
      EN: 'Charmat Method (50% Semillón, 50% Pedro Gimenez)',
      RU: 'Метод Шарма (50% Семильон, 50% Педро Хименес)'
    },
    description: {
      ES: 'Espumante fresco, expansivo y festivo elaborado en tanques de acero inoxidable. Edición limitada de 3.500 botellas.',
      PT: 'Espumante fresco, expansivo e festivo elaborado em tanques de aço inoxidável. Edição limitada de 3.500 garrafas.',
      EN: 'Fresh, vibrant, and celebration-ready sparkling wine made in stainless steel tanks. Limited run of 3,500 bottles.',
      RU: 'Свежее, сочное и праздничное игристое из стальных танков. Ограниченный тираж 3 500 бутылок.'
    },
    badge: {
      ES: 'Edición Limitada',
      PT: 'Edição Limitada',
      EN: 'Limited Edition',
      RU: 'Ограниченный тираж'
    }
  },
  {
    id: 'wine-1',
    name: 'Margarita Para Los Chanchos',
    style: {
      ES: 'Pét-Nat Ancestral',
      PT: 'Pét-Nat Ancestral',
      EN: 'Ancestral Pét-Nat',
      RU: 'Пет-нат Ансестраль'
    },
    description: {
      ES: 'Burbuja rústica y vibrante, sin filtrar. Súper fresco con notas de fruta fresca.',
      PT: 'Bolha rústica e vibrante, sem filtrar. Super fresco com notas de fruta fresca.',
      EN: 'Unfiltered, rustic and vibrant sparkling bubbles. Refreshing with bright fresh fruit notes.',
      RU: 'Нефильтрованный пет-нат со свежими фруктовыми нотами и легким газом.'
    }
  },
  {
    id: 'wine-2',
    name: 'Chandon Extra Brut',
    style: {
      ES: 'Método Charmat Lungo',
      PT: 'Método Charmat Lungo',
      EN: 'Charmat Lungo Method',
      RU: 'Метод Шарма Лунго'
    },
    description: {
      ES: 'Equilibrio clásico de cítricos, flores blancas y notas suaves de panificación.',
      PT: 'Equilíbrio clássico de cítricos, flores brancas e notas suaves de pão.',
      EN: 'Classic balance of citrus, white flowers, and soft toasted bread notes.',
      RU: 'Классический баланс цитрусов, белых цветов и выпечки.'
    }
  },
  {
    id: 'wine-3',
    name: 'Terpenica',
    style: {
      ES: 'Espumante Terpénico de Autor',
      PT: 'Espumante Terpênico de Autor',
      EN: 'Craft Terpene Sparkling Wine',
      RU: 'Авторское терпеновое игристое'
    },
    description: {
      ES: 'Innovador espumoso infundido con terpenos botánicos naturales. Súper aromático.',
      PT: 'Inovador espumante infundido com terpenos botânicos naturais. Super aromático.',
      EN: 'Innovative sparkling wine infused with natural botanical terpenes. Highly aromatic.',
      RU: 'Инновационное игристое вино с природными растительными терпенами. Высокоароматное.'
    }
  },
  {
    id: 'wine-4',
    name: 'Piedras 202 Brut',
    style: {
      ES: 'Método Tradicional (Champenoise)',
      PT: 'Método Tradicional (Champenoise)',
      EN: 'Traditional Method (Champenoise)',
      RU: 'Классический метод (Шампенуа)'
    },
    description: {
      ES: 'Elegancia de larga crianza sobre lías. Cítricos maduros y frutos secos.',
      PT: 'Elegância de longa maturação sobre borras. Cítricos maduros e frutos secos.',
      EN: 'Long lees aging elegance. Ripe citrus and toasted nuts flavor profile.',
      RU: 'Выдержанное игристое с глубоким вкусом спелых цитрусов и орехов.'
    }
  },
  {
    id: 'wine-5',
    name: 'Nieto Senetiner Brut 0%',
    style: {
      ES: 'Espumante Sin Alcohol (0%)',
      PT: 'Espumante Sem Álcool (0%)',
      EN: 'Alcohol-Free Sparkling (0%)',
      RU: 'Безалкогольное игристое (0%)'
    },
    description: {
      ES: 'Toda la frescura y la burbuja festiva del espumante, 100% libre de alcohol.',
      PT: 'Toda a frescura e as bolhas festivas do espumante, 100% sem álcool.',
      EN: 'All the festive freshness and bubbles of sparkling wine, 100% alcohol-free.',
      RU: 'Вся свежесть и пузырьки классического игристого без грамма алкоголя.'
    }
  },
  {
    id: 'wine-6',
    name: 'Il Pazzo Moscato Giallo',
    style: {
      ES: 'Vino Blanco Tranquilo Natural',
      PT: 'Vinho Branco Tranquilo Natural',
      EN: 'Natural Still White Wine',
      RU: 'Натуральное тихое белое вино'
    },
    description: {
      ES: 'Aromas explosivos a flores de azahar, durazno blanco y cítricos.',
      PT: 'Aromas explosivos de flor de laranjeira, pêssego branco e cítricos.',
      EN: 'Explosive aromas of orange blossom, white peach, and fresh citrus.',
      RU: 'Яркие ароматы цветов апельсина, белого персика и цитрусов.'
    }
  },
  {
    id: 'wine-7',
    name: 'Breva Petit Verdot Blanc de Noir Alpamanta',
    style: {
      ES: 'Pét-Nat Biodinámico',
      PT: 'Pét-Nat Biodinâmico',
      EN: 'Biodynamic Pét-Nat',
      RU: 'Биодинамический пет-нат'
    },
    description: {
      ES: 'Blanc de Noir de Petit Verdot elaborado biodinámicamente. Complejo y único.',
      PT: 'Blanc de Noir de Petit Verdot elaborado biodinamicamente. Complexo e único.',
      EN: 'Biodynamically crafted Blanc de Noir of Petit Verdot. Complex and unique.',
      RU: 'Биодинамический блан де нуар из пети вердо. Сложный и уникальный профиль.'
    }
  },
  {
    id: 'wine-8',
    name: 'Breva Criolla Grande Alpamanta',
    style: {
      ES: 'Pét-Nat Biodinámico (Criolla)',
      PT: 'Pét-Nat Biodinâmico (Criolla)',
      EN: 'Biodynamic Pét-Nat (Criolla)',
      RU: 'Биодинамический пет-нат (Криолья)'
    },
    description: {
      ES: 'Uva nativa criolla con mínima intervención. Jugoso, frutal y honesto.',
      PT: 'Uva nativa criolla com mínima intervenção. Suculento, frutado e honesto.',
      EN: 'Native Criolla grape with low intervention. Juicy, fruity, and authentic.',
      RU: 'Автохтонный сорт криолья минимального вмешательства. Сочный и фруктовый.'
    }
  },
  {
    id: 'wine-9',
    name: 'Castel Conegliano Glera',
    style: {
      ES: '"Prosecco" Argentino',
      PT: '"Prosecco" Argentino',
      EN: 'Argentine "Prosecco"',
      RU: 'Аргентинский «Просекко»'
    },
    description: {
      ES: 'Variedad Glera originaria de Italia cultivada en Mendoza. Ligero y floral.',
      PT: 'Variedade Glera originária da Itália cultivada em Mendoza. Leve e floral.',
      EN: 'Glera grape strain from Italy grown in Mendoza. Light, crisp, and floral.',
      RU: 'Итальянский сорт Глера из виноградников Мендосы. Легкий и цветочный.'
    }
  },
  {
    id: 'wine-10',
    name: 'Cruzat Premier Nature',
    style: {
      ES: 'Método Tradicional (Sin dosaje)',
      PT: 'Método Tradicional (Sem dosagem)',
      EN: 'Traditional Method (Zero dosage)',
      RU: 'Классический метод (без сахара)'
    },
    description: {
      ES: '100% Chardonnay y Pinot Noir. Acidez vibrante y cero azúcar añadido.',
      PT: '100% Chardonnay e Pinot Noir. Acidez vibrante e zero açúcar adicionado.',
      EN: '100% Chardonnay & Pinot Noir. Vibrant acidity with zero dosage.',
      RU: '100% Шардоне и Пино Нуар. Яркая кислотность без добавления сахара.'
    }
  },
  {
    id: 'wine-12',
    name: 'Cruzat Naranjo',
    style: {
      ES: 'Espumoso Naranjo (Skin Contact)',
      PT: 'Espumante Laranja (Skin Contact)',
      EN: 'Orange Sparkling Wine (Skin Contact)',
      RU: 'Оранжевое игристое (Skin Contact)'
    },
    description: {
      ES: 'Primer espumante naranjo de Argentina. Macerado con pieles, taninos suaves.',
      PT: 'Primeiro espumante laranja da Argentina. Macerado com cascas, taninos suaves.',
      EN: 'Argentina\'s first orange sparkling wine. Macerated on skins with soft tannins.',
      RU: 'Первое оранжевое игристое Аргентины. Мацерация на мезге, мягкие танины.'
    }
  },
  {
    id: 'wine-14',
    name: 'Veuve Clicquot Yellow Label Brut',
    style: {
      ES: 'Champagne Francés de Culto',
      PT: 'Champagne Francês de Culto',
      EN: 'Cult French Champagne',
      RU: 'Культовое французское шампанское'
    },
    description: {
      ES: 'Champagne icónico de Reims, Francia. Estructura, complejidad y cremosidad.',
      PT: 'Champagne icônico de Reims, França. Estrutura, complexidade e cremosidade.',
      EN: 'Iconic Champagne from Reims, France. Full structure, complexity, and creaminess.',
      RU: 'Легендарное шампанское из Реймса, Франция. Выраженная структура и сливочные ноты.'
    }
  }
];
