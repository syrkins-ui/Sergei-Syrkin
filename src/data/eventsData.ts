import { Language } from './translations';

export interface EventHighlightMetric {
  label: string;
  value: string;
  note: string;
}

export interface EventFeature {
  number: string;
  title: string;
  description: string;
}

export interface EventsPageContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  hallCaption: string;
  metrics: EventHighlightMetric[];
  includedTitle: string;
  includedSubtitle: string;
  features: EventFeature[];
  galleryTitle: string;
  occasionsTitle: string;
  occasions: string[];
  ctaHeading: string;
  ctaText: string;
  ctaButtonWhatsApp: string;
  backToHome: string;
  whatsappMessage: string;
}

export const EVENTS_DATA: Record<Language, EventsPageContent> = {
  RU: {
    eyebrow: 'Частные события · BRUT bar',
    title: 'Мероприятия и дни рождения в закрытом чёрном зале',
    subtitle:
      'Соберитесь отдельной компанией в нашем уединённом чёрном зале в самом сердце Сан-Тельмо. Мы полностью берём на себя кейтеринг, напитки, музыку и сервис — вам остаётся только наслаждаться праздником.',
    hallCaption: 'Отдельный чёрный зал BRUT bar — до 35 гостей',
    metrics: [
      {
        label: 'Вместимость',
        value: 'до 35 гостей',
        note: 'Комфортная рассадка или формат фуршета для вашей компании'
      },
      {
        label: 'Аренда зала',
        value: 'от $200 USD',
        note: 'Полное закрытие чёрного зала только под ваше мероприятие'
      },
      {
        label: 'Кейтеринг',
        value: 'от $20 USD / чел.',
        note: 'Авторские закуски, сеты и гастрономическое сопровождение'
      }
    ],
    includedTitle: 'Всё продумано под ключ',
    includedSubtitle:
      'Мы обеспечиваем гастрономию, игристые и тихие вина, коктейли и организацию вечера без лишних хлопот.',
    features: [
      {
        number: '01',
        title: 'Изолированный чёрный зал для вашей компании',
        description:
          'Отдельное атмосферное пространство с тёплым камерным светом, винтажным зеркалом, собственной музыкой и полным уединением от основного зала.'
      },
      {
        number: '02',
        title: 'Кейтеринг от $20 USD на гостя',
        description:
          'Индивидуальное меню под формат праздника: артизанские сыры и антипасти, тапас, брускетты, горячие позиции и десерты.'
      },
      {
        number: '03',
        title: 'Напитки, игристые вина и работа сомелье',
        description:
          'Лучшие аргентинские игристые вина, натуральные пет-наты, авторские коктейли на основе брюта и безалкогольные напитки с персональным подбором под ваш бюджет.'
      },
      {
        number: '04',
        title: 'Полная организация и сервис',
        description:
          'Профессиональная команда официантов и барменов, сервировка бокалами, подготовка зала, поддержка декора и гибкий сценарий вечера.'
      }
    ],
    galleryTitle: 'Атмосфера зала и детали',
    occasionsTitle: 'Идеально для любого повода',
    occasions: [
      'Дни рождения и юбилеи в кругу близких',
      'Частные винные дегустации с сомелье Полиной Штайнер',
      'Корпоративные ужины, презентации и встречи команд',
      'Девичники, предсвадебные коктейли и камерные вечеринки'
    ],
    ctaHeading: 'Забронировать чёрный зал под ваш праздник',
    ctaText:
      'Напишите нам в WhatsApp желаемую дату и количество гостей — мы быстро рассчитаем стоимость аренды, предложим варианты кейтеринга и напитков и зафиксируем бронь.',
    ctaButtonWhatsApp: 'Запросить расчёт в WhatsApp',
    backToHome: 'Назад в BRUT bar',
    whatsappMessage:
      'Здравствуйте! Хочу узнать условия и забронировать отдельный чёрный зал в BRUT bar для мероприятия (дата и количество человек):'
  },

  ES: {
    eyebrow: 'Eventos Privados · BRUT bar',
    title: 'Eventos y cumpleaños en nuestro Salón Negro privado',
    subtitle:
      'Reunite con tu grupo en un espacio exclusivo en el corazón de San Telmo. Nos encargamos de todo: catering, vinos espumantes, coctelería, música y servicio completo para que solo tengas que celebrar.',
    hallCaption: 'Salón Negro privado de BRUT bar — hasta 35 invitados',
    metrics: [
      {
        label: 'Capacidad',
        value: 'Hasta 35 personas',
        note: 'Formato cóctel, mesas compartidas o degustación privada'
      },
      {
        label: 'Alquiler del salón',
        value: 'Desde USD 200',
        note: 'Uso exclusivo del Salón Negro privado para tu grupo'
      },
      {
        label: 'Catering',
        value: 'Desde USD 20 / pers.',
        note: 'Propuestas gastronómicas a medida por invitado'
      }
    ],
    includedTitle: 'Todo resuelto para tu festejo',
    includedSubtitle:
      'Proveemos catering, bebidas y organización integral para cumpleaños, brindis privados y encuentros corporativos.',
    features: [
      {
        number: '01',
        title: 'Salón Negro independiente y privado',
        description:
          'Un ambiente íntimo de estética nocturna, iluminación cálida y sonido propio, completamente separado del salón principal para disfrutar con total privacidad.'
      },
      {
        number: '02',
        title: 'Catering a medida desde USD 20 por persona',
        description:
          'Menú pensado para compartir: tablas de quesos artesanales, bruschettas, tapas de autor, opciones calientes y bocados dulces.'
      },
      {
        number: '03',
        title: 'Bebidas, espumantes y barra exclusiva',
        description:
          'Selección curada de espumantes argentinos, pét-nats, vinos tranquilos, cócteles de autor y opciones sin alcohol adaptadas a tu celebración.'
      },
      {
        number: '04',
        title: 'Servicio integral y anfitriones dedicados',
        description:
          'Nos ocupamos de la cristalería, ambientación, música, atención de mesa y coordinación completa del evento de principio a fin.'
      }
    ],
    galleryTitle: 'El espacio y la atmósfera',
    occasionsTitle: 'Pensado para cada celebración',
    occasions: [
      'Cumpleaños, aniversarios y brindis entre amigos',
      'Catas privadas guiadas junto a nuestra sommelier Polina Schteiner',
      'After office, lanzamientos y cenas de equipo',
      'Reuniones íntimas a puertas cerradas con menú y música propia'
    ],
    ctaHeading: 'Consultá disponibilidad y armemos tu evento',
    ctaText:
      'Escribinos por WhatsApp con la fecha estimada y la cantidad de invitados. Te enviamos una propuesta personalizada de salón, catering y bebidas.',
    ctaButtonWhatsApp: 'Consultar por WhatsApp',
    backToHome: 'Volver a BRUT bar',
    whatsappMessage:
      '¡Hola! Quiero consultar disponibilidad y presupuesto para reservar el Salón Negro privado de BRUT bar (fecha y cantidad de personas):'
  },

  PT: {
    eyebrow: 'Eventos Privados · BRUT bar',
    title: 'Eventos e aniversários em nosso Salão Preto exclusivo',
    subtitle:
      'Reúna seus amigos ou equipe em um espaço reservado no coração de San Telmo. Cuidamos de tudo: catering, espumantes, drinks, música e atendimento dedicado para sua comemoração.',
    hallCaption: 'Salão Preto privado do BRUT bar — até 35 pessoas',
    metrics: [
      {
        label: 'Capacidade',
        value: 'Até 35 pessoas',
        note: 'Formato coquetel, mesas para jantar ou degustação guiada'
      },
      {
        label: 'Aluguel do salão',
        value: 'A partir de US$ 200',
        note: 'Fechamento exclusivo do Salão Preto para seu grupo'
      },
      {
        label: 'Catering',
        value: 'A partir de US$ 20 / pessoa',
        note: 'Menu sob medida para o estilo do seu evento'
      }
    ],
    includedTitle: 'Serviço completo para sua festa',
    includedSubtitle:
      'Fornecemos gastronomia, bebidas selecionadas e toda a estrutura para você aproveitar sem preocupações.',
    features: [
      {
        number: '01',
        title: 'Salão Preto separado e reservado',
        description:
          'Um ambiente íntimo com iluminação acolhedora, espelho vintage e som independente para celebrar com privacidade total.'
      },
      {
        number: '02',
        title: 'Catering a partir de US$ 20 por pessoa',
        description:
          'Tábua de queijos artesanais, bruschettas, tapas autorais, opções quentes e sobremesas preparados pela nossa cozinha.'
      },
      {
        number: '03',
        title: 'Bebidas, espumantes e coquetelaria',
        description:
          'Curadoria especial de espumantes argentinos, pét-nats, vinhos, drinks exclusivos e opções sem álcool.'
      },
      {
        number: '04',
        title: 'Organização completa',
        description:
          'Equipe dedicada, taças de cristal, montagem personalizada e suporte integral durante toda a noite.'
      }
    ],
    galleryTitle: 'Ambiente e detalhes',
    occasionsTitle: 'Ideal para diferentes momentos',
    occasions: [
      'Aniversários e comemorações especiais',
      'Degustações privadas com a sommelier Polina Schteiner',
      'Encontros corporativos e jantares de equipe',
      'Festas íntimas e brindes a portas fechadas'
    ],
    ctaHeading: 'Reserve o Salão Preto para sua data',
    ctaText:
      'Fale conosco pelo WhatsApp informando a data e o número de convidados para receber um orçamento completo.',
    ctaButtonWhatsApp: 'Solicitar orçamento no WhatsApp',
    backToHome: 'Voltar ao BRUT bar',
    whatsappMessage:
      'Olá! Gostaria de verificar disponibilidade e orçamento para reservar o Salão Preto do BRUT bar (data e número de convidados):'
  },

  EN: {
    eyebrow: 'Private Events · BRUT bar',
    title: 'Private Events & Birthdays in our Black Hall',
    subtitle:
      'Gather your own group in our secluded Black Hall in historic San Telmo. We take care of catering, sparkling wines, cocktails, music, and full hospitality so you can simply celebrate.',
    hallCaption: 'BRUT bar Private Black Hall — up to 35 guests',
    metrics: [
      {
        label: 'Capacity',
        value: 'Up to 35 guests',
        note: 'Flexible cocktail standing reception or seated dining layout'
      },
      {
        label: 'Hall rental',
        value: 'From $200 USD',
        note: 'Exclusive private access to the Black Hall for your party'
      },
      {
        label: 'Catering',
        value: 'From $20 USD / guest',
        note: 'Curated food packages tailored per person'
      }
    ],
    includedTitle: 'Full-service celebration, handled',
    includedSubtitle:
      'We provide food, drinks, dedicated staff, and everything else required for an effortless private gathering.',
    features: [
      {
        number: '01',
        title: 'Separate Private Black Hall',
        description:
          'An intimate, sound-isolated room featuring moody dark walls, warm candlelight, vintage mirror details, and independent music control.'
      },
      {
        number: '02',
        title: 'Catering from $20 USD per person',
        description:
          'Custom food spreads featuring artisan cheeses, antipasti, tapas, bruschettas, warm dishes, and sweet pairings.'
      },
      {
        number: '03',
        title: 'Drinks, Sparkling Wines & Sommelier Care',
        description:
          'Curated Argentine sparkling wines, natural pét-nats, still wines, signature spritzes, and non-alcoholic options.'
      },
      {
        number: '04',
        title: 'Turnkey Hosting & Staff',
        description:
          'Dedicated bartenders and servers, crystal stemware, room setup, and flexible timing tailored to your occasion.'
      }
    ],
    galleryTitle: 'Inside the Black Hall',
    occasionsTitle: 'Made for memorable gatherings',
    occasions: [
      'Birthdays, anniversaries, and private toasts',
      'Private guided tastings with Head Sommelier Polina Schteiner',
      'Team dinners, client receptions, and brand launches',
      'Intimate cocktail parties and milestone celebrations'
    ],
    ctaHeading: 'Inquire & Book the Black Hall',
    ctaText:
      'Message us on WhatsApp with your preferred date and guest count—we will send availability and a tailored quote for venue rental, catering, and drinks.',
    ctaButtonWhatsApp: 'Inquire on WhatsApp',
    backToHome: 'Back to BRUT bar',
    whatsappMessage:
      'Hello! I would like to inquire about booking the private Black Hall at BRUT bar for an event (date and guest count):'
  }
};
