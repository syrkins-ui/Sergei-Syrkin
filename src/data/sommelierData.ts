import { Language } from './translations';

export interface TastingHighlight {
  number: string;
  title: string;
  description: string;
}

export type TastingLanguageChoice = 'ES' | 'EN' | 'RU';
export type TastingTopicId = 'sparkling' | 'malbec' | 'white' | 'other';

export interface SommelierFormCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  tastingLangLabel: string;
  tastingLangOptions: { id: TastingLanguageChoice; label: string }[];
  guestsLabel: string;
  guestsHint: string;
  topicLabel: string;
  topicOptions: { id: TastingTopicId; label: string }[];
  customTopicLabel: string;
  customTopicPlaceholder: string;
  dateLabel: string;
  datePlaceholder: string;
  submitButton: string;
  redirectNote: string;
  validationNameError: string;
  validationPhoneError: string;
  validationEmailError: string;
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

export interface SommelierProfile {
  name: string;
  roles: string[];
  roleSubtitle: string;
  quote: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  educationTitle: string;
  educationBadges: { institution: string; detail: string }[];
  tastingEyebrow: string;
  tastingTitle: string;
  tastingHighlights: TastingHighlight[];
  backToHome: string;
  pageTitleBadge: string;
  whatsappMessage: string;
  form: SommelierFormCopy;
}

