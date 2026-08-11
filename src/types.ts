export interface WineItem {
  id: string;
  name: string;
  type: 'Espumante' | 'Pet-Nat' | 'Metodo Tradicional' | 'Rose';
  region: string;
  grape: string;
  notes: string;
  year?: string;
  bubblesLevel: number; // 1-5
}

export interface BarInfo {
  name: string; // Always "BRUT bar"
  subtitle: string; // "Casa de vinos espumantes argentinos"
  address: string; // "av. Independencia, 320, CABA"
  addressFull: string;
  googleMapsUrl: string;
  phone: string;
  phoneRaw: string;
  smsUrl: string;
  smsPhoneDisplay: string;
  instagramHandle: string; // "@copa_de_brut"
  instagramUrl: string;
  interiorQuote: string;
  locationQuote: string;
  hours: string;
}
