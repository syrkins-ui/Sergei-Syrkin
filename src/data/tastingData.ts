import { Language } from './translations';

export type TastingFormatId = 'solo' | 'pair_shared' | 'pair_duel';

export interface TastingStep {
  number: string;
  title: string;
  description: string;
}

export interface TastingFormatOption {
  id: TastingFormatId;
  title: string;
  subtitle: string;
  priceUsd: number;
  detail: string;
}

export interface BlindTastingContent {
  backToHome: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroCaption: string;
  priceLabel: string;
  priceValue: string;
  priceNote: string;
  pairingLabel: string;
  pairingValue: string;
  pairingNote: string;
  bonusLabel: string;
  bonusValue: string;
  bonusNote: string;
  ctaBookNow: string;
  ctaWhatsApp: string;
  whatsappInquiryMessage: string;
  howTitle: string;
  howSubtitle: string;
  steps: TastingStep[];
  riddlesSpotlightTitle: string;
  riddlesSpotlightText: string;
  pairingSpotlightTitle: string;
  pairingSpotlightText: string;
  bonusSpotlightTitle: string;
  bonusSpotlightText: string;
  formEyebrow: string;
  formTitle: string;
  formSubtitle: string;
  formatLabel: string;
  formats: TastingFormatOption[];
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  dateLabel: string;
  timeLabel: string;
  closedDaysNote: string;
  selectedDayHoursLabel: string;
  lastSlotNote: string;
  noSlotsLeftToday: string;
  notesLabel: string;
  notesPlaceholder: string;
  hoursHint: string;
  totalLabel: string;
  payAtBarNote: string;
  submitButton: string;
  whatsappRedirectNote: string;
  validationNameError: string;
  validationPhoneError: string;
  validationSlotError: string;
  // Post-submit confirmation state
  sentStatusLabel: string;
  sentTitle: string;
  sentSubtitle: string;
  summaryGuestLabel: string;
  summaryFormatLabel: string;
  summaryDateTimeLabel: string;
  summaryAmountLabel: string;
  summaryNotesLabel: string;
  openWhatsAppAgain: string;
  copyMessageButton: string;
  copiedMessageButton: string;
  editBookingButton: string;
  // WhatsApp booking message labels
  waMessageHeader: string;
  waMessageFooter: string;
  // Home showcase block
  homeEyebrow: string;
  homeTitle: string;
  homeSubtitle: string;
  homeCta: string;
}

