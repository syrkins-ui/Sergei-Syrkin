export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  winePairing?: string;
}

export interface CocktailItem {
  id: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
}

export interface WineMenuItem {
  id: string;
  name: string;
  style: string;
  glassPrice?: string;
  bottlePrice: string;
}

export const FOOD_MENU: FoodItem[] = [
  {
    id: 'food-1',
    name: 'Hot Dog "Royal Shrimp"',
    description: 'Pan tostado crujiente con crema de cangrejo, camarones y caviar rojo.',
    price: '$16.000 ARS',
    originalPrice: '$18.000 ARS',
    badge: 'En prueba',
    winePairing: 'Terpenica',
  },
  {
    id: 'food-2',
    name: 'Fettuccine negro con mejillones y salsa de trufa',
    description: 'Fettuccine negro artesanal con mejillones frescos en salsa de crema de ajo suave y aceite de trufa aromático.',
    price: '$12.000 ARS',
    originalPrice: '$16.000 ARS',
    badge: 'En prueba',
    winePairing: 'Cruzat Naranjo',
  },
  {
    id: 'food-3',
    name: 'Spaghetti con pesto y stracciatella',
    description: 'Spaghetti artesanal servido con pesto fresco de albahaca, cremosa stracciatella, tomates cherry confitados a fuego lento y albahaca fresca.',
    price: '$12.000 ARS',
    originalPrice: '$16.000 ARS',
    badge: 'En prueba',
    winePairing: 'Nieto Senetiner Brut 0%',
  },
  {
    id: 'food-4',
    name: 'Croque-Madame',
    description: 'Sándwich francés clásico en pan tostado con jamón, queso, salsa bechamel y coronado con un huevo frito.',
    price: '$12.000 ARS',
    originalPrice: '$16.000 ARS',
    badge: 'En prueba',
    winePairing: 'Piedras 202 Brut',
  },
  {
    id: 'food-5',
    name: 'Dúo de Brusquetas',
    description: 'Una experiencia en dos tiempos: la primera con suave queso crema, eneldo fresco y láminas de salmón suavemente curado; la segunda con cremosa stracciatella, pesto artesanal de albahaca y tomates pasados al horno.',
    price: '$10.000 ARS',
    winePairing: 'Margarita Para Los Chanchos',
  },
  {
    id: 'food-6',
    name: 'Set BRUT',
    description: 'Tabla selección para acompañar espumosos: variedad de quesos duros, dos tostadas con pesto artesanal, jamón crudo y aceite de oliva virgen extra con reducción balsámica.',
    price: '$15.000 ARS',
    winePairing: 'Chandon Extra Brut',
  },
  {
    id: 'food-7',
    name: 'Vieiras con Tostada Crocante y Pesto',
    description: 'Tiernas vieiras selladas a la plancha acompañadas de tostada crujiente con pesto artesanal de albahaca y finas hierbas.',
    price: '$14.000 ARS',
    badge: 'Especialidad',
  },
];

