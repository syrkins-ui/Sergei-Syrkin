export type Language = 'ES' | 'PT' | 'EN' | 'RU';

export interface ContentTranslation {
  headerMenu: string;
  headerSommelier: string;
  headerEvents: string;
  headerHome: string;
  heroTitle: string;
  heroTagline: string;
  heroAddressLabel: string;
  heroAddressSub: string;
  heroSms: string;
  heroSmsLabel: string;
  heroInstagramLabel: string;
  heroCallLabel: string;
  menuTitle: string;
  menuSommelierText: string;
  tabWine: string;
  tabFood: string;
  tabCocktails: string;
  pairingLabel: string;
  interiorEyebrow: string;
  interiorTitle: string;
  interiorSubtitle: string;
  locationEyebrow: string;
  locationTitle: string;
  locationSubtitle: string;
  locationImageCaption: string;
  interiorImageCaption: string;
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
  map3dTabLabel: string;
  map2dTabLabel: string;
  map3dBadge: string;
  map3dTitle: string;
  map3dSubtitle: string;
  map3dInstruction: string;
  map3dResetView: string;
  map3dFilterAll: string;
  map3dFilterHeritage: string;
  map3dFilterGastronomy: string;
  map3dFilterCulture: string;
  map3dWalkingFromBrut: string;
  map3dOpenRoute: string;
  map3dCloseCard: string;
}

