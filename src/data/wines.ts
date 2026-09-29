export interface WineItem {
  id: string;
  shortPhrase: string;
  name: string;
  bodega: string;
  sweetness: string;
  notes: string;
  image: string;
  category?: string;
}

export const FEATURED_WINES: WineItem[] = [
  {
    id: 'wine-01',
    shortPhrase: 'Pet-nat biodinámico de autor',
    name: 'Breva Pet Nat Petit Verdot',
    bodega: 'Alpamanta',
    sweetness: 'Seco (1,06 g/l)',
    notes: 'Notas florales, ananá, durazno blanco y membrillo.',
    image: '/images/bottles/alpamanta breva pet nat rojo.png',
    category: 'Pet-Nat Biodinámico'
  },
  {
    id: 'wine-02',
    shortPhrase: 'Prosecco argentino con brisa atlántica',
    name: 'Castel Conegliano Glera Extra Brut Cosecha 2025',
    bodega: 'Castel Conegliano',
    sweetness: 'Extra Brut (7 g/l)',
    notes: 'Manzana verde, pera y cítricos.',
    image: '/images/bottles/Glera.png',
    category: 'Glera Extra Brut'
  },
  {
    id: 'wine-03',
    shortPhrase: 'Moscato nature de larga crianza',
    name: 'Prima Prova Moscato (Tipificación Nature)',
    bodega: 'Castel Conegliano',
    sweetness: 'Nature / Zero Dosage (1,25 g/l)',
    notes: 'Flor de azahar, jazmín, miel y pan horneado.',
    image: '/images/bottles/Moscato Prima Prova.png',
    category: 'Moscato Nature'
  },
  {
    id: 'wine-04',
    shortPhrase: 'Blanc de Malbec espumante único',
    name: 'Indomable Espumante Blanc de Malbec',
    bodega: 'Colosso Wines',
    sweetness: 'Seco',
    notes: 'Frutos rojos frescos de primera fermentación, flores primaverales y especias.',
    image: '/images/bottles/indomable-blanc-malbec-1.png',
    category: 'Blanc de Malbec'
  },
  {
    id: 'wine-05',
    shortPhrase: 'Frizzante natural de puro Malbec',
    name: 'Margarita Para los Chanchos (Malbec Rosé Nat)',
    bodega: 'Mosquita Muerta Wines',
    sweetness: 'Levemente dulce / Fresco',
    notes: 'Pura expresión de frutos rojos frescos y cremosidad.',
    image: '/images/bottles/Margarita Para Los Chanchos.png',
    category: 'Malbec Rosé Nat'
  },
  {
    id: 'wine-06',
    shortPhrase: 'Espumante naranjo de alma tinta',
    name: 'Cruzat Naranjo Método Tradicional',
    bodega: 'Bodega Cruzat',
    sweetness: 'Seco (5,5 g/l)',
    notes: 'Gran concentración de aromas y sabores complejos (frescura de blanco con estructura de tinto).',
    image: '/images/bottles/Cruzat Naranjo.png',
    category: 'Naranjo Tradicional'
  }
];
