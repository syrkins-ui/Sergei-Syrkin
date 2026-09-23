import { BarInfo, InteriorPhoto } from '../types';

export const BAR_DATA: BarInfo = {
  name: 'BRUT bar',
  subtitle: 'Casa de vinos espumantes argentinos',
  address: 'av. Independencia, 320, CABA',
  addressFull: 'Av. Independencia 320, C1099 AAD, CABA, Argentina',
  googleMapsUrl: 'https://maps.app.goo.gl/a37wuUikQp8DaQks6',
  phone: '+54 11 3200-2788',
  phoneRaw: '+541132002788',
  whatsappUrl: 'https://wa.me/5491160043501',
  whatsappPhoneDisplay: '+54 9 11 6004-3501',
  whatsappNumber: '+5491160043501',
  instagramHandle: '@copa_de_brut',
  instagramUrl: 'https://instagram.com/copa_de_brut',
  interiorQuote: 'El primer bar de espumantes argentinos.',
  locationQuote: 'Donde San Telmo se encuentra con Puerto Madero.',
  hours: 'Cerrado temporalmente por reformas'
};

export const getWhatsAppReservationUrl = (message: string) => {
  return `https://wa.me/5491160043501?text=${encodeURIComponent(message)}`;
};

export const getSmsReservationUrl = (message: string) => {
  return `https://wa.me/5491160043501?text=${encodeURIComponent(message)}`;
};

export const IMAGES = {
  adBrut: '/images/AD Brut.png',
  locationNeighborhood: '/images/BA_view_1.png',
  wineCollection: '/images/001.png',
  interior: '/images/001.png',
  corkPopping: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=1920&q=85',
  corkBottle: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1920&q=85',
  interiorAtmosphere: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
  champagneBubbles: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=1200&q=80',
  sanTelmoMarket: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80',
  glassToast: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80'
};

/**
 * Galería de fotos del interior de BRUT bar.
 */
export const INTERIOR_PHOTOS: InteriorPhoto[] = [
  {
    id: 'interior-001',
    url: '/images/001.png',
    alt: 'Interior y ambiente de BRUT bar (01)',
    caption: 'BRUT bar • Interior y ambiente'
  },
  {
    id: 'interior-002',
    url: '/images/002.png',
    alt: 'Interior y ambiente de BRUT bar (02)',
    caption: 'BRUT bar • Colección y copas'
  },
  {
    id: 'interior-003',
    url: '/images/003.png',
    alt: 'Interior y ambiente de BRUT bar (03)',
    caption: 'BRUT bar • Espacio íntimo en San Telmo'
  },
  {
    id: 'interior-004',
    url: '/images/004.png',
    alt: 'Interior y ambiente de BRUT bar (04)',
    caption: 'BRUT bar • Barra y degustación'
  },
  {
    id: 'interior-005',
    url: '/images/005.png',
    alt: 'Interior y ambiente de BRUT bar (05)',
    caption: 'BRUT bar • Detalles y espumantes'
  }
];