export const TRANSLATIONS: Record<Language, ContentTranslation> = {
  ES: {
    headerMenu: 'Menú',
    headerSommelier: 'La Sommelier',
    headerEvents: 'Eventos',
    headerHome: 'Inicio',
    heroTitle: 'CASA DE VINOS ESPUMANTES ARGENTINOS',
    heroTagline: 'Un espacio íntimo de vinos espumantes de autor, fermentación natural y etiquetas seleccionadas en San Telmo.',
    heroAddressLabel: 'DIRECCIÓN',
    heroAddressSub: 'Tocá para abrir en Google Maps y calcular ruta',
    heroSms: 'Mesa por WhatsApp',
    heroSmsLabel: 'RESERVA',
    heroInstagramLabel: 'INSTAGRAM',
    heroCallLabel: 'LLAMAR',
    menuTitle: 'Carta Vinos & Menú Gastronómico',
    menuSommelierText: 'En nuestro local contamos con un **Sommelier con Inteligencia Artificial** único, que te asistirá para seleccionar el vino perfecto según tus gustos.',
    tabWine: 'Vino',
    tabFood: 'Comida',
    tabCocktails: 'Cócteles',
    pairingLabel: 'Maridaje:',
    interiorEyebrow: 'INTERIOR Y CONCEPTO',
    interiorTitle: 'El primer bar de espumantes argentinos.',
    interiorSubtitle: 'Estamos creando una colección viva. Nuestro objetivo es reunir los mejores y más inusuales espumantes de toda la Argentina. Ya podés descubrir una gran variedad de etiquetas: desde los más secos hasta los dulces de postre, desde el método tradicional hasta la fermentación salvaje. Una propuesta pensada para todos los gustos y presupuestos.',
    locationEyebrow: 'UBICACIÓN Y CÓMO LLEGAR',
    locationTitle: 'Donde San Telmo se encuentra con Puerto Madero.',
    locationSubtitle: 'Una ubicación estratégica y única: a solo un minuto de la mítica calle Defensa, a tres cuadras del Mercado de San Telmo y a dos de Puerto Madero. Somos el punto de partida perfecto para recorrer el barrio o el refugio ideal para terminar el día con una copa de espumante y un brunch irresistible. El lugar que este rincón de la ciudad estaba esperando.',
    locationImageCaption: 'Facultad de Ingeniería y Ministry of Agro Industry — a 1 min de BRUT bar',
    interiorImageCaption: 'Colección de vinos • BRUT bar',
    locationDirections: 'Trazar recorrido',
    locationCopy: 'Copiar',
    locationCopied: '¡Copiado!',
    locationHours: 'Mié 15:00–22:00 • Jue–Vie 15:00–00:00 • Sáb 14:00–00:00 • Dom 14:00–21:00 (Lun–Mar cerrado)',
    footerDescription: 'Primer bar especializado en vinos espumantes y pét-nats de Argentina. En el histórico barrio de San Telmo.',
    footerHoursLabel: 'HORARIOS',
    footerHours: 'Mié 15:00–22:00 • Jue–Vie 15:00–00:00 • Sáb 14:00–00:00 • Dom 14:00–21:00 (Lun–Mar cerrado)',
    footerAddressLabel: 'DIRECCIÓN',
    footerRights: 'Todos los derechos reservados.',
    waPresetMessage: '¡Hola, BRUT bar! Quiero reservar una mesa para: (fecha, hora y cantidad de personas)',
    map3dTabLabel: 'Google Maps 3D',
    map2dTabLabel: 'Fotos & Ubicación',
    map3dBadge: 'GOOGLE MAPS PLATFORM • VISTA 3D',
    map3dTitle: 'BRUT bar — En el corazón de San Telmo: cerca de los principales atractivos',
    map3dSubtitle: 'Explorá los puntos más icónicos del barrio y pasá por BRUT bar a refrescarte con copas burbujeantes.',
    map3dInstruction: 'Arrastrá para orbitar • Rueda o pellizco para zoom • Hacé clic en los pines para explorar',
    map3dResetView: 'Centrar en BRUT bar',
    map3dFilterAll: 'Todos los hitos',
    map3dFilterHeritage: 'Historia & Arquitectura',
    map3dFilterGastronomy: 'Gastronomía & Mercados',
    map3dFilterCulture: 'Cultura & Paseos',
    map3dWalkingFromBrut: 'a pie desde BRUT bar',
    map3dOpenRoute: 'Cómo llegar en Google Maps',
    map3dCloseCard: 'Cerrar'
  },
  PT: {
    headerMenu: 'Menu',
    headerSommelier: 'A Sommelier',
    headerEvents: 'Eventos',
    headerHome: 'Início',
    heroTitle: 'CASA DE VINOS ESPUMANTES ARGENTINOS',
    heroTagline: 'Um espaço íntimo de vinhos espumantes de autor, fermentação natural e rótulos selecionados em San Telmo.',
    heroAddressLabel: 'ENDEREÇO',
    heroAddressSub: 'Toque para abrir no Google Maps e ver a rota',
    heroSms: 'Mesa pelo WhatsApp',
    heroSmsLabel: 'RESERVA',
    heroInstagramLabel: 'INSTAGRAM',
    heroCallLabel: 'LIGAR',
    menuTitle: 'Carta de Vinhos & Menu Gastronômico',
    menuSommelierText: 'Em nosso local contamos com um **Sommelier de Inteligência Artificial** único, que o ajudará a selecionar o vinho perfeito de acordo com seus gostos.',
    tabWine: 'Vinho',
    tabFood: 'Comida',
    tabCocktails: 'Coquetéis',
    pairingLabel: 'Harmonização:',
    interiorEyebrow: 'INTERIOR E CONCEITO',
    interiorTitle: 'O primeiro bar de espumantes argentinos.',
    interiorSubtitle: 'Estamos criando uma coleção viva. Nosso objetivo é reunir os melhores e mais incomuns espumantes de toda a Argentina. Você já pode descobrir uma grande variedade de rótulos: dos mais secos aos doces de sobremesa, do método tradicional à fermentação selvagem. Uma proposta pensada para todos os gostos e orçamentos.',
    locationEyebrow: 'LOCALIZAÇÃO E COMO CHEGAR',
    locationTitle: 'Onde San Telmo se encontra com Puerto Madero.',
    locationSubtitle: 'Uma localização estratégica e única: a apenas um minuto da mítica rua Defensa, a três quadras do Mercado de San Telmo e a duas de Puerto Madero. Somos o ponto de partida perfeito para explorar o bairro ou o refúgio ideal para terminar o dia com uma taça de espumante e um brunch irresistível. O lugar que este canto da cidade estava esperando.',
    locationImageCaption: 'Facultad de Ingeniería e Ministry of Agro Industry — a 1 min do BRUT bar',
    interiorImageCaption: 'Coleção de vinhos • BRUT bar',
    locationDirections: 'Como chegar',
    locationCopy: 'Copiar',
    locationCopied: 'Copiado!',
    locationHours: 'Qua 15:00–22:00 • Qui–Sex 15:00–00:00 • Sáb 14:00–00:00 • Dom 14:00–21:00 (Seg–Ter fechado)',
    footerDescription: 'Primeiro bar especializado em espumantes e pét-nats da Argentina. No histórico bairro de San Telmo.',
    footerHoursLabel: 'HORÁRIOS',
    footerHours: 'Qua 15:00–22:00 • Qui–Sex 15:00–00:00 • Sáb 14:00–00:00 • Dom 14:00–21:00 (Seg–Ter fechado)',
    footerAddressLabel: 'ENDEREÇO',
    footerRights: 'Todos os direitos reservados.',
    waPresetMessage: 'Olá, BRUT bar! Quero reservar uma mesa para: (data, horário e número de pessoas)',
    map3dTabLabel: 'Google Maps 3D',
    map2dTabLabel: 'Fotos & Localização',
    map3dBadge: 'GOOGLE MAPS PLATFORM • VISTA 3D',
    map3dTitle: 'BRUT bar — No coração de San Telmo: perto de todas as principais atrações',
    map3dSubtitle: 'Explore os pontos mais icônicos do bairro e passe no BRUT bar para se refrescar com bebidas borbulhantes.',
    map3dInstruction: 'Arraste para girar • Role para zoom • Clique nos pontos para explorar',
    map3dResetView: 'Centralizar no BRUT bar',
    map3dFilterAll: 'Todos os pontos',
    map3dFilterHeritage: 'História & Arquitetura',
    map3dFilterGastronomy: 'Gastronomia & Mercados',
    map3dFilterCulture: 'Cultura & Passeios',
    map3dWalkingFromBrut: 'a pé a partir do BRUT bar',
    map3dOpenRoute: 'Ver rota no Google Maps',
    map3dCloseCard: 'Fechar'
  },
  EN: {
    headerMenu: 'Menu',
    headerSommelier: 'Sommelier',
    headerEvents: 'Events',
    headerHome: 'Home',
    heroTitle: 'CASA DE VINOS ESPUMANTES ARGENTINOS',
    heroTagline: 'An intimate bar space dedicated to artisanal sparkling wines, natural fermentation, and handpicked labels in San Telmo.',
    heroAddressLabel: 'ADDRESS',
    heroAddressSub: 'Tap to open in Google Maps and get directions',
    heroSms: 'Table via WhatsApp',
    heroSmsLabel: 'RESERVE',
    heroInstagramLabel: 'INSTAGRAM',
    heroCallLabel: 'CALL US',
    menuTitle: 'Wine List & Gastronomic Menu',
    menuSommelierText: 'At our bar, we have a unique **AI Sommelier** to help you select the perfect wine according to your taste.',
    tabWine: 'Wine',
    tabFood: 'Food',
    tabCocktails: 'Cocktails',
    pairingLabel: 'Pairing:',
    interiorEyebrow: 'INTERIOR & CONCEPT',
    interiorTitle: 'The first Argentine sparkling wine bar.',
    interiorSubtitle: 'We are creating a living collection. Our goal is to bring together the finest and most unusual sparkling wines from across Argentina. Discover a wide variety of labels: from the bone-dry to sweet dessert wines, from traditional method to wild fermentation. A curated offering designed for every palate and budget.',
    locationEyebrow: 'LOCATION & DIRECTIONS',
    locationTitle: 'Where San Telmo meets Puerto Madero.',
    locationSubtitle: 'A unique and strategic location: just one minute from the legendary Defensa street, three blocks from San Telmo Market, and two blocks from Puerto Madero. The perfect starting point to explore the neighborhood or the ideal refuge to end your day with a glass of sparkling wine and an irresistible brunch. The place this corner of the city has been waiting for.',
    locationImageCaption: 'Facultad de Ingeniería & Ministry of Agro Industry — 1 min from BRUT bar',
    interiorImageCaption: 'Wine collection • BRUT bar',
    locationDirections: 'Get directions',
    locationCopy: 'Copy',
    locationCopied: 'Copied!',
    locationHours: 'Wed 15:00–22:00 • Thu–Fri 15:00–00:00 • Sat 14:00–00:00 • Sun 14:00–21:00 (Mon–Tue closed)',
    footerDescription: 'Argentina\'s first wine bar specialized in sparkling wines and pét-nats. Located in historic San Telmo.',
    footerHoursLabel: 'HOURS',
    footerHours: 'Wed 15:00–22:00 • Thu–Fri 15:00–00:00 • Sat 14:00–00:00 • Sun 14:00–21:00 (Mon–Tue closed)',
    footerAddressLabel: 'ADDRESS',
    footerRights: 'All rights reserved.',
    waPresetMessage: 'Hi, BRUT bar! I would like to reserve a table for: (date, time, and number of guests)',
    map3dTabLabel: 'Google Maps 3D',
    map2dTabLabel: 'Photos & Location',
    map3dBadge: 'GOOGLE MAPS PLATFORM • 3D VIEW',
    map3dTitle: 'BRUT bar — In the heart of San Telmo: surrounded by top attractions',
    map3dSubtitle: 'Explore all the neighborhood’s iconic sights and drop by BRUT bar to refresh with chilled bubbly drinks.',
    map3dInstruction: 'Drag to rotate • Scroll to zoom • Click markers to explore',
    map3dResetView: 'Center on BRUT bar',
    map3dFilterAll: 'All landmarks',
    map3dFilterHeritage: 'History & Architecture',
    map3dFilterGastronomy: 'Gastronomy & Markets',
    map3dFilterCulture: 'Culture & Walks',
    map3dWalkingFromBrut: 'walk from BRUT bar',
    map3dOpenRoute: 'Directions in Google Maps',
    map3dCloseCard: 'Close'
  },
  RU: {
    headerMenu: 'Меню',
    headerSommelier: 'Сомелье',
    headerEvents: 'Мероприятия',
    headerHome: 'Главная',
    heroTitle: 'CASA DE VINOS ESPUMANTES ARGENTINOS',
    heroTagline: 'Камерное пространство авторских игристых вин, натуральной ферментации и отборных релизов в районе Сан-Тельмо.',
    heroAddressLabel: 'АДРЕС',
    heroAddressSub: 'Нажмите, чтобы открыть Google Карты и построить маршрут',
    heroSms: 'Столик в WhatsApp',
    heroSmsLabel: 'БРОНЬ',
    heroInstagramLabel: 'ИНСТАГРАМ',
    heroCallLabel: 'ПОЗВОНИТЬ',
    menuTitle: 'Винная карта и гастрономическое меню',
    menuSommelierText: 'В нашем баре работает уникальный **ИИ-Сомелье**, который поможет вам выбрать идеальное вино по вашему вкусу.',
    tabWine: 'Вино',
    tabFood: 'Еда',
    tabCocktails: 'Коктейли',
    pairingLabel: 'Сочетание:',
    interiorEyebrow: 'ИНТЕРЬЕР И КОНЦЕПЦИЯ',
    interiorTitle: 'Первый бар аргентинских игристых вин.',
    interiorSubtitle: 'Мы создаем живую коллекцию. Наша цель — собрать лучшие и самые необычные игристые вина со всей Аргентины. Уже сейчас вы можете открыть для себя огромное разнообразие этикеток: от сухих брютов до десертных сладких вин, от классического метода до дикой ферментации. Предложение, продуманное для любых вкусов и бюджетов.',
    locationEyebrow: 'ЛОКАЦИЯ И МАРШРУТ',
    locationTitle: 'Где Сан-Тельмо встречается с Пуэрто-Мадеро.',
    locationSubtitle: 'Уникальное стратегическое расположение: всего в минуте от легендарной улицы Дефенса, в трех кварталах от рынка Сан-Тельмо и в двух от Пуэрто-Мадеро. Идеальная точка старта для прогулки по району или уютное убежище, чтобы завершить день бокалом игристого и неотразимым бранчем. Место, которого так не хватало этому уголку города.',
    locationImageCaption: 'Факультад де Инхенериа и здание Ministry of Agro Industry — 1 минута от БРЮТ бара',
    interiorImageCaption: 'Коллекция вин • BRUT bar',
    locationDirections: 'Построить маршрут',
    locationCopy: 'Скопировать',
    locationCopied: 'Скопировано!',
    locationHours: 'Ср 15:00–22:00 • Чт–Пт 15:00–00:00 • Сб 14:00–00:00 • Вс 14:00–21:00 (Пн–Вт закрыто)',
    footerDescription: 'Первый специализированный бар игристых вин и пет-натов Аргентины. В историческом районе Сан-Тельмо.',
    footerHoursLabel: 'РЕЖИМ РАБОТЫ',
    footerHours: 'Ср 15:00–22:00 • Чт–Пт 15:00–00:00 • Сб 14:00–00:00 • Вс 14:00–21:00 (Пн–Вт закрыто)',
    footerAddressLabel: 'АДРЕС',
    footerRights: 'Все права защищены.',
    waPresetMessage: 'Привет, БРЮТ бар! Хочу забронировать столик на: (дата, время и количество персон)',
    map3dTabLabel: 'Google Maps 3D',
    map2dTabLabel: 'Фото и локация',
    map3dBadge: 'GOOGLE MAPS PLATFORM • 3D-КАРТА',
    map3dTitle: 'БРЮТ бар — в самом сердце Сан-Тельмо: рядом все главные достопримечательности',
    map3dSubtitle: 'Исследуй все главные достопримечательности и заходи в Брют Бар освежиться прохладными напитками с пузырьками',
    map3dInstruction: 'Вращайте карту • Колесико для зума • Нажмите на метку для деталей',
    map3dResetView: 'Центрировать на BRUT bar',
    map3dFilterAll: 'Все места',
    map3dFilterHeritage: 'История и архитектура',
    map3dFilterGastronomy: 'Гастрономия и рынки',
    map3dFilterCulture: 'Культура и прогулки',
    map3dWalkingFromBrut: 'пешком от BRUT bar',
    map3dOpenRoute: 'Маршрут на Google Maps',
    map3dCloseCard: 'Закрыть'
  }
};
