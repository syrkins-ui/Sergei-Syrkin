import { Language } from './translations';

export interface Landmark3D {
  id: string;
  isOrigin?: boolean;
  name: Record<Language, string>;
  category: 'origin' | 'gastronomy' | 'culture' | 'heritage' | 'walk';
  categoryLabel: Record<Language, string>;
  coords: [number, number, number]; // [x, y, z] for stylized local 3D map
  lat: number;
  lng: number;
  walkingTimeMin: number;
  distanceMeters: number;
  address: string;
  tagline: Record<Language, string>;
  description: Record<Language, string>;
  googleMapsUrl: string;
  color: string;
  iconType: 'wine' | 'food' | 'museum' | 'building' | 'bridge' | 'park';
}

export const SAN_TELMO_LANDMARKS: Landmark3D[] = [
  {
    id: 'brut-bar',
    isOrigin: true,
    name: {
      ES: 'BRUT bar',
      PT: 'BRUT bar',
      EN: 'BRUT bar',
      RU: 'BRUT bar'
    },
    category: 'origin',
    categoryLabel: {
      ES: 'Epicentro',
      PT: 'Epicentro',
      EN: 'Epicenter',
      RU: 'Эпицентр'
    },
    coords: [0, 0, 0],
    lat: -34.6172888,
    lng: -58.3702081,
    walkingTimeMin: 0,
    distanceMeters: 0,
    address: 'Av. Independencia 320, C1099AAQ San Telmo, Buenos Aires',
    tagline: {
      ES: 'Casa de Vinos Espumantes Argentinos',
      PT: 'Casa de Vinhos Espumantes Argentinos',
      EN: 'House of Argentine Sparkling Wines',
      RU: 'Дом аргентинских игристых вин'
    },
    description: {
      ES: 'Tu punto de partida y refugio en San Telmo. Colección única de más de 40 espumantes de autor, pét-nats de fermentación natural y maridaje de tapas de autor.',
      PT: 'Seu ponto de partida e refúgio em San Telmo. Coleção única de espumantes autorais, pét-nats de fermentação natural e harmonização de tapas.',
      EN: 'Your starting point and haven in San Telmo. Curated collection of artisanal sparkling wines, natural pét-nats, and gourmet food pairings.',
      RU: 'Главная точка притяжения и винный оазис в Сан-Тельмо. Кураторская коллекция игристых вин, пет-натов натуральной ферментации и авторские закуски.'
    },
    googleMapsUrl: 'https://maps.google.com/?cid=16945499650243025903',
    color: '#E5C07B',
    iconType: 'wine'
  },
  {
    id: 'ingenieria-uba',
    name: {
      ES: 'Facultad de Ingeniería (UBA)',
      PT: 'Faculdade de Engenharia (UBA)',
      EN: 'Faculty of Engineering (UBA)',
      RU: 'Факультет инженерии (UBA)'
    },
    category: 'heritage',
    categoryLabel: {
      ES: 'Patrimonio Arquitectónico',
      PT: 'Patrimônio Arquitetônico',
      EN: 'Architectural Heritage',
      RU: 'Архитектурное наследие'
    },
    coords: [2.8, 0, -2.4],
    lat: -34.61748,
    lng: -58.36830,
    walkingTimeMin: 2,
    distanceMeters: 160,
    address: 'Av. Paseo Colón 850',
    tagline: {
      ES: 'Monumento Histórico Neogótico',
      PT: 'Monumento Histórico Neogótico',
      EN: 'Neo-Gothic Historical Monument',
      RU: 'Неоготический исторический памятник'
    },
    description: {
      ES: 'Monumento Nacional con imponente fachada monumental neogótica. A la vuelta de BRUT bar, un testimonio de la arquitectura señorial de Buenos Aires.',
      PT: 'Monumento Nacional com imponente fachada neogótica. Na esquina do BRUT bar, um marco da arquitetura senhorial portenha.',
      EN: 'Stunning neo-Gothic monumental building right around the corner from BRUT bar, reflecting the grand turn-of-the-century Buenos Aires architecture.',
      RU: 'Внушительный неоготический монумент и национальный памятник всего за углом от BRUT bar. Архитектурная жемчужина проспекта Пасео Колон.'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Av.+Paseo+Col%C3%B3n+850,+Buenos+Aires',
    color: '#D4AF37',
    iconType: 'building'
  },
  {
    id: 'mercado-san-telmo',
    name: {
      ES: 'Mercado de San Telmo',
      PT: 'Mercado de San Telmo',
      EN: 'San Telmo Market',
      RU: 'Рынок Сан-Тельмо'
    },
    category: 'gastronomy',
    categoryLabel: {
      ES: 'Gastronomía & Antigüedades',
      PT: 'Gastronomia & Antiguidades',
      EN: 'Gastronomy & Antiques',
      RU: 'Гастрономия и антиквариат'
    },
    coords: [-4.6, 0, 3.8],
    lat: -34.62060,
    lng: -58.37320,
    walkingTimeMin: 5,
    distanceMeters: 420,
    address: 'Bolívar 970 / Carlos Calvo 495',
    tagline: {
      ES: 'Mercado histórico de 1897 con estructura de hierro',
      PT: 'Mercado histórico de 1897 com cúpula de ferro',
      EN: 'Historic 1897 iron cast market & food hall',
      RU: 'Исторический рынок 1897 года под кованым куполом'
    },
    description: {
      ES: 'Inaugurado en 1897, conserva su majestuosa cúpula de hierro forjado. Hoy combina puestos de coleccionistas y antigüedades con barras gastronómicas de vanguardia.',
      PT: 'Inaugurado em 1897, preserva sua cúpula de ferro original. Reúne antiguidades, cafeterias especiais e bancas gastronômicas de renome.',
      EN: 'Opened in 1897, retaining its monumental wrought-iron roof. Filled with vintage antiques, specialty coffee, and bustling gourmet food stalls.',
      RU: 'Открыт в 1897 году под сводами из литого чугуна. Легендарное место встречи ценителей винтажа, спешелти-кофе и колоритной уличной еды.'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Mercado+de+San+Telmo,+Bolivar+970,+Buenos+Aires',
    color: '#E67E22',
    iconType: 'food'
  },
  {
    id: 'plaza-dorrego',
    name: {
      ES: 'Plaza Dorrego & Feria',
      PT: 'Plaza Dorrego & Feira',
      EN: 'Plaza Dorrego & Antique Fair',
      RU: 'Пласа Доррего и ярмарка'
    },
    category: 'culture',
    categoryLabel: {
      ES: 'Cultura & Tango',
      PT: 'Cultura & Tango',
      EN: 'Culture & Tango',
      RU: 'Культура и танго'
    },
    coords: [-6.8, 0, 5.2],
    lat: -34.62015,
    lng: -58.37180,
    walkingTimeMin: 7,
    distanceMeters: 550,
    address: 'Humberto 1º y Defensa',
    tagline: {
      ES: 'El corazón colonial y bohemio del barrio',
      PT: 'O coração colonial e boêmio do bairro',
      EN: 'The colonial and bohemian heart of San Telmo',
      RU: 'Колониальное и богемное сердце района'
    },
    description: {
      ES: 'Segunda plaza más antigua de Buenos Aires. Los domingos cobra vida con la feria de antigüedades más famosa de Sudamérica y parejas de tango bailando entre adoquines.',
      PT: 'Segunda praça mais antiga da cidade. Aos domingos ganha vida com a famosa feira de antiguidades e dançarinos de tango nas ruas de paralelepípedos.',
      EN: 'The second oldest square in Buenos Aires. Famous for its Sunday antique market, open-air tango performances, and lively historic sidewalk cafés.',
      RU: 'Вторая старейшая площадь Буэнос-Айреса. По воскресеньям здесь шумит антикварная ярмарка, а на брусчатке танцуют пары под живое танго.'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Plaza+Dorrego,+Defensa,+Buenos+Aires',
    color: '#9B59B6',
    iconType: 'park'
  },
  {
    id: 'zanjon-granados',
    name: {
      ES: 'El Zanjón de Granados',
      PT: 'El Zanjón de Granados',
      EN: 'El Zanjón de Granados',
      RU: 'Эль Санхон де Гранадос'
    },
    category: 'heritage',
    categoryLabel: {
      ES: 'Arqueología Urbana',
      PT: 'Arqueologia Urbana',
      EN: 'Urban Archeology',
      RU: 'Городская археология'
    },
    coords: [-2.2, 0, 2.6],
    lat: -34.61820,
    lng: -58.37130,
    walkingTimeMin: 4,
    distanceMeters: 320,
    address: 'Defensa 755',
    tagline: {
      ES: 'Laberinto subterráneo de los siglos XVIII y XIX',
      PT: 'Labirinto subterrâneo dos séculos XVIII e XIX',
      EN: 'Underground tunnels and labyrinth of the 18th century',
      RU: 'Подземный лабиринт туннелей XVIII–XIX веков'
    },
    description: {
      ES: 'Un increíble viaje arqueológico bajo las casas coloniales de San Telmo: túneles abovedados, aljibes y vestigios del arroyo que atravesaba la Buenos Aires colonial.',
      PT: 'Uma viagem arqueológica sob as casas coloniais: túneis abobadados, cisternas e resquícios do riacho da Buenos Aires colonial.',
      EN: 'An astonishing archeological exploration underneath colonial mansions: vaulted tunnels, brick cisterns, and secrets of old Buenos Aires.',
      RU: 'Потрясающий подземный археологический комплекс под колониальными особняками: старинные кирпичные туннели, цистерны и русло исчезнувшего ручья.'
    },
    googleMapsUrl: 'https://maps.google.com/?q=El+Zanjon+de+Granados,+Defensa+755,+Buenos+Aires',
    color: '#E74C3C',
    iconType: 'building'
  },
  {
    id: 'museo-moderno',
    name: {
      ES: 'Museo Moderno (MAMBA)',
      PT: 'Museu Moderno (MAMBA)',
      EN: 'Modern Art Museum (MAMBA)',
      RU: 'Музей современного искусства (MAMBA)'
    },
    category: 'culture',
    categoryLabel: {
      ES: 'Arte & Vanguardia',
      PT: 'Arte & Vanguarda',
      EN: 'Art & Avant-Garde',
      RU: 'Искусство и авангард'
    },
    coords: [-5.2, 0, 7.8],
    lat: -34.62250,
    lng: -58.37110,
    walkingTimeMin: 7,
    distanceMeters: 580,
    address: 'Av. San Juan 350',
    tagline: {
      ES: 'Vanguardia artística en una histórica fábrica tabacalera',
      PT: 'Vanguarda artística em antiga fábrica de tabaco',
      EN: 'Modern art vanguard housed in a historic brick warehouse',
      RU: 'Музей авангарда в отреставрированном здании табачной фабрики'
    },
    description: {
      ES: 'Colección permanente de arte moderno y contemporáneo argentino e internacional, ubicada en un imponente edificio industrial de ladrillo a la vista.',
      PT: 'Coleção de arte moderna e contemporânea argentina e internacional em um belíssimo edifício industrial restaurado.',
      EN: 'Leading collection of Argentine and international modern and contemporary art, set in a meticulously restored industrial brick landmark.',
      RU: 'Главная коллекция аргентинского и мирового современного искусства в великолепном индустриальном здании из красного кирпича.'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Museo+de+Arte+Moderno+de+Buenos+Aires,+Av.+San+Juan+350,+Buenos+Aires',
    color: '#3498DB',
    iconType: 'museum'
  },
  {
    id: 'puerto-madero',
    name: {
      ES: 'Puerto Madero & Puente de la Mujer',
      PT: 'Puerto Madero & Ponte da Mulher',
      EN: 'Puerto Madero & Women\'s Bridge',
      RU: 'Пуэрто-Мадеро и Женский мост'
    },
    category: 'walk',
    categoryLabel: {
      ES: 'Costanera & Diseño',
      PT: 'Orla & Design',
      EN: 'Waterfront & Design',
      RU: 'Набережная и дизайн'
    },
    coords: [6.8, 0, -3.8],
    lat: -34.61600,
    lng: -58.36500,
    walkingTimeMin: 5,
    distanceMeters: 450,
    address: 'Dique 2 / Dique 3, Puerto Madero',
    tagline: {
      ES: 'Paseo ribereño sobre los antiguos diques portuarios',
      PT: 'Passeio à beira-rio nos antigos diques portuários',
      EN: 'Scenic waterfront along historic docks and Calatrava bridge',
      RU: 'Живописная набережная вдоль доков и моста Калатравы'
    },
    description: {
      ES: 'A 2 cuadras cruzando Huergo, el contraste urbano más fascinante: diques de ladrillo rojo, rascacielos y el célebre puente giratorio de Santiago Calatrava.',
      PT: 'A apenas 2 quadras cruzando Huergo: diques ingleses de tijolos, arranha-céus modernos e a icônica ponte de Santiago Calatrava.',
      EN: 'Just two blocks across Av. Huergo: the striking blend of restored red-brick docks, modern glass towers, and Calatrava\'s iconic harp bridge.',
      RU: 'Всего два квартала через авениду Уэрго: контраст старинных английских кирпичных пакгаузов, современных башен и изящного моста Сантьяго Калатравы.'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Puente+de+la+Mujer,+Puerto+Madero,+Buenos+Aires',
    color: '#1ABC9C',
    iconType: 'bridge'
  },
  {
    id: 'casa-minima',
    name: {
      ES: 'Pasaje San Lorenzo & Casa Mínima',
      PT: 'Pasaje San Lorenzo & Casa Mínima',
      EN: 'Pasaje San Lorenzo & Casa Mínima',
      RU: 'Пассаж Сан-Лоренсо и Каса Минима'
    },
    category: 'heritage',
    categoryLabel: {
      ES: 'Rincón Histórico',
      PT: 'Recanto Histórico',
      EN: 'Historic Hidden Gem',
      RU: 'Исторический уголок'
    },
    coords: [-3.4, 0, 3.2],
    lat: -34.61885,
    lng: -58.37145,
    walkingTimeMin: 4,
    distanceMeters: 310,
    address: 'Pasaje San Lorenzo 380',
    tagline: {
      ES: 'La casa más angosta de la ciudad (2,2 metros)',
      PT: 'A casa mais estreita da cidade (2,2 metros)',
      EN: 'The narrowest house in Buenos Aires (2.2m wide)',
      RU: 'Самый узкий дом в городе (фасад всего 2,2 метра)'
    },
    description: {
      ES: 'Rincón empedrado cargado de mitos urbanos. La Casa Mínima es una curiosidad arquitectónica colonial con una fachada de solo 2,20 metros de ancho.',
      PT: 'Ruela de paralelepípedos cheia de mistério. A Casa Mínima tem apenas 2,20 metros de fachada, resquício da era colonial.',
      EN: 'Atmospheric cobblestone alley featuring the city\'s narrowest colonial home, measuring just 2.2 meters across with a tiny iron balcony.',
      RU: 'Атмосферный мощеный переулок с легендарным домом Каса Минима шириной всего 2,2 метра с крохотным кованым балкончиком.'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Casa+Minima,+Pasaje+San+Lorenzo,+Buenos+Aires',
    color: '#F39C12',
    iconType: 'building'
  }
];