export const SOMMELIER_DATA: Record<Language, SommelierProfile> = {
  RU: {
    pageTitleBadge: 'Шеф-сомелье BRUT bar',
    name: 'Полина Штайнер',
    roles: ['Сомелье', 'Искусствовед', 'Винный скаут'],
    roleSubtitle: 'Сомелье, искусствовед, винный скаут',
    quote:
      '«Вино — это самое честное послание сквозь пространство и время. Каждая бутылка хранит в себе решения людей, характер земли и контекст эпохи. Моя задача — помочь вам расшифровать этот язык и услышать его историю».',
    aboutTitle: 'Обо мне',
    aboutParagraphs: [
      'Мой путь в мир вина начался с оптики искусствоведа: окончив исторический факультет МГУ, я привыкла смотреть на вещи через форму, содержание и культурный след, который человек оставляет во времени.',
      'Когда в 2018 году я впервые столкнулась с миром живого ремесленного вина, я поняла, что виноделие — это такое же чистое искусство, требующее фундаментального понимания и точного языка.',
      'За академической базой я пошла в московскую школу «Энотрия» (Simple Group), пройдя полный курс. Сегодня я продолжаю углублять экспертизу на международном уровне, обучаясь по программе WSET в институте CAVE (Centro Argentino de Vinos y Sommeliers) в Буэнос-Айресе.',
    ],
    educationTitle: 'Обучение',
    educationBadges: [
      {
        institution: 'МГУ им. М.В. Ломоносова',
        detail: 'Исторический факультет, отделение истории искусств',
      },
      {
        institution: 'Винная школа «Энотрия»',
        detail: 'Полный профессиональный курс (Simple Group, Москва)',
      },
      {
        institution: 'CAVE (Centro Argentino de Vinos y Sommeliers)',
        detail: 'Международная программа WSET (Буэнос-Айрес, Аргентина)',
      },
    ],
    tastingEyebrow: 'Дегустации в BRUT bar',
    tastingTitle: 'Организация дегустаций в BRUT bar',
    tastingHighlights: [
      {
        number: '01',
        title: 'Отдельный зал до 25 человек',
        description:
          'В BRUT bar есть отдельный камерный зал для дегустаций, вмещающий до 25 человек — комфортное пространство только для вас и вашей компании.',
      },
      {
        number: '02',
        title: 'Сформированные дегустации любых вин',
        description:
          'Подбираем и проводим дегустации любых вин: Мальбеки, Совиньон Бланы, Каберне Фран, игристые вина и другие интересные аргентинские позиции.',
      },
      {
        number: '03',
        title: 'Индивидуальные и групповые, с закусками и без',
        description:
          'Проводим как индивидуальные, так и групповые дегустации — с гастрономическим сопровождением и закусками или в чистом винном формате.',
      },
    ],
    backToHome: 'Назад в BRUT bar',
    whatsappMessage:
      'Здравствуйте! Хочу забронировать дегустацию с Полиной в BRUT bar.',
    form: {
      eyebrow: 'Заявка на дегустацию',
      title: 'Забронировать дегустацию с Полиной',
      subtitle:
        'Заполните короткую анкету и нажмите «Отправить в WhatsApp» — все детали сразу передадутся нам, и мы ответим с предложением и подтверждением.',
      fullNameLabel: 'Имя и фамилия',
      fullNamePlaceholder: 'Анна Соколова',
      phoneLabel: 'Телефон / WhatsApp',
      phonePlaceholder: '+54 9 11 ...',
      emailLabel: 'Электронная почта',
      emailPlaceholder: 'anna@example.com',
      tastingLangLabel: 'Язык дегустации',
      tastingLangOptions: [
        { id: 'RU', label: 'Русский' },
        { id: 'ES', label: 'Испанский' },
        { id: 'EN', label: 'Английский' },
      ],
      guestsLabel: 'Количество человек',
      guestsHint: 'Отдельный зал вмещает до 25 гостей',
      topicLabel: 'Тема дегустации',
      topicOptions: [
        { id: 'sparkling', label: 'Игристые Аргентины' },
        { id: 'malbec', label: 'Мальбеки' },
        { id: 'white', label: 'Белые вина Аргентины' },
        { id: 'other', label: 'Другое' },
      ],
      customTopicLabel: 'Какая тема или вина вас интересуют?',
      customTopicPlaceholder: 'Например: Каберне Фран, пет-наты, вина Патагонии...',
      dateLabel: 'Желаемая дата мероприятия',
      datePlaceholder: 'Выберите дату (дд.мм.гггг)',
      submitButton: 'Отправить заявку в WhatsApp',
      redirectNote: 'После нажатия откроется WhatsApp с заполненной заявкой — просто нажмите «Отправить».',
      validationNameError: 'Пожалуйста, укажите имя и фамилию.',
      validationPhoneError: 'Пожалуйста, укажите номер телефона для связи.',
      validationEmailError: 'Пожалуйста, укажите корректный email.',
      validationGuestsError: 'Укажите количество гостей (от 1 до 25).',
      validationDateError: 'Пожалуйста, выберите желаемую дату мероприятия.',
      sentStatusLabel: 'Заявка готова к отправке в WhatsApp',
      sentTitle: 'Отправьте сообщение — мы скоро ответим',
      sentSubtitle:
        'Мы открыли чат WhatsApp с данными вашей анкеты. Если окно не открылось автоматически, нажмите кнопку ниже.',
      openWhatsAppAgain: 'Открыть WhatsApp с заявкой',
      copyMessageButton: 'Скопировать текст заявки',
      copiedMessageButton: 'Текст скопирован',
      editFormButton: 'Изменить анкету',
      waHeader: 'Здравствуйте, BRUT bar! Хочу забронировать дегустацию с сомелье Полиной Штайнер:',
      waFooter: 'Жду вашего ответа с деталями и подтверждением.',
    },
  },

  ES: {
    pageTitleBadge: 'Head Sommelier · BRUT bar',
    name: 'Polina Schteiner',
    roles: ['Sommelier', 'Historiadora del Arte', 'Wine Scout'],
    roleSubtitle: 'Sommelier, historiadora del arte, wine scout',
    quote:
      '«El vino es el mensaje más honesto a través del espacio y del tiempo. Cada botella guarda las decisiones de quienes la crearon, el carácter de la tierra y el contexto de su época. Mi misión es ayudarte a descifrar ese lenguaje y escuchar su historia».',
    aboutTitle: 'Sobre mí',
    aboutParagraphs: [
      'Mi camino en el mundo del vino comenzó desde la mirada de la historia del arte: egresada de la Facultad de Historia de la Universidad Estatal de Moscú (MGU), aprendí a observar las cosas a través de su forma, su contenido y la huella cultural que el ser humano deja en el tiempo.',
      'Cuando en 2018 descubrí el universo de los vinos vivos y artesanales, comprendí que la vitivinicultura es un arte puro, que exige comprensión fundamental y un lenguaje preciso.',
      'Para construir mi base académica, completé el curso integral en la prestigiosa escuela moscovita Enotria (Simple Group). Hoy continúo profundizando mi expertise a nivel internacional, formándome bajo el programa WSET en el reconocido instituto CAVE (Centro Argentino de Vinos y Sommeliers) en Buenos Aires.',
    ],
    educationTitle: 'Formación',
    educationBadges: [
      {
        institution: 'Universidad Estatal de Moscú (MGU)',
        detail: 'Facultad de Historia, orientación en Historia del Arte',
      },
      {
        institution: 'Escuela de Vinos «Enotria»',
        detail: 'Curso profesional integral (Simple Group, Moscú)',
      },
      {
        institution: 'CAVE (Centro Argentino de Vinos y Sommeliers)',
        detail: 'Certificación internacional WSET (Buenos Aires, Argentina)',
      },
    ],
    tastingEyebrow: 'Catas en BRUT bar',
    tastingTitle: 'Organización de degustaciones en BRUT bar',
    tastingHighlights: [
      {
        number: '01',
        title: 'Salón privado hasta 25 personas',
        description:
          'En BRUT bar contamos con un salón independiente para degustaciones con capacidad de hasta 25 personas.',
      },
      {
        number: '02',
        title: 'Degustaciones curadas de todo tipo de vinos',
        description:
          'Armamos catas temáticas de cualquier estilo: Malbecs, Sauvignon Blanc, Cabernet Franc, espumantes y mucho más.',
      },
      {
        number: '03',
        title: 'Individuales o grupales, con o sin tapas',
        description:
          'Experiencias pensadas tanto para personas individuales como para grupos, con acompañamiento gastronómico o sin snacks.',
      },
    ],
    backToHome: 'Volver a BRUT bar',
    whatsappMessage:
      '¡Hola! Quiero reservar una degustación con Polina en BRUT bar.',
    form: {
      eyebrow: 'Solicitud de cata',
      title: 'Reservá tu degustación con Polina',
      subtitle:
        'Completá el formulario y tocá «Enviar por WhatsApp» — recibimos todos los datos al instante para responderte y confirmar disponibilidad.',
      fullNameLabel: 'Nombre y apellido',
      fullNamePlaceholder: 'Sofía Martínez',
      phoneLabel: 'Teléfono / WhatsApp',
      phonePlaceholder: '+54 9 11 ...',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'sofia@ejemplo.com',
      tastingLangLabel: 'Idioma de la degustación',
      tastingLangOptions: [
        { id: 'ES', label: 'Español' },
        { id: 'EN', label: 'Inglés' },
        { id: 'RU', label: 'Ruso' },
      ],
      guestsLabel: 'Cantidad de personas',
      guestsHint: 'Salón privado con capacidad hasta 25 personas',
      topicLabel: 'Temática de la degustación',
      topicOptions: [
        { id: 'sparkling', label: 'Espumantes de Argentina' },
        { id: 'malbec', label: 'Malbecs' },
        { id: 'white', label: 'Vinos blancos de Argentina' },
        { id: 'other', label: 'Otro' },
      ],
      customTopicLabel: '¿Qué temática o vinos te interesan?',
      customTopicPlaceholder: 'Ej.: Cabernet Franc, pét-nats, vinos de la Patagonia...',
      dateLabel: 'Fecha deseada del evento',
      datePlaceholder: 'Elegí una fecha (dd/mm/aaaa)',
      submitButton: 'Enviar solicitud por WhatsApp',
      redirectNote: 'Al enviar, se abrirá WhatsApp con tu solicitud completa lista para confirmar.',
      validationNameError: 'Por favor, ingresá tu nombre y apellido.',
      validationPhoneError: 'Por favor, ingresá un teléfono de contacto.',
      validationEmailError: 'Por favor, ingresá un correo electrónico válido.',
      validationGuestsError: 'Indicá la cantidad de personas (entre 1 y 25).',
      validationDateError: 'Por favor, seleccioná una fecha deseada.',
      sentStatusLabel: 'Solicitud lista para WhatsApp',
      sentTitle: 'Enviá el mensaje y te responderemos pronto',
      sentSubtitle:
        'Abrimos WhatsApp con los datos de tu formulario. Si no se abrió automáticamente, tocá el botón de abajo.',
      openWhatsAppAgain: 'Abrir WhatsApp con mi solicitud',
      copyMessageButton: 'Copiar texto de la solicitud',
      copiedMessageButton: 'Texto copiado',
      editFormButton: 'Editar formulario',
      waHeader: '¡Hola, BRUT bar! Quiero solicitar una degustación con la sommelier Polina Schteiner:',
      waFooter: 'Quedo atento/a a su respuesta y confirmación.',
    },
  },

  EN: {
    pageTitleBadge: 'Head Sommelier · BRUT bar',
    name: 'Polina Schteiner',
    roles: ['Sommelier', 'Art Historian', 'Wine Scout'],
    roleSubtitle: 'Sommelier, art historian, wine scout',
    quote:
      '“Wine is the most honest message across space and time. Every bottle holds the decisions of its makers, the character of the soil, and the context of its era. My mission is to help you decipher this language and hear its story.”',
    aboutTitle: 'About me',
    aboutParagraphs: [
      'My journey into wine began through the lens of an art historian: graduating from the History Department of Moscow State University (MSU), I learned to examine things through form, content, and the cultural footprint left across time.',
      'When I first encountered authentic artisanal, living wines in 2018, I realized that winemaking is pure art—one that demands fundamental comprehension and precise language.',
      'To build an academic foundation, I completed the comprehensive course at Enotria Wine School (Simple Group). Today, I continue advancing my expertise internationally through the WSET program at CAVE (Centro Argentino de Vinos y Sommeliers) in Buenos Aires.',
    ],
    educationTitle: 'Education',
    educationBadges: [
      {
        institution: 'Lomonosov Moscow State University (MSU)',
        detail: 'Department of History, Art History division',
      },
      {
        institution: 'Enotria Wine School',
        detail: 'Comprehensive professional sommelier program (Simple Group)',
      },
      {
        institution: 'CAVE (Centro Argentino de Vinos y Sommeliers)',
        detail: 'International WSET program (Buenos Aires, Argentina)',
      },
    ],
    tastingEyebrow: 'Tastings at BRUT bar',
    tastingTitle: 'Curated Wine Tastings at BRUT bar',
    tastingHighlights: [
      {
        number: '01',
        title: 'Private tasting room for up to 25 guests',
        description:
          'BRUT bar features a dedicated private room designed for wine tastings, comfortably hosting up to 25 people.',
      },
      {
        number: '02',
        title: 'Curated flights of any wine style',
        description:
          'Custom-curated tastings across any varietals: Malbec, Sauvignon Blanc, Cabernet Franc, sparkling wines, and more.',
      },
      {
        number: '03',
        title: 'Solo or group formats, with or without pairings',
        description:
          'Available for both individual guests and private groups, with artisan snacks or as a pure wine-focused tasting.',
      },
    ],
    backToHome: 'Back to BRUT bar',
    whatsappMessage:
      'Hello! I would like to book a wine tasting with Polina at BRUT bar.',
    form: {
      eyebrow: 'Tasting Inquiry',
      title: 'Book a Tasting with Polina',
      subtitle:
        'Fill in the form below and send it straight to our WhatsApp—we will get back to you with a tailored proposal and confirmation.',
      fullNameLabel: 'Full name',
      fullNamePlaceholder: 'Clara Vance',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: '+54 9 11 ...',
      emailLabel: 'Email address',
      emailPlaceholder: 'clara@example.com',
      tastingLangLabel: 'Tasting language',
      tastingLangOptions: [
        { id: 'EN', label: 'English' },
        { id: 'ES', label: 'Spanish' },
        { id: 'RU', label: 'Russian' },
      ],
      guestsLabel: 'Number of guests',
      guestsHint: 'Private room accommodates up to 25 guests',
      topicLabel: 'Tasting theme',
      topicOptions: [
        { id: 'sparkling', label: 'Argentine Sparkling Wines' },
        { id: 'malbec', label: 'Malbecs' },
        { id: 'white', label: 'Argentine White Wines' },
        { id: 'other', label: 'Other' },
      ],
      customTopicLabel: 'Which wines or theme would you like?',
      customTopicPlaceholder: 'e.g. Cabernet Franc, pét-nats, Patagonian wines...',
      dateLabel: 'Preferred event date',
      datePlaceholder: 'Select a date (mm/dd/yyyy)',
      submitButton: 'Send Inquiry via WhatsApp',
      redirectNote: 'Clicking submit opens WhatsApp with all your answers pre-filled—just press Send.',
      validationNameError: 'Please enter your full name.',
      validationPhoneError: 'Please enter a valid phone number.',
      validationEmailError: 'Please enter a valid email address.',
      validationGuestsError: 'Please enter the number of guests (1–25).',
      validationDateError: 'Please choose your preferred date.',
      sentStatusLabel: 'Inquiry ready for WhatsApp',
      sentTitle: 'Send the message and we will confirm shortly',
      sentSubtitle:
        'We opened WhatsApp with your tasting request. If the window did not open automatically, click below.',
      openWhatsAppAgain: 'Open WhatsApp with Inquiry',
      copyMessageButton: 'Copy inquiry text',
      copiedMessageButton: 'Copied',
      editFormButton: 'Edit form',
      waHeader: 'Hello BRUT bar! I would like to book a wine tasting with Head Sommelier Polina Schteiner:',
      waFooter: 'Looking forward to your reply and confirmation.',
    },
  },

  PT: {
    pageTitleBadge: 'Head Sommelier · BRUT bar',
    name: 'Polina Schteiner',
    roles: ['Sommelier', 'Historiadora da Arte', 'Wine Scout'],
    roleSubtitle: 'Sommelier, historiadora da arte, wine scout',
    quote:
      '«O vinho é a mensagem mais honesta através do espaço e do tempo. Cada garrafa guarda as decisões de quem a criou, o caráter da terra e o contexto da sua época. Minha missão é ajudar você a decifrar essa linguagem e ouvir sua história».',
    aboutTitle: 'Sobre mim',
    aboutParagraphs: [
      'Meu caminho no mundo do vinho começou pela perspectiva da história da arte: formada pela Faculdade de História da Universidade Estatal de Moscou (MGU), aprendi a observar as coisas pela forma, pelo conteúdo e pelo rastro cultural que o ser humano deixa no tempo.',
      'Quando em 2018 descobri o universo dos vinhos vivos e artesanais, percebi que a vinificação é pura arte — exigindo compreensão profunda e vocabulário preciso.',
      'Para consolidar a base acadêmica, concluí a formação profissional na escola Enotria (Simple Group). Hoje sigo aprofundando minha expertise internacionalmente pelo programa WSET no prestigiado instituto CAVE (Centro Argentino de Vinos y Sommeliers) em Buenos Aires.',
    ],
    educationTitle: 'Formação',
    educationBadges: [
      {
        institution: 'Universidade Estatal de Moscou (MGU)',
        detail: 'Faculdade de História, especialização em História da Arte',
      },
      {
        institution: 'Escola de Vinhos «Enotria»',
        detail: 'Curso profissionalizante completo (Simple Group, Moscou)',
      },
      {
        institution: 'CAVE (Centro Argentino de Vinos y Sommeliers)',
        detail: 'Certificação internacional WSET (Buenos Aires, Argentina)',
      },
    ],
    tastingEyebrow: 'Degustações no BRUT bar',
    tastingTitle: 'Organização de degustações no BRUT bar',
    tastingHighlights: [
      {
        number: '01',
        title: 'Sala privativa para até 25 pessoas',
        description:
          'O BRUT bar conta com uma sala reservada exclusiva para degustações, acomodando até 25 convidados.',
      },
      {
        number: '02',
        title: 'Degustações curadas de todos os vinhos',
        description:
          'Degustações montadas com os vinhos de sua preferência: Malbecs, Sauvignon Blanc, Cabernet Franc, espumantes e muito mais.',
      },
      {
        number: '03',
        title: 'Individuais ou em grupo, com ou sem petiscos',
        description:
          'Atendemos tanto formatos individuais quanto grupos, com acompanhamento gastronômico ou apenas os vinhos.',
      },
    ],
    backToHome: 'Voltar ao BRUT bar',
    whatsappMessage:
      'Olá! Gostaria de reservar uma degustação com a Polina no BRUT bar.',
    form: {
      eyebrow: 'Solicitar degustação',
      title: 'Reserve sua degustação com a Polina',
      subtitle:
        'Preencha o formulário e clique em «Enviar no WhatsApp» — receberemos seus dados na hora para responder e confirmar.',
      fullNameLabel: 'Nome e sobrenome',
      fullNamePlaceholder: 'Lucas Ferreira',
      phoneLabel: 'Telefone / WhatsApp',
      phonePlaceholder: '+54 9 11 ...',
      emailLabel: 'E-mail',
      emailPlaceholder: 'lucas@exemplo.com',
      tastingLangLabel: 'Idioma da degustação',
      tastingLangOptions: [
        { id: 'ES', label: 'Espanhol' },
        { id: 'EN', label: 'Inglês' },
        { id: 'RU', label: 'Russo' },
      ],
      guestsLabel: 'Número de pessoas',
      guestsHint: 'Sala privativa com capacidade para até 25 pessoas',
      topicLabel: 'Tema da degustação',
      topicOptions: [
        { id: 'sparkling', label: 'Espumantes da Argentina' },
        { id: 'malbec', label: 'Malbecs' },
        { id: 'white', label: 'Vinhos brancos da Argentina' },
        { id: 'other', label: 'Outro' },
      ],
      customTopicLabel: 'Qual tema ou vinhos você prefere?',
      customTopicPlaceholder: 'Ex.: Cabernet Franc, pét-nats, vinhos da Patagônia...',
      dateLabel: 'Data desejada do evento',
      datePlaceholder: 'Escolha uma data (dd/mm/aaaa)',
      submitButton: 'Enviar pedido pelo WhatsApp',
      redirectNote: 'Ao clicar, o WhatsApp abrirá com sua mensagem preenchida — basta enviar.',
      validationNameError: 'Por favor, informe seu nome e sobrenome.',
      validationPhoneError: 'Por favor, informe um telefone de contato.',
      validationEmailError: 'Por favor, informe um e-mail válido.',
      validationGuestsError: 'Informe o número de pessoas (entre 1 e 25).',
      validationDateError: 'Por favor, escolha a data desejada.',
      sentStatusLabel: 'Solicitação pronta para o WhatsApp',
      sentTitle: 'Envie a mensagem e retornaremos em breve',
      sentSubtitle:
        'Abrimos o WhatsApp com os dados do formulário. Se a janela não abriu automaticamente, clique no botão abaixo.',
      openWhatsAppAgain: 'Abrir WhatsApp com o pedido',
      copyMessageButton: 'Copiar texto do pedido',
      copiedMessageButton: 'Texto copiado',
      editFormButton: 'Editar formulário',
      waHeader: 'Olá, BRUT bar! Gostaria de reservar uma degustação com a sommelier Polina Schteiner:',
      waFooter: 'Aguardo retorno com detalhes e confirmação.',
    },
  },
};