export const BLIND_TASTING_DATA: Record<Language, BlindTastingContent> = {
  RU: {
    backToHome: 'Назад в BRUT bar',
    eyebrow: 'Слепая дегустация · Одиночная и парная',
    title: 'Угадай 4 игристых — получи 5-й бокал в подарок',
    subtitle:
      'Подаём 4 разных аргентинских игристых на подносе с карточками-загадками и тарелочкой сыра с хамоном. Попробуйте, прочитайте подсказки и верно расставьте бокалы. Угадаете все четыре — нальём пятый бонусный бокал того игристого, которое понравилось больше всего.',
    heroCaption: '4 игристых вслепую · карточки с загадками · сыр и хамон',
    priceLabel: 'Стоимость сета',
    priceValue: '$39 USD',
    priceNote: '4 бокала разных игристых + карточки с загадками',
    pairingLabel: 'Включено к подаче',
    pairingValue: 'Сыр и хамон',
    pairingNote: 'Небольшая гастрономическая тарелочка к подносу',
    bonusLabel: 'Приз за точность',
    bonusValue: '+5-й бокал',
    bonusNote: 'Подарочный бокал самого понравившегося игристого',
    ctaBookNow: 'Забронировать дегустацию',
    ctaWhatsApp: 'Узнать подробности в WhatsApp',
    whatsappInquiryMessage:
      'Здравствуйте, BRUT bar! Хочу узнать подробности про слепую дегустацию 4 игристых за $39 (одиночную или парную).',
    howTitle: 'Как проходит игра',
    howSubtitle: 'Никаких скучных лекций — только вкус, интуиция и азарт.',
    steps: [
      {
        number: '01',
        title: 'Поднос с 4 бокалами и загадками',
        description:
          'Вы получаете 4 разных аргентинских игристых без этикеток, карточки с загадками и тарелочку выдержанного сыра с хамоном.',
      },
      {
        number: '02',
        title: 'Пробуете и расставляете по местам',
        description:
          'Читаете подсказки на карточках, сравниваете аромат и вкус каждого бокала и распределяете, где какое игристое — в одиночку или вдвоём.',
      },
      {
        number: '03',
        title: 'Пятый бокал в подарок',
        description:
          'Сомелье проверяет ваши ответы. Если все 4 игристых угаданы верно, мы дарим 5-й бонусный бокал того вина из сета, которое покорило вас больше всего.',
      },
    ],
    riddlesSpotlightTitle: 'Карточки с загадками и конверт BRUT',
    riddlesSpotlightText:
      'Внутри перевязанного алой лентой набора — карточки с подсказками о каждом вине, а правильные ответы ждут вас в запечатанном конверте.',
    pairingSpotlightTitle: 'Подача с тарелочкой сыра и хамона',
    pairingSpotlightText:
      'К каждому дегустационному подносу мы подаём аккуратную тарелочку выдержанного сыра и тонко нарезанного хамона, чтобы освежать рецепторы между бокалами.',
    bonusSpotlightTitle: 'Идеально для свидания или вечера с собой',
    bonusSpotlightText:
      'Можно пройти игру в одиночку, разгадывать один поднос вдвоём или устроить парную дуэль на двух подносах — чей вкус окажется точнее.',
    formEyebrow: 'Бронирование через WhatsApp',
    formTitle: 'Забронировать дегустацию',
    formSubtitle:
      'Выберите удобный день и время работы бара, заполните анкету и нажмите «Забронировать» — заявка сразу откроется в WhatsApp, и мы ответим с подтверждением.',
    formatLabel: 'Формат дегустации',
    formats: [
      {
        id: 'solo',
        title: 'Одиночная',
        subtitle: '1 гость · 1 поднос · 4 бокала + сыр и хамон',
        priceUsd: 39,
        detail: '1 сет · +5-й бокал за верный ответ',
      },
      {
        id: 'pair_shared',
        title: 'Парная (1 сет на двоих)',
        subtitle: '2 гостя · 1 общий поднос · 4 бокала + сыр и хамон',
        priceUsd: 39,
        detail: 'Делите 4 бокала и разгадываете вместе',
      },
      {
        id: 'pair_duel',
        title: 'Парная дуэль (2 сета)',
        subtitle: '2 гостя · 2 подноса · 8 бокалов + 2 тарелочки',
        priceUsd: 78,
        detail: 'У каждого своя игра и шанс на 5-й бокал',
      },
    ],
    nameLabel: 'Ваше имя',
    namePlaceholder: 'Анна Соколова',
    phoneLabel: 'Телефон / WhatsApp',
    phonePlaceholder: '+54 9 11 ...',
    dateLabel: 'Выберите дату (дни работы бара)',
    timeLabel: 'Доступное время прихода',
    closedDaysNote: 'Пн и Вт — бар закрыт (даты недоступны)',
    selectedDayHoursLabel: 'Часы работы в выбранный день',
    lastSlotNote: 'Последний старт дегустации — за 1 час до закрытия бара.',
    noSlotsLeftToday: 'На сегодня свободных слотов уже нет — выберите ближайший открытый день.',
    notesLabel: 'Комментарий или пожелания (необязательно)',
    notesPlaceholder: 'Например: карточки на русском, празднуем годовщину...',
    hoursHint: 'Ср–Чт 15:00–22:00 · Пт–Сб 14:00–00:00 · Вс 14:00–22:00 (Пн–Вт выходной)',
    totalLabel: 'Стоимость в баре',
    payAtBarNote: 'Оплата на месте после подтверждения брони',
    submitButton: 'Забронировать в WhatsApp',
    whatsappRedirectNote: 'Все данные из анкеты автоматически подставятся в сообщение WhatsApp — просто нажмите «Отправить».',
    validationNameError: 'Пожалуйста, укажите ваше имя (минимум 2 символа).',
    validationPhoneError: 'Пожалуйста, укажите номер телефона или WhatsApp для связи.',
    validationSlotError: 'Пожалуйста, выберите доступную дату и время в часы работы бара.',
    sentStatusLabel: 'Заявка сформирована для WhatsApp',
    sentTitle: 'Отправьте сообщение — мы ответим и подтвердим бронь',
    sentSubtitle:
      'Мы открыли чат WhatsApp с заполненной анкетой. Если окно не открылось автоматически, нажмите кнопку ниже.',
    summaryGuestLabel: 'Гость',
    summaryFormatLabel: 'Формат',
    summaryDateTimeLabel: 'Дата и время',
    summaryAmountLabel: 'Стоимость',
    summaryNotesLabel: 'Комментарий',
    openWhatsAppAgain: 'Открыть WhatsApp с заявкой',
    copyMessageButton: 'Скопировать текст заявки',
    copiedMessageButton: 'Текст скопирован',
    editBookingButton: 'Изменить анкету',
    waMessageHeader: 'Здравствуйте, BRUT bar! Хочу забронировать слепую дегустацию игристых:',
    waMessageFooter: 'Подтвердите, пожалуйста, бронь на это время.',
    homeEyebrow: 'Слепая дегустация · $39 USD',
    homeTitle: '4 игристых, загадки и 5-й бокал в подарок',
    homeSubtitle:
      'Одиночная или парная игра вслепую: 4 бокала на подносе с карточками-загадками, тарелочка сыра с хамоном и бонусный бокал за верный ответ.',
    homeCta: 'Подробнее и бронь',
  },

  ES: {
    backToHome: 'Volver a BRUT bar',
    eyebrow: 'Cata a ciegas · Individual o en pareja',
    title: 'Adiviná 4 espumantes y ganá la 5ª copa de regalo',
    subtitle:
      'Te servimos 4 espumantes argentinos distintos en una bandeja con tarjetas de acertijos y un platito de queso y jamón crudo. Probá, leé las pistas y ordená cada copa. Si acertás las cuatro, te regalamos una quinta copa de tu espumante favorito.',
    heroCaption: '4 espumantes a ciegas · tarjetas con acertijos · queso y jamón',
    priceLabel: 'Valor del set',
    priceValue: 'USD 39',
    priceNote: '4 copas de distintos espumantes + tarjetas con pistas',
    pairingLabel: 'Incluye maridaje',
    pairingValue: 'Queso y jamón',
    pairingNote: 'Platito artesanal para acompañar la bandeja',
    bonusLabel: 'Premio al acertar',
    bonusValue: '+5ª copa gratis',
    bonusNote: 'Copa extra de regalo del espumante que más te gustó',
    ctaBookNow: 'Reservar degustación',
    ctaWhatsApp: 'Consultar por WhatsApp',
    whatsappInquiryMessage:
      '¡Hola, BRUT bar! Quiero conocer más detalles sobre la cata a ciegas de 4 espumantes por USD 39 (individual o en pareja).',
    howTitle: 'Cómo funciona el juego',
    howSubtitle: 'Sin clases aburridas: solo burbujas, intuición y juego.',
    steps: [
      {
        number: '01',
        title: 'Bandeja con 4 copas y acertijos',
        description:
          'Recibís 4 espumantes argentinos sin etiqueta sobre una bandeja, sus tarjetas con pistas y un platito de queso estacionado y jamón crudo.',
      },
      {
        number: '02',
        title: 'Probá y ubicá cada espumante',
        description:
          'Leé las pistas, compará aromas y burbujas y asigná qué vino está en cada copa — solo o en pareja.',
      },
      {
        number: '03',
        title: 'Quinta copa de regalo',
        description:
          'Verificamos tu orden. Si ubicaste los 4 correctamente, te servimos una 5ª copa bonificada del espumante que más te enamoró.',
      },
    ],
    riddlesSpotlightTitle: 'Tarjetas con pistas y sobre BRUT',
    riddlesSpotlightText:
      'El set atado con cinta roja trae las pistas sensoriales de cada espumante, mientras las respuestas exactas esperan dentro del sobre.',
    pairingSpotlightTitle: 'Con platito de queso y jamón incluido',
    pairingSpotlightText:
      'Cada bandeja sale acompañada de queso artesanal y jamón crudo feteado fino para limpiar el paladar entre copa y copa.',
    bonusSpotlightTitle: 'Ideal para una cita o para disfrutar a tu ritmo',
    bonusSpotlightText:
      'Podés hacer la experiencia individual, compartir una bandeja de a dos o jugar un duelo en pareja con dos bandejas completas.',
    formEyebrow: 'Reserva por WhatsApp',
    formTitle: 'Reservá tu cata a ciegas',
    formSubtitle:
      'Elegí fecha y horario dentro de nuestros días de apertura, completá tus datos y tocá «Reservar» — te enviaremos directo a WhatsApp para confirmarte la mesa.',
    formatLabel: 'Elegí tu modalidad',
    formats: [
      {
        id: 'solo',
        title: 'Individual',
        subtitle: '1 persona · 1 bandeja · 4 copas + queso y jamón',
        priceUsd: 39,
        detail: '1 set · +5ª copa si acertás',
      },
      {
        id: 'pair_shared',
        title: 'En pareja (1 bandeja compartida)',
        subtitle: '2 personas · 1 bandeja · 4 copas + queso y jamón',
        priceUsd: 39,
        detail: 'Comparten las 4 copas y resuelven juntos',
      },
      {
        id: 'pair_duel',
        title: 'Duelo en pareja (2 sets)',
        subtitle: '2 personas · 2 bandejas · 8 copas + 2 platitos',
        priceUsd: 78,
        detail: 'Cada uno juega su bandeja por su 5ª copa',
      },
    ],
    nameLabel: 'Tu nombre',
    namePlaceholder: 'Sofía Martínez',
    phoneLabel: 'WhatsApp / Teléfono',
    phonePlaceholder: '+54 9 11 ...',
    dateLabel: 'Elegí fecha (días de apertura)',
    timeLabel: 'Horarios disponibles',
    closedDaysNote: 'Lunes y martes cerrado (no disponibles)',
    selectedDayHoursLabel: 'Horario del bar ese día',
    lastSlotNote: 'Último turno disponible: 1 hora antes del cierre.',
    noSlotsLeftToday: 'Ya no quedan turnos disponibles hoy — elegí el próximo día abierto.',
    notesLabel: 'Comentarios (opcional)',
    notesPlaceholder: 'Ej.: aniversario, idioma de las tarjetas, preferencias...',
    hoursHint: 'Mié–Jue 15:00–22:00 · Vie–Sáb 14:00–00:00 · Dom 14:00–22:00 (Lun–Mar cerrado)',
    totalLabel: 'Valor en el bar',
    payAtBarNote: 'Abonás al confirmar o en el bar',
    submitButton: 'Reservar por WhatsApp',
    whatsappRedirectNote: 'Todos los datos del formulario se cargan automáticamente en el mensaje de WhatsApp.',
    validationNameError: 'Por favor, ingresá tu nombre (mínimo 2 caracteres).',
    validationPhoneError: 'Por favor, ingresá tu número de teléfono o WhatsApp.',
    validationSlotError: 'Por favor, elegí una fecha y un horario disponible del bar.',
    sentStatusLabel: 'Solicitud lista para WhatsApp',
    sentTitle: 'Enviá el mensaje y te confirmamos la reserva',
    sentSubtitle:
      'Abrimos WhatsApp con todos los datos de tu reserva. Si no se abrió automáticamente, tocá el botón de abajo.',
    summaryGuestLabel: 'Invitado',
    summaryFormatLabel: 'Modalidad',
    summaryDateTimeLabel: 'Fecha y hora',
    summaryAmountLabel: 'Valor',
    summaryNotesLabel: 'Comentarios',
    openWhatsAppAgain: 'Abrir WhatsApp con mi reserva',
    copyMessageButton: 'Copiar texto de la reserva',
    copiedMessageButton: 'Texto copiado',
    editBookingButton: 'Editar datos',
    waMessageHeader: '¡Hola, BRUT bar! Quiero reservar la cata a ciegas de espumantes:',
    waMessageFooter: '¿Me confirman si tienen disponibilidad en ese horario?',
    homeEyebrow: 'Cata a ciegas · USD 39',
    homeTitle: '4 espumantes, acertijos y la 5ª copa de regalo',
    homeSubtitle:
      'Experiencia individual o en pareja: 4 copas en bandeja con tarjetas de pistas, platito de queso y jamón, y una copa bonus si acertás.',
    homeCta: 'Ver detalles y reservar',
  },

  PT: {
    backToHome: 'Voltar ao BRUT bar',
    eyebrow: 'Degustação às cegas · Individual ou em dupla',
    title: 'Adivinhe 4 espumantes e ganhe a 5ª taça de presente',
    subtitle:
      'Servimos 4 espumantes argentinos diferentes em uma bandeja com cartões de enigmas e um pratinho de queijo e jamón. Prove, leia as pistas e identifique cada taça. Acertando as quatro, você ganha uma quinta taça do seu espumante favorito.',
    heroCaption: '4 espumantes às cegas · cartões com enigmas · queijo e jamón',
    priceLabel: 'Valor do set',
    priceValue: 'US$ 39',
    priceNote: '4 taças de espumantes diferentes + cartões de pistas',
    pairingLabel: 'Acompanha',
    pairingValue: 'Queijo e jamón',
    pairingNote: 'Pratinho artesanal servido junto com a bandeja',
    bonusLabel: 'Prêmio',
    bonusValue: '+5ª taça grátis',
    bonusNote: 'Taça bônus do espumante que você mais gostou',
    ctaBookNow: 'Reservar degustação',
    ctaWhatsApp: 'Tirar dúvidas no WhatsApp',
    whatsappInquiryMessage:
      'Olá, BRUT bar! Quero saber mais detalhes sobre a degustação às cegas de 4 espumantes por US$ 39 (individual ou em dupla).',
    howTitle: 'Como funciona o desafio',
    howSubtitle: 'Sem palestras longas — apenas sabor, intuição e diversão.',
    steps: [
      {
        number: '01',
        title: 'Bandeja com 4 taças e enigmas',
        description:
          'Você recebe 4 espumantes argentinos sem rótulo na bandeja, cartões com enigmas e um pratinho de queijo curado e jamón.',
      },
      {
        number: '02',
        title: 'Prove e descubra qual é qual',
        description:
          'Leia as pistas, compare os aromas e distribua cada taça no seu lugar — sozinho ou em dupla.',
      },
      {
        number: '03',
        title: 'Quinta taça de presente',
        description:
          'Conferimos suas respostas. Acertando os 4, servimos uma 5ª taça cortesia do espumante que você mais curtiu.',
      },
    ],
    riddlesSpotlightTitle: 'Cartões com enigmas e envelope BRUT',
    riddlesSpotlightText:
      'O kit amarrado com fita vermelha traz pistas sensoriais de cada rótulo, enquanto as respostas corretas ficam guardadas no envelope.',
    pairingSpotlightTitle: 'Servido com pratinho de queijo e jamón',
    pairingSpotlightText:
      'Cada bandeja acompanha queijo curado e fatias finas de jamón para harmonizar e limpar o paladar entre as taças.',
    bonusSpotlightTitle: 'Perfeito para um encontro ou momento especial',
    bonusSpotlightText:
      'Jogue individualmente, compartilhe uma bandeja a dois ou faça um duelo em casal com duas bandejas completas.',
    formEyebrow: 'Reserva pelo WhatsApp',
    formTitle: 'Reserve sua degustação',
    formSubtitle:
      'Escolha um dia e horário de funcionamento do bar, preencha seus dados e clique em «Reservar» — enviaremos tudo para o nosso WhatsApp para confirmar.',
    formatLabel: 'Escolha o formato',
    formats: [
      {
        id: 'solo',
        title: 'Individual',
        subtitle: '1 pessoa · 1 bandeja · 4 taças + queijo e jamón',
        priceUsd: 39,
        detail: '1 set · +5ª taça se acertar',
      },
      {
        id: 'pair_shared',
        title: 'Em dupla (1 set compartilhado)',
        subtitle: '2 pessoas · 1 bandeja · 4 taças + queijo e jamón',
        priceUsd: 39,
        detail: 'Compartilham as 4 taças e resolvem juntos',
      },
      {
        id: 'pair_duel',
        title: 'Duelo em dupla (2 sets)',
        subtitle: '2 pessoas · 2 bandejas · 8 taças + 2 pratinhos',
        priceUsd: 78,
        detail: 'Cada um joga sua bandeja pela 5ª taça',
      },
    ],
    nameLabel: 'Seu nome',
    namePlaceholder: 'Lucas Ferreira',
    phoneLabel: 'WhatsApp / Telefone',
    phonePlaceholder: '+54 9 11 ...',
    dateLabel: 'Escolha a data (dias de funcionamento)',
    timeLabel: 'Horários disponíveis',
    closedDaysNote: 'Segunda e terça fechado (indisponíveis)',
    selectedDayHoursLabel: 'Horário do bar neste dia',
    lastSlotNote: 'Último horário para início: 1 hora antes do fechamento.',
    noSlotsLeftToday: 'Não há mais horários disponíveis hoje — escolha o próximo dia aberto.',
    notesLabel: 'Observações (opcional)',
    notesPlaceholder: 'Ex.: aniversário, restrições alimentares...',
    hoursHint: 'Qua–Qui 15:00–22:00 · Sex–Sáb 14:00–00:00 · Dom 14:00–22:00 (Seg–Ter fechado)',
    totalLabel: 'Valor no bar',
    payAtBarNote: 'Pagamento no bar após a confirmação',
    submitButton: 'Reservar no WhatsApp',
    whatsappRedirectNote: 'Todos os dados preenchidos serão enviados automaticamente para o nosso WhatsApp.',
    validationNameError: 'Por favor, informe seu nome (mínimo 2 caracteres).',
    validationPhoneError: 'Por favor, informe seu número de telefone ou WhatsApp.',
    validationSlotError: 'Por favor, escolha uma data e um horário dentro do expediente do bar.',
    sentStatusLabel: 'Pedido pronto para o WhatsApp',
    sentTitle: 'Envie a mensagem e confirmaremos sua reserva',
    sentSubtitle:
      'Abrimos o WhatsApp com os dados da sua reserva. Se a janela não abriu automaticamente, clique no botão abaixo.',
    summaryGuestLabel: 'Convidado',
    summaryFormatLabel: 'Formato',
    summaryDateTimeLabel: 'Data e horário',
    summaryAmountLabel: 'Valor',
    summaryNotesLabel: 'Observações',
    openWhatsAppAgain: 'Abrir WhatsApp com minha reserva',
    copyMessageButton: 'Copiar texto da reserva',
    copiedMessageButton: 'Texto copiado',
    editBookingButton: 'Editar dados',
    waMessageHeader: 'Olá, BRUT bar! Gostaria de reservar a degustação às cegas de espumantes:',
    waMessageFooter: 'Podem confirmar a disponibilidade para esse horário?',
    homeEyebrow: 'Degustação às cegas · US$ 39',
    homeTitle: '4 espumantes, enigmas e a 5ª taça de presente',
    homeSubtitle:
      'Jogo individual ou em dupla: 4 taças na bandeja com cartões de pistas, pratinho de queijo com jamón e taça bônus se acertar.',
    homeCta: 'Ver detalhes e reservar',
  },

  EN: {
    backToHome: 'Back to BRUT bar',
    eyebrow: 'Blind Tasting · Solo or Pair',
    title: 'Match 4 sparkling wines — win a 5th glass on us',
    subtitle:
      'Enjoy 4 distinct Argentine sparkling wines served on a flight tray with riddle cards and a small plate of artisan cheese and cured jamón. Read the clues, taste, and match each glass. Get all four right and receive a complimentary 5th bonus glass of your favorite.',
    heroCaption: '4 blind sparkling wines · riddle cards · cheese & jamón',
    priceLabel: 'Flight price',
    priceValue: '$39 USD',
    priceNote: '4 different sparkling glasses + printed riddle cards',
    pairingLabel: 'Served with',
    pairingValue: 'Cheese & Jamón',
    pairingNote: 'Small artisan pairing plate included with every tray',
    bonusLabel: 'Winner’s reward',
    bonusValue: '+5th glass free',
    bonusNote: 'Bonus glass of whichever wine you loved most',
    ctaBookNow: 'Book your tasting',
    ctaWhatsApp: 'Ask on WhatsApp',
    whatsappInquiryMessage:
      'Hi BRUT bar! I would love more details about the $39 blind tasting of 4 sparkling wines (solo or pair).',
    howTitle: 'How the blind flight works',
    howSubtitle: 'No stiff lectures—just bubbles, clues, and intuition.',
    steps: [
      {
        number: '01',
        title: 'A flight tray of 4 glasses & clues',
        description:
          'Receive 4 unlabeled Argentine sparkling wines on a silver tray alongside riddle cards and a small plate of aged cheese and thinly sliced jamón.',
      },
      {
        number: '02',
        title: 'Taste, compare & match',
        description:
          'Read each riddle, compare aromas and texture across the four glasses, and place every wine in its rightful spot—solo or together.',
      },
      {
        number: '03',
        title: 'Claim your 5th bonus glass',
        description:
          'Our team reveals the answers. Match all four correctly and we pour a complimentary 5th glass of your favorite sparkling wine from the flight.',
      },
    ],
    riddlesSpotlightTitle: 'Riddle cards & sealed BRUT envelope',
    riddlesSpotlightText:
      'Tied with a crimson satin ribbon, each card offers playful sensory clues while the official answers wait inside the kraft envelope.',
    pairingSpotlightTitle: 'Paired with artisan cheese & jamón',
    pairingSpotlightText:
      'Every tasting tray arrives with a small plate of aged cheese and cured jamón to refresh your palate between glasses.',
    bonusSpotlightTitle: 'Made for date nights or curious solo explorers',
    bonusSpotlightText:
      'Play solo, share one flight tray as a pair, or turn it into a friendly two-tray tasting duel.',
    formEyebrow: 'Book via WhatsApp',
    formTitle: 'Book your blind tasting',
    formSubtitle:
      'Pick a date and time during our opening hours, fill in your details, and click “Book via WhatsApp”—your request goes straight to our team for confirmation.',
    formatLabel: 'Select tasting format',
    formats: [
      {
        id: 'solo',
        title: 'Solo Flight',
        subtitle: '1 guest · 1 tray · 4 glasses + cheese & jamón',
        priceUsd: 39,
        detail: '1 set · +5th bonus glass if matched',
      },
      {
        id: 'pair_shared',
        title: 'Pair (1 shared tray)',
        subtitle: '2 guests · 1 shared tray · 4 glasses + cheese & jamón',
        priceUsd: 39,
        detail: 'Share 4 glasses & solve together',
      },
      {
        id: 'pair_duel',
        title: 'Pair Duel (2 trays)',
        subtitle: '2 guests · 2 trays · 8 glasses + 2 plates',
        priceUsd: 78,
        detail: 'Two full games & two bonus-glass chances',
      },
    ],
    nameLabel: 'Full name',
    namePlaceholder: 'Clara Vance',
    phoneLabel: 'WhatsApp / Phone',
    phonePlaceholder: '+54 9 11 ...',
    dateLabel: 'Choose a date (bar open days)',
    timeLabel: 'Available arrival times',
    closedDaysNote: 'Closed Monday & Tuesday (unavailable)',
    selectedDayHoursLabel: 'Bar hours on this day',
    lastSlotNote: 'Last tasting start is 1 hour before closing.',
    noSlotsLeftToday: 'No more slots left for today — please choose the next open day.',
    notesLabel: 'Notes (optional)',
    notesPlaceholder: 'e.g. anniversary, card language, dietary notes...',
    hoursHint: 'Wed–Thu 15:00–22:00 · Fri–Sat 14:00–00:00 · Sun 14:00–22:00 (Mon–Tue closed)',
    totalLabel: 'Price at the bar',
    payAtBarNote: 'Pay at the bar once confirmed',
    submitButton: 'Book via WhatsApp',
    whatsappRedirectNote: 'All form details are pre-filled into a WhatsApp message to our bar—just hit Send.',
    validationNameError: 'Please enter your name (at least 2 characters).',
    validationPhoneError: 'Please enter your phone or WhatsApp number.',
    validationSlotError: 'Please select an available date and time within opening hours.',
    sentStatusLabel: 'Ready to send on WhatsApp',
    sentTitle: 'Send the message and we will confirm your table',
    sentSubtitle:
      'We opened WhatsApp with your booking details pre-filled. If the window did not open automatically, click the button below.',
    summaryGuestLabel: 'Guest',
    summaryFormatLabel: 'Format',
    summaryDateTimeLabel: 'Date & time',
    summaryAmountLabel: 'Price',
    summaryNotesLabel: 'Notes',
    openWhatsAppAgain: 'Open WhatsApp with booking',
    copyMessageButton: 'Copy booking message',
    copiedMessageButton: 'Message copied',
    editBookingButton: 'Edit booking',
    waMessageHeader: 'Hi BRUT bar! I would like to book the blind sparkling wine tasting:',
    waMessageFooter: 'Please confirm if this date and time are available.',
    homeEyebrow: 'Blind Tasting · $39 USD',
    homeTitle: '4 sparkling wines, riddles & a 5th glass free',
    homeSubtitle:
      'Solo or pair blind tasting game: 4 glasses on a flight tray with riddle cards, cheese & jamón plate, and a bonus 5th glass if you solve it.',
    homeCta: 'Explore & book',
  },
};
