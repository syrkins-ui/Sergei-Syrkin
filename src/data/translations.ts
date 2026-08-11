export type Language = 'ES' | 'PT' | 'EN' | 'RU';

export interface ContentTranslation {
  heroTitle: string;
  heroTagline: string;
  heroAddressLabel: string;
  heroAddressSub: string;
  heroSms: string;
  heroSmsLabel: string;
  heroInstagramLabel: string;
  heroCallLabel: string;
  interiorEyebrow: string;
  interiorTitle: string;
  interiorSubtitle: string;
  locationEyebrow: string;
  locationTitle: string;
  locationSubtitle: string;
  locationDirections: string;
  locationCopy: string;
  locationCopied: string;
  locationHours: string;
  footerDescription: string;
  footerHoursLabel: string;
  footerHours: string;
  footerAddressLabel: string;
  footerRights: string;
  waPresetMessage: string;
}

export const TRANSLATIONS: Record<Language, ContentTranslation> = {
  ES: {
    heroTitle: 'CASA DE VINOS ESPUMANTES ARGENTINOS',
    heroTagline: 'Un espacio íntimo de vinos espumantes de autor, fermentación natural y etiquetas seleccionadas en San Telmo.',
    heroAddressLabel: 'DIRECCIÓN EN BUENOS AIRES',
    heroAddressSub: 'Tocá para abrir en Google Maps y calcular ruta',
    heroSms: 'SMS / RCS / iMessage',
    heroSmsLabel: 'RESERVAR MESA',
    heroInstagramLabel: 'INSTAGRAM',
    heroCallLabel: 'LLAMAR',
    interiorEyebrow: 'INTERIOR Y CONCEPTO',
    interiorTitle: '«Primer proyecto de bar de este tipo en Argentina: reunimos una colección de vinos espumantes argentinos y pét-nats»',
    interiorSubtitle: 'Una selección cuidada de producciones artesanales, método tradicional y pét-nats de fermentación espontánea creados en los terruños de Mendoza, Patagonia y Salta.',
    locationEyebrow: 'UBICACIÓN Y CÓMO LLEGAR',
    locationTitle: '«San Telmo, Buenos Aires. A solo tres cuadras del legendario Mercado de San Telmo.»',
    locationSubtitle: 'Un punto de encuentro privilegiado en las calles empedradas e históricas de San Telmo.',
    locationDirections: 'Trazar recorrido',
    locationCopy: 'Copiar',
    locationCopied: '¡Copiado!',
    locationHours: 'Sáb — Dom: 14:00 – 23:00 hs',
    footerDescription: 'Primer bar especializado en vinos espumantes y pét-nats de Argentina. En el histórico barrio de San Telmo.',
    footerHoursLabel: 'HORARIOS',
    footerHours: 'Sáb — Dom: 14:00 – 23:00 hs',
    footerAddressLabel: 'DIRECCIÓN',
    footerRights: 'Todos los derechos reservados.',
    waPresetMessage: 'Hola BRUT bar! Quisiera consultar la disponibilidad de mesas o hacer una reserva.'
  },
  PT: {
    heroTitle: 'CASA DE VINOS ESPUMANTES ARGENTINOS',
    heroTagline: 'Um espaço íntimo de vinhos espumantes de autor, fermentação natural e rótulos selecionados em San Telmo.',
    heroAddressLabel: 'ENDEREÇO EM BUENOS AIRES',
    heroAddressSub: 'Toque para abrir no Google Maps e ver a rota',
    heroSms: 'SMS / RCS / iMessage',
    heroSmsLabel: 'RESERVAR MESA',
    heroInstagramLabel: 'INSTAGRAM',
    heroCallLabel: 'LIGAR',
    interiorEyebrow: 'INTERIOR E CONCEITO',
    interiorTitle: '«Primeiro projeto de bar deste tipo na Argentina: reunimos uma coleção de espumantes argentinos e pét-nats»',
    interiorSubtitle: 'Uma seleção cuidadosa de produções artesanais, método tradicional e pét-nats de fermentação espontânea creados nos terroirs de Mendoza, Patagônia e Salta.',
    locationEyebrow: 'LOCALIZAÇÃO E COMO CHEGAR',
    locationTitle: '«San Telmo, Buenos Aires. A apenas três quadras do lendário Mercado de San Telmo.»',
    locationSubtitle: 'Um ponto de encontro privilegiado nas ruas de pedra históricas de San Telmo.',
    locationDirections: 'Como chegar',
    locationCopy: 'Copiar',
    locationCopied: 'Copiado!',
    locationHours: 'Sáb — Dom: 14:00 – 23:00 hs',
    footerDescription: 'Primeiro bar especializado em espumantes e pét-nats da Argentina. No histórico bairro de San Telmo.',
    footerHoursLabel: 'HORÁRIOS',
    footerHours: 'Sáb — Dom: 14:00 – 23:00 hs',
    footerAddressLabel: 'ENDEREÇO',
    footerRights: 'Todos os direitos reservados.',
    waPresetMessage: 'Olá BRUT bar! Gostaria de consultar la disponibilidade de mesas ou fazer uma reserva.'
  },
  EN: {
    heroTitle: 'CASA DE VINOS ESPUMANTES ARGENTINOS',
    heroTagline: 'An intimate bar space dedicated to artisanal sparkling wines, natural fermentation, and handpicked labels in San Telmo.',
    heroAddressLabel: 'BUENOS AIRES ADDRESS',
    heroAddressSub: 'Tap to open in Google Maps and get directions',
    heroSms: 'SMS / RCS / iMessage',
    heroSmsLabel: 'RESERVE A TABLE',
    heroInstagramLabel: 'INSTAGRAM',
    heroCallLabel: 'CALL US',
    interiorEyebrow: 'INTERIOR & CONCEPT',
    interiorTitle: '«First bar project of its kind in Argentina: we collect Argentine sparkling wines and pét-nats»',
    interiorSubtitle: 'A curated collection of small-batch producers, traditional method sparklings, and spontaneous fermentation pét-nats from Mendoza, Patagonia, and Salta.',
    locationEyebrow: 'LOCATION & DIRECTIONS',
    locationTitle: '«San Telmo, Buenos Aires. Just three blocks away from the legendary Mercado de San Telmo.»',
    locationSubtitle: 'A unique location in the historic cobblestone neighborhood of San Telmo.',
    locationDirections: 'Get directions',
    locationCopy: 'Copy',
    locationCopied: 'Copied!',
    locationHours: 'Sat — Sun: 14:00 – 23:00',
    footerDescription: 'Argentina\'s first wine bar specialized in sparkling wines and pét-nats. Located in historic San Telmo.',
    footerHoursLabel: 'HOURS',
    footerHours: 'Sat — Sun: 14:00 – 23:00',
    footerAddressLabel: 'ADDRESS',
    footerRights: 'All rights reserved.',
    waPresetMessage: 'Hi BRUT bar! I\'d like to check table availability or make a reservation.'
  },
  RU: {
    heroTitle: 'CASA DE VINOS ESPUMANTES ARGENTINOS',
    heroTagline: 'Камерное пространство авторских игристых вин, натуральной ферментации и отборных релизов в районе Сан-Тельмо.',
    heroAddressLabel: 'АДРЕС В БУЭНОС-АЙРЕСЕ',
    heroAddressSub: 'Нажмите, чтобы открыть Google Карты и построить маршрут',
    heroSms: 'SMS / RCS / iMessage',
    heroSmsLabel: 'Забронировать столик',
    heroInstagramLabel: 'ИНСТАГРАМ',
    heroCallLabel: 'ПОЗВОНИТЬ',
    interiorEyebrow: 'ИНТЕРЬЕР И КОНЦЕПЦИЯ',
    interiorTitle: '«Первый подобный барный проект в Аргентине: мы собираем коллекцию аргентинских игристых вин и пет-натов»',
    interiorSubtitle: 'Тщательно отобранная коллекция артизанальных производств, классического метода шампенуа и пет-натов спонтанного брожения из Мендосы, Патагонии и Сальты.',
    locationEyebrow: 'ЛОКАЦИЯ И МАРШРУТ',
    locationTitle: '«Сан-Тельмо, Буэнос-Айрес. Всего в трех кварталах от легендарного рынка Сан-Тельмо.»',
    locationSubtitle: 'Уникальное место в атмосфере брусчатых улочек исторического района Сан-Тельмо.',
    locationDirections: 'Построить маршрут',
    locationCopy: 'Скопировать',
    locationCopied: 'Скопировано!',
    locationHours: 'Сб — Вс: 14:00 – 23:00',
    footerDescription: 'Первый специализированный бар игристых вин и пет-натов Аргентины. В историческом районе Сан-Тельмо.',
    footerHoursLabel: 'РЕЖИМ РАБОТЫ',
    footerHours: 'Сб — Вс: 14:00 – 23:00',
    footerAddressLabel: 'АДРЕС',
    footerRights: 'Все права защищены.',
    waPresetMessage: 'Здравствуйте, BRUT bar! Хочу узнать наличие столиков или забронировать.'
  }
};
