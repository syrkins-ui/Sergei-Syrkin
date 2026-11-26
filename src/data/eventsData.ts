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

export type EventTypeChoice = 'event' | 'birthday';

export interface EventsFormCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  eventTypeLabel: string;
  eventTypeOptions: { id: EventTypeChoice; label: string }[];
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  guestsLabel: string;
  guestsHint: string;
  dateLabel: string;
  datePlaceholder: string;
  notesLabel: string;
  notesPlaceholder: string;
  submitButton: string;
  redirectNote: string;
  validationNameError: string;
  validationPhoneError: string;
  validationGuestsError: string;
  validationDateError: string;
  sentStatusLabel: string;
  sentTitle: string;
  sentSubtitle: string;
  openWhatsAppAgain: string;
  copyMessageButton: string;
  copiedMessageButton: string;
  editFormButton: string;
  waHeader: string;
  waFooter: string;
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
  form: EventsFormCopy;
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
        note: 'Комфортная рассадка или формат фуршета для вашей компании',
      },
      {
        label: 'Аренда зала',
        value: 'от $200 USD',
        note: 'Полное закрытие чёрного зала только под ваше мероприятие',
      },
      {
        label: 'Кейтеринг',
        value: 'от $20 USD / чел.',
        note: 'Авторские закуски, сеты и гастрономическое сопровождение',
      },
    ],
    includedTitle: 'Всё продумано под ключ',
    includedSubtitle:
      'Мы обеспечиваем гастрономию, игристые и тихие вина, коктейли и организацию вечера без лишних хлопот.',
    features: [
      {
        number: '01',
        title: 'Изолированный чёрный зал для вашей компании',
        description:
          'Отдельное атмосферное пространство с тёплым камерным светом, винтажным зеркалом, собственной музыкой и полным уединением от основного зала.',
      },
      {
        number: '02',
        title: 'Кейтеринг от $20 USD на гостя',
        description:
          'Индивидуальное меню под формат праздника: артизанские сыры и антипасти, тапас, брускетты, горячие позиции и десерты.',
      },
      {
        number: '03',
        title: 'Напитки, игристые вина и работа сомелье',
        description:
          'Лучшие аргентинские игристые вина, натуральные пет-наты, авторские коктейли на основе брюта и безалкогольные напитки с персональным подбором под ваш бюджет.',
      },
      {
        number: '04',
        title: 'Полная организация и сервис',
        description:
          'Профессиональная команда официантов и барменов, сервировка бокалами, подготовка зала, поддержка декора и гибкий сценарий вечера.',
      },
    ],
    galleryTitle: 'Атмосфера зала и детали',
    occasionsTitle: 'Идеально для любого повода',
    occasions: [
      'Дни рождения и юбилеи в кругу близких',
      'Частные винные дегустации с сомелье Полиной Штайнер',
      'Корпоративные ужины, презентации и встречи команд',
      'Девичники, предсвадебные коктейли и камерные вечеринки',
    ],
    ctaHeading: 'Забронировать чёрный зал под ваш праздник',
    ctaText:
      'Заполните короткую анкету — мы получим все детали в WhatsApp, быстро рассчитаем стоимость аренды и кейтеринга и подтвердим свободную дату.',
    ctaButtonWhatsApp: 'Запросить расчёт в WhatsApp',
    backToHome: 'Назад в BRUT bar',
    whatsappMessage:
      'Здравствуйте! Хочу узнать условия и забронировать отдельный чёрный зал в BRUT bar для мероприятия (дата и количество человек):',
    form: {
      eyebrow: 'Заявка на событие',
      title: 'Оставить заявку на мероприятие или день рождения',
      subtitle:
        'Укажите базовые параметры праздника и нажмите «Отправить в WhatsApp» — мы ответим с расчётом и подтвердим дату.',
      eventTypeLabel: 'Формат события',
      eventTypeOptions: [
        { id: 'birthday', label: 'День рождения' },
        { id: 'event', label: 'Мероприятие' },
      ],
      nameLabel: 'Ваше имя',
      namePlaceholder: 'Мария Иванова',
      phoneLabel: 'Телефон / WhatsApp',
      phonePlaceholder: '+54 9 11 ...',
      emailLabel: 'Почта или Telegram (необязательно)',
      emailPlaceholder: 'maria@example.com или @username',
      guestsLabel: 'Количество человек',
      guestsHint: 'Чёрный зал вмещает до 35 гостей',
      dateLabel: 'Желаемая дата (впишите)',
      datePlaceholder: 'Например: 15 декабря, с 20:00',
      notesLabel: 'Пожелания по кейтерингу или напиткам (необязательно)',
      notesPlaceholder: 'Например: фуршет, игристые, своя музыка...',
      submitButton: 'Отправить заявку в WhatsApp',
      redirectNote: 'Все данные из анкеты автоматически подставятся в сообщение WhatsApp — просто нажмите «Отправить».',
      validationNameError: 'Пожалуйста, укажите ваше имя.',
      validationPhoneError: 'Пожалуйста, укажите телефон или WhatsApp для связи.',
      validationGuestsError: 'Укажите примерное количество гостей (от 1 до 35).',
      validationDateError: 'Пожалуйста, впишите желаемую дату события.',
      sentStatusLabel: 'Заявка готова к отправке в WhatsApp',
      sentTitle: 'Отправьте сообщение — мы скоро ответим с расчётом',
      sentSubtitle:
        'Мы открыли чат WhatsApp с вашей анкетой. Если окно не открылось автоматически, нажмите кнопку ниже.',
      openWhatsAppAgain: 'Открыть WhatsApp с заявкой',
      copyMessageButton: 'Скопировать текст заявки',
      copiedMessageButton: 'Текст скопирован',
      editFormButton: 'Изменить анкету',
      waHeader: 'Здравствуйте, BRUT bar! Хочу оставить заявку на аренду закрытого чёрного зала:',
      waFooter: 'Буду ждать расчёт и подтверждение по дате.',
    },
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
        note: 'Formato cóctel, mesas compartidas o degustación privada',
      },
      {
        label: 'Alquiler del salón',
        value: 'Desde USD 200',
        note: 'Uso exclusivo del Salón Negro privado para tu grupo',
      },
      {
        label: 'Catering',
        value: 'Desde USD 20 / pers.',
        note: 'Propuestas gastronómicas a medida por invitado',
      },
    ],
    includedTitle: 'Todo resuelto para tu festejo',
    includedSubtitle:
      'Proveemos catering, bebidas y organización integral para cumpleaños, brindis privados y encuentros corporativos.',
    features: [
      {
        number: '01',
        title: 'Salón Negro independiente y privado',
        description:
          'Un ambiente íntimo de estética nocturna, iluminación cálida y sonido propio, completamente separado del salón principal para disfrutar con total privacidad.',
      },
      {
        number: '02',
        title: 'Catering a medida desde USD 20 por persona',
        description:
          'Menú pensado para compartir: tablas de quesos artesanales, bruschettas, tapas de autor, opciones calientes y bocados dulces.',
      },
      {
        number: '03',
        title: 'Bebidas, espumantes y barra exclusiva',
        description:
          'Selección curada de espumantes argentinos, pét-nats, vinos tranquilos, cócteles de autor y opciones sin alcohol adaptadas a tu celebración.',
      },
      {
        number: '04',
        title: 'Servicio integral y anfitriones dedicados',
        description:
          'Nos ocupamos de la cristalería, ambientación, música, atención de mesa y coordinación completa del evento de principio a fin.',
      },
    ],
    galleryTitle: 'El espacio y la atmósfera',
    occasionsTitle: 'Pensado para cada celebración',
    occasions: [
      'Cumpleaños, aniversarios y brindis entre amigos',
      'Catas privadas guiadas junto a nuestra sommelier Polina Schteiner',
      'After office, lanzamientos y cenas de equipo',
      'Reuniones íntimas a puertas cerradas con menú y música propia',
    ],
    ctaHeading: 'Consultá disponibilidad y armemos tu evento',
    ctaText:
      'Completá el formulario con la fecha y cantidad de invitados — lo recibimos por WhatsApp y te enviamos presupuesto.',
    ctaButtonWhatsApp: 'Consultar por WhatsApp',
    backToHome: 'Volver a BRUT bar',
    whatsappMessage:
      '¡Hola! Quiero consultar disponibilidad y presupuesto para reservar el Salón Negro privado de BRUT bar (fecha y cantidad de personas):',
    form: {
      eyebrow: 'Solicitud de evento',
      title: 'Consultá por tu evento o cumpleaños',
      subtitle:
        'Completá los datos básicos y tocá «Enviar por WhatsApp» — te responderemos con disponibilidad y presupuesto personalizado.',
      eventTypeLabel: 'Tipo de celebración',
      eventTypeOptions: [
        { id: 'birthday', label: 'Cumpleaños' },
        { id: 'event', label: 'Evento' },
      ],
      nameLabel: 'Tu nombre',
      namePlaceholder: 'Martín Gómez',
      phoneLabel: 'Teléfono / WhatsApp',
      phonePlaceholder: '+54 9 11 ...',
      emailLabel: 'Email o Instagram (opcional)',
      emailPlaceholder: 'martin@ejemplo.com',
      guestsLabel: 'Cantidad de personas',
      guestsHint: 'Capacidad del Salón Negro: hasta 35 personas',
      dateLabel: 'Fecha estimada (escribila)',
      datePlaceholder: 'Ej.: Viernes 15 de diciembre, 20:00 hs',
      notesLabel: 'Comentarios sobre catering o bebidas (opcional)',
      notesPlaceholder: 'Ej.: formato cóctel, tabla de quesos, espumantes...',
      submitButton: 'Enviar solicitud por WhatsApp',
      redirectNote: 'Todos los datos del formulario se cargan automáticamente en el mensaje de WhatsApp.',
      validationNameError: 'Por favor, ingresá tu nombre.',
      validationPhoneError: 'Por favor, ingresá tu teléfono o WhatsApp.',
      validationGuestsError: 'Indicá la cantidad de personas (entre 1 y 35).',
      validationDateError: 'Por favor, escribí la fecha estimada.',
      sentStatusLabel: 'Solicitud lista para WhatsApp',
      sentTitle: 'Enviá el mensaje y te pasamos presupuesto',
      sentSubtitle:
        'Abrimos WhatsApp con los datos de tu consulta. Si no se abrió automáticamente, tocá el botón de abajo.',
      openWhatsAppAgain: 'Abrir WhatsApp con mi consulta',
      copyMessageButton: 'Copiar texto de la consulta',
      copiedMessageButton: 'Texto copiado',
      editFormButton: 'Editar datos',
      waHeader: '¡Hola, BRUT bar! Quiero consultar disponibilidad y presupuesto para el Salón Negro privado:',
      waFooter: '¡Gracias! Quedo a la espera de su respuesta.',
    },
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
        note: 'Formato coquetel, mesas para jantar ou degustação guiada',
      },
      {
        label: 'Aluguel do salão',
        value: 'A partir de US$ 200',
        note: 'Fechamento exclusivo do Salão Preto para seu grupo',
      },
      {
        label: 'Catering',
        value: 'A partir de US$ 20 / pessoa',
        note: 'Menu sob medida para o estilo do seu evento',
      },
    ],
    includedTitle: 'Serviço completo para sua festa',
    includedSubtitle:
      'Fornecemos gastronomia, bebidas selecionadas e toda a estrutura para você aproveitar sem preocupações.',
    features: [
      {
        number: '01',
        title: 'Salão Preto separado e reservado',
        description:
          'Um ambiente íntimo com iluminação acolhedora, espelho vintage e som independente para celebrar com privacidade total.',
      },
      {
        number: '02',
        title: 'Catering a partir de US$ 20 por pessoa',
        description:
          'Tábua de queijos artesanais, bruschettas, tapas autorais, opções quentes e sobremesas preparados pela nossa cozinha.',
      },
      {
        number: '03',
        title: 'Bebidas, espumantes e coquetelaria',
        description:
          'Curadoria especial de espumantes argentinos, pét-nats, vinhos, drinks exclusivos e opções sem álcool.',
      },
      {
        number: '04',
        title: 'Organização completa',
        description:
          'Equipe dedicada, taças de cristal, montagem personalizada e suporte integral durante toda a noite.',
      },
    ],
    galleryTitle: 'Ambiente e detalhes',
    occasionsTitle: 'Ideal para diferentes momentos',
    occasions: [
      'Aniversários e comemorações especiais',
      'Degustações privadas com a sommelier Polina Schteiner',
      'Encontros corporativos e jantares de equipe',
      'Festas íntimas e brindes a portas fechadas',
    ],
    ctaHeading: 'Reserve o Salão Preto para sua data',
    ctaText:
      'Preencha o formulário abaixo e envie pelo WhatsApp para receber orçamento e confirmação de disponibilidade.',
    ctaButtonWhatsApp: 'Solicitar orçamento no WhatsApp',
    backToHome: 'Voltar ao BRUT bar',
    whatsappMessage:
      'Olá! Gostaria de verificar disponibilidade e orçamento para reservar o Salão Preto do BRUT bar (data e número de convidados):',
    form: {
      eyebrow: 'Solicitar orçamento',
      title: 'Reserve seu evento ou aniversário',
      subtitle:
        'Informe os detalhes básicos e clique em «Enviar no WhatsApp» — responderemos rapidamente com orçamento e disponibilidade.',
      eventTypeLabel: 'Tipo de ocasião',
      eventTypeOptions: [
        { id: 'birthday', label: 'Aniversário' },
        { id: 'event', label: 'Evento' },
      ],
      nameLabel: 'Seu nome',
      namePlaceholder: 'Camila Costa',
      phoneLabel: 'Telefone / WhatsApp',
      phonePlaceholder: '+54 9 11 ...',
      emailLabel: 'E-mail ou Instagram (opcional)',
      emailPlaceholder: 'camila@exemplo.com',
      guestsLabel: 'Número de pessoas',
      guestsHint: 'O Salão Preto comporta até 35 convidados',
      dateLabel: 'Data desejada (digite)',
      datePlaceholder: 'Ex.: 15 de dezembro, às 20h',
      notesLabel: 'Observações (opcional)',
      notesPlaceholder: 'Ex.: formato coquetel, espumantes, música...',
      submitButton: 'Enviar pedido pelo WhatsApp',
      redirectNote: 'Todos os dados preenchidos vão direto para uma mensagem pronta no nosso WhatsApp.',
      validationNameError: 'Por favor, informe seu nome.',
      validationPhoneError: 'Por favor, informe seu telefone ou WhatsApp.',
      validationGuestsError: 'Informe o número de pessoas (entre 1 e 35).',
      validationDateError: 'Por favor, digite a data desejada.',
      sentStatusLabel: 'Pedido pronto para o WhatsApp',
      sentTitle: 'Envie a mensagem e responderemos com o orçamento',
      sentSubtitle:
        'Abrimos o WhatsApp com os dados da sua solicitação. Se não abriu automaticamente, clique no botão abaixo.',
      openWhatsAppAgain: 'Abrir WhatsApp com o pedido',
      copyMessageButton: 'Copiar texto do pedido',
      copiedMessageButton: 'Texto copiado',
      editFormButton: 'Editar dados',
      waHeader: 'Olá, BRUT bar! Gostaria de solicitar orçamento e disponibilidade para o Salão Preto privado:',
      waFooter: 'Aguardo retorno. Obrigado(a)!',
    },
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
        note: 'Flexible cocktail standing reception or seated dining layout',
      },
      {
        label: 'Hall rental',
        value: 'From $200 USD',
        note: 'Exclusive private access to the Black Hall for your party',
      },
      {
        label: 'Catering',
        value: 'From $20 USD / guest',
        note: 'Curated food packages tailored per person',
      },
    ],
    includedTitle: 'Full-service celebration, handled',
    includedSubtitle:
      'We provide food, drinks, dedicated staff, and everything else required for an effortless private gathering.',
    features: [
      {
        number: '01',
        title: 'Separate Private Black Hall',
        description:
          'An intimate, sound-isolated room featuring moody dark walls, warm candlelight, vintage mirror details, and independent music control.',
      },
      {
        number: '02',
        title: 'Catering from $20 USD per person',
        description:
          'Custom food spreads featuring artisan cheeses, antipasti, tapas, bruschettas, warm dishes, and sweet pairings.',
      },
      {
        number: '03',
        title: 'Drinks, Sparkling Wines & Sommelier Care',
        description:
          'Curated Argentine sparkling wines, natural pét-nats, still wines, signature spritzes, and non-alcoholic options.',
      },
      {
        number: '04',
        title: 'Turnkey Hosting & Staff',
        description:
          'Dedicated bartenders and servers, crystal stemware, room setup, and flexible timing tailored to your occasion.',
      },
    ],
    galleryTitle: 'Inside the Black Hall',
    occasionsTitle: 'Made for memorable gatherings',
    occasions: [
      'Birthdays, anniversaries, and private toasts',
      'Private guided tastings with Head Sommelier Polina Schteiner',
      'Team dinners, client receptions, and brand launches',
      'Intimate cocktail parties and milestone celebrations',
    ],
    ctaHeading: 'Inquire & Book the Black Hall',
    ctaText:
      'Fill in the short form below and send it straight to our WhatsApp—we will reply with availability and a tailored quote.',
    ctaButtonWhatsApp: 'Inquire on WhatsApp',
    backToHome: 'Back to BRUT bar',
    whatsappMessage:
      'Hello! I would like to inquire about booking the private Black Hall at BRUT bar for an event (date and guest count):',
    form: {
      eyebrow: 'Event Inquiry',
      title: 'Request an Event or Birthday',
      subtitle:
        'Share a few basic details and click “Send via WhatsApp”—we will reply quickly with availability and pricing.',
      eventTypeLabel: 'Occasion type',
      eventTypeOptions: [
        { id: 'birthday', label: 'Birthday' },
        { id: 'event', label: 'Private Event' },
      ],
      nameLabel: 'Your name',
      namePlaceholder: 'Daniel Brooks',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: '+54 9 11 ...',
      emailLabel: 'Email or Instagram (optional)',
      emailPlaceholder: 'daniel@example.com',
      guestsLabel: 'Number of guests',
      guestsHint: 'Private Black Hall fits up to 35 guests',
      dateLabel: 'Preferred date (type it in)',
      datePlaceholder: 'e.g. Friday Dec 15, around 8:00 PM',
      notesLabel: 'Catering or drinks notes (optional)',
      notesPlaceholder: 'e.g. cocktail style, cheese boards, sparkling wines...',
      submitButton: 'Send Inquiry via WhatsApp',
      redirectNote: 'Clicking submit opens WhatsApp with your details pre-filled—just press Send.',
      validationNameError: 'Please enter your name.',
      validationPhoneError: 'Please enter your phone or WhatsApp number.',
      validationGuestsError: 'Please enter the guest count (1–35).',
      validationDateError: 'Please type in your preferred date.',
      sentStatusLabel: 'Inquiry ready for WhatsApp',
      sentTitle: 'Send the message and we will reply with a quote',
      sentSubtitle:
        'We opened WhatsApp with your event request. If the window did not open automatically, click below.',
      openWhatsAppAgain: 'Open WhatsApp with Inquiry',
      copyMessageButton: 'Copy inquiry text',
      copiedMessageButton: 'Copied',
      editFormButton: 'Edit form',
      waHeader: 'Hello BRUT bar! I would like to inquire about booking the private Black Hall:',
      waFooter: 'Looking forward to availability and a tailored quote.',
    },
  },
};