export const COCKTAIL_MENU: CocktailItem[] = [
  {
    id: 'cocktail-1',
    name: 'Pornstar Martini',
    description: 'Elegante cóctel tropical con vodka de vainilla, pulpa de maracuyá, licor de fruta de la pasión y un shot servido aparte de espumoso de la casa.',
    price: '$11.000 ARS',
    badge: 'Novedad',
  },
  {
    id: 'cocktail-2',
    name: 'Kir Royale',
    description: 'Cóctel sofisticado que combina nuestro espumoso de la casa y el célebre licor de cassis de Dijon, Francia. De notas frutales intensas.',
    price: '$10.000 ARS',
  },
  {
    id: 'cocktail-3',
    name: 'Aperol Spritz',
    description: 'El gran clásico italiano. Aperol, un chorro de soda y abundante espumoso de la casa Extra Brut, decorado con una rodaja de naranja fresca.',
    price: '$10.000 ARS',
  },
  {
    id: 'cocktail-4',
    name: 'Sgroppino',
    description: 'De origen veneciano, una mezcla batida y refrescante de espumoso de la casa, vodka premium y una deliciosa bocha de sorbete de limón artesanal.',
    price: '$10.000 ARS',
  },
  {
    id: 'cocktail-5',
    name: 'French 75',
    description: 'La combinación perfecta de gin de la Patagonia, jugo de limón fresco, almíbar simple y un toque generoso de espumoso Extra Brut. Elegante y potente.',
    price: '$10.000 ARS',
  },
  {
    id: 'cocktail-6',
    name: 'Mimosa Rouge',
    description: 'Un giro colorido a la clásica Mimosa. Jugo de pomelo, espumoso de la casa y un toque dulce de jarabe de granadina orgánica.',
    price: '$10.000 ARS',
  },
  {
    id: 'cocktail-7',
    name: 'Gin Tonic',
    description: 'Gin patagónico artesanal premium y agua tónica premium de finas burbujas, servido con rodajas de pepino, pomelo o limón a elección.',
    price: '$10.000 ARS',
  },
  {
    id: 'cocktail-8',
    name: 'Negroni',
    description: 'La proporción perfecta de Gin, Campari y Vermut Rosso premium. Un clásico aromático y equilibrado con un twist de piel de naranja.',
    price: '$10.000 ARS',
  },
  {
    id: 'cocktail-9',
    name: 'Jameson',
    description: 'Servido puro, on the rocks o con un chorrito de agua fresca. El clásico e inconfundible whisky irlandés de triple destilación.',
    price: '$9.000 ARS',
  },
  {
    id: 'cocktail-10',
    name: 'Tequila',
    description: 'Shot de tequila premium 100% agave, acompañado de rodaja de limón fresco y sal marina.',
    price: '$8.000 ARS',
  },
];

export const WINE_MENU: WineMenuItem[] = [
  {
    id: 'wine-1',
    name: 'Margarita Para Los Chanchos',
    style: 'Pet-Nat',
    glassPrice: '$7.000 ARS',
    bottlePrice: '$32.000 ARS',
  },
  {
    id: 'wine-2',
    name: 'Chandon Extra Brut',
    style: 'Método Charmat',
    glassPrice: '$8.000 ARS',
    bottlePrice: '$36.000 ARS',
  },
  {
    id: 'wine-3',
    name: 'Terpenica',
    style: 'WEED SPARKLING',
    glassPrice: '$9.000 ARS',
    bottlePrice: '$38.000 ARS',
  },
  {
    id: 'wine-4',
    name: 'Piedras 202 Brut',
    style: 'Método Tradicional (Champenoise)',
    glassPrice: '$9.000 ARS',
    bottlePrice: '$40.000 ARS',
  },
  {
    id: 'wine-5',
    name: 'Nieto Senetiner Brut 0%',
    style: 'Sin Alcohol',
    glassPrice: '$10.000 ARS',
    bottlePrice: '$45.000 ARS',
  },
  {
    id: 'wine-6',
    name: 'Il Pazzo Moscato Giallo',
    style: 'Vino Blanco Tranquilo',
    bottlePrice: '$40.000 ARS',
  },
  {
    id: 'wine-7',
    name: 'Breva Petit Verdot Blanc de Noir Alpamanta',
    style: 'Pet-Nat Biodinámico',
    bottlePrice: '$45.000 ARS',
  },
  {
    id: 'wine-8',
    name: 'Breva Criolla Grande Alpamanta',
    style: 'Pet-Nat Biodinámico',
    bottlePrice: '$45.000 ARS',
  },
  {
    id: 'wine-9',
    name: 'Castel Conegliano Glera',
    style: '"Prosecco" argentino',
    bottlePrice: '$45.000 ARS',
  },
  {
    id: 'wine-10',
    name: 'Cruzat Premier Nature',
    style: 'Método Tradicional (Champenoise)',
    bottlePrice: '$45.000 ARS',
  },
  {
    id: 'wine-11',
    name: 'Cruzat Ice',
    style: 'Método Tradicional (Champenoise)',
    bottlePrice: '$45.000 ARS',
  },
  {
    id: 'wine-12',
    name: 'Cruzat Naranjo',
    style: 'Espumoso Naranjo (Skin Contact)',
    bottlePrice: '$46.000 ARS',
  },
  {
    id: 'wine-13',
    name: 'Castel Conegliano Pinot Rosé Nature',
    style: 'Espumante Nature',
    bottlePrice: '$48.000 ARS',
  },
  {
    id: 'wine-14',
    name: 'Veuve Clicquot Yellow Label Brut',
    style: 'Champagne de culto',
    bottlePrice: '$270.000 ARS',
  },
];
