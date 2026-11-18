import { Language } from './translations';

export interface PhilosophyPillar {
  title: string;
  description: string;
}

export interface ProjectItem {
  tag: string;
  title: string;
  description: string;
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
  philosophyTitle: string;
  philosophySubtitle: string;
  philosophyPillars: PhilosophyPillar[];
  experienceTitle: string;
  experienceSubtitle: string;
  projects: ProjectItem[];
  ctaHeading: string;
  ctaText: string;
  ctaButtonWhatsApp: string;
  backToHome: string;
  pageTitleBadge: string;
  whatsappMessage: string;
}

export const SOMMELIER_DATA: Record<Language, SommelierProfile> = {
  RU: {
    pageTitleBadge: 'Шеф-сомелье BRUT bar',
    name: 'Полина Штайнер',
    roles: ['Сомелье', 'Искусствовед', 'Винный скаут'],
    roleSubtitle: 'Сомелье, искусствовед, винный скаут',
    quote: '«Вино — это самое честное послание сквозь пространство и время. Каждая бутылка хранит в себе решения людей, характер земли и контекст эпохи. Моя задача — помочь вам расшифровать этот язык и услышать его историю».',
    aboutTitle: 'Обо мне',
    aboutParagraphs: [
      'Мой путь в мир вина начался с оптики искусствоведа: окончив исторический факультет МГУ, я привыкла смотреть на вещи через форму, содержание и культурный след, который человек оставляет во времени.',
      'Когда в 2018 году я впервые столкнулась с миром живого ремесленного вина, я поняла, что виноделие — это такое же чистое искусство, требующее фундаментального понимания и точного языка.',
      'За академической базой я пошла в московскую школу «Энотрия» (Simple Group), пройдя полный курс. Сегодня я продолжаю углублять экспертизу на международном уровне, обучаясь по программе WSET в институте CAVE (Centro Argentino de Vinos y Sommeliers) в Буэнос-Айресе.'
    ],
    educationTitle: 'Академическая база',
    educationBadges: [
      {
        institution: 'МГУ им. М.В. Ломоносова',
        detail: 'Исторический факультет, отделение истории искусств'
      },
      {
        institution: 'Винная школа «Энотрия»',
        detail: 'Полный профессиональный курс (Simple Group, Москва)'
      },
      {
        institution: 'CAVE (Centro Argentino de Vinos y Sommeliers)',
        detail: 'Международная программа WSET (Буэнос-Айрес, Аргентина)'
      }
    ],
    philosophyTitle: 'Фокус и винная философия',
    philosophySubtitle: 'Три фундаментальных принципа работы с вином и гостями',
    philosophyPillars: [
      {
        title: 'Вино как драматургия и сторителлинг',
        description: 'Я не провожу сухих лекций с заученными терминами. Каждая дегустация строится как сценарий: мы учимся чувствовать нюансы, формулировать личные впечатления и понимать, какую мысль автор вложил в бокал.'
      },
      {
        title: 'Другая Аргентина: тонкость, а не клише',
        description: 'Вопреки стереотипам о тяжелых, дубовых и приторных винах, я исследую и открываю элегантную сторону аргентинского терруара: тонкие европейские профили, гаражные хозяйства и смелые эксперименты.'
      },
      {
        title: 'Биодинамика и натуральные практики',
        description: 'Особый интерес для меня представляют живые, низкоинтервенционные, органические и биодинамические вина — честные терруарные истории, в которых нет маскировки.'
      }
    ],
    experienceTitle: 'Опыт и проекты',
    experienceSubtitle: 'Практическая экспертиза в Аргентине и за её пределами',
    projects: [
      {
        tag: '3+ года в Аргентине',
        title: 'Винная практика в Буэнос-Айресе',
        description: 'Сотни камерных и публичных дегустаций, винных лекций, мастер-классов и закрытых клубов ценителей.'
      },
      {
        tag: 'Образование',
        title: 'Винная школа «Luz del Vino»',
        description: 'Сооснователь образовательного проекта (3 выпущенных потока), охватившего историю, технологии и органолептику аргентинского виноделия.'
      },
      {
        tag: 'Экспедиции',
        title: 'Авторские туры в Мендосу',
        description: 'Организация и экспертное кураторство эксклюзивных поездок по закрытым бутиковым и ремесленным бодегам.'
      },
      {
        tag: 'Консьерж-сервис',
        title: 'Wine Scouting & погреба под ключ',
        description: 'Персональный поиск редких вин, составление частных коллекций, комплектование винных погребов и закупка для ценителей.'
      }
    ],
    ctaHeading: 'Запланировать встречу или дегустацию',
    ctaText: 'Полина проводит камерные дегустации в BRUT bar, помогает с подбором вин для особых событий и консультирует частных коллекционеров.',
    ctaButtonWhatsApp: 'Написать Полине в WhatsApp',
    backToHome: 'Назад в BRUT bar',
    whatsappMessage: 'Здравствуйте, Полина! Я хочу записаться на дегустацию / проконсультироваться по винам в BRUT bar.'
  },

  ES: {
    pageTitleBadge: 'Head Sommelier • BRUT bar',
    name: 'Polina Schteiner',
    roles: ['Sommelier', 'Historiadora del Arte', 'Wine Scout'],
    roleSubtitle: 'Sommelier, historiadora del arte, wine scout',
    quote: '«El vino es el mensaje más honesto a través del espacio y del tiempo. Cada botella guarda las decisiones de quienes la crearon, el carácter de la tierra y el contexto de su época. Mi misión es ayudarte a descifrar ese lenguaje y escuchar su historia».',
    aboutTitle: 'Sobre mí',
    aboutParagraphs: [
      'Mi camino en el mundo del vino comenzó desde la mirada de la historia del arte: egresada de la Facultad de Historia de la Universidad Estatal de Moscú (MGU), aprendí a observar las cosas a través de su forma, su contenido y la huella cultural que el ser humano deja en el tiempo.',
      'Cuando en 2018 descubrí el universo de los vinos vivos y artesanales, comprendí que la vitivinicultura es un arte puro, que exige comprensión fundamental y un lenguaje preciso.',
      'Para construir mi base académica, completé el curso integral en la prestigiosa escuela moscovita Enotria (Simple Group). Hoy continúo profundizando mi expertise a nivel internacional, formándome bajo el programa WSET en el reconocido instituto CAVE (Centro Argentino de Vinos y Sommeliers) en Buenos Aires.'
    ],
    educationTitle: 'Formación académica',
    educationBadges: [
      {
        institution: 'Universidad Estatal de Moscú (MGU)',
        detail: 'Facultad de Historia, orientación en Historia del Arte'
      },
      {
        institution: 'Escuela de Vinos «Enotria»',
        detail: 'Curso profesional integral (Simple Group, Moscú)'
      },
      {
        institution: 'CAVE (Centro Argentino de Vinos y Sommeliers)',
        detail: 'Certificación internacional WSET (Buenos Aires, Argentina)'
      }
    ],
    philosophyTitle: 'Enfoque y filosofía del vino',
    philosophySubtitle: 'Tres pilares que guían cada copa y cada experiencia',
    philosophyPillars: [
      {
        title: 'El vino como dramaturgia y narrativa',
        description: 'No doy clases teóricas impersonales ni dicto términos aprendidos de memoria. Cada degustación se diseña como una dramaturgia: aprendemos a percibir los matices, formular sensaciones propias y comprender qué idea plasmó el autor en cada copa.'
      },
      {
        title: 'La otra Argentina: sutileza antes que clichés',
        description: 'Lejos de los estereotipos de vinos densos, maderosos y pesados, exploro y descubro la faceta más elegante del terruño argentino: perfiles sutiles de estirpe europea, proyectos de garage y experimentos audaces.'
      },
      {
        title: 'Biodinámica y prácticas naturales',
        description: 'Siento una fascinación especial por los vinos vivos, de mínima intervención, orgánicos y biodinámicos: relatos terruñeros genuinos, donde nada se disfraza.'
      }
    ],
    experienceTitle: 'Experiencia y proyectos',
    experienceSubtitle: 'Trayectoria enológica activa en Argentina',
    projects: [
      {
        tag: '+3 años en Argentina',
        title: 'Práctica profesional en Buenos Aires',
        description: 'Cientos de catas íntimas y públicas, charlas, masterclasses y clubes de vino a puertas cerradas.'
      },
      {
        tag: 'Educación',
        title: 'Escuela de vinos «Luz del Vino»',
        description: 'Cofundadora del proyecto formativo (3 promociones graduadas), abarcando historia, procesos y cata analítica del vino argentino.'
      },
      {
        tag: 'Viajes de autor',
        title: 'Expediciones exclusivas a Mendoza',
        description: 'Organización y curaduría experta de visitas a bodegas boutique y proyectos artesanales de pequeña escala.'
      },
      {
        tag: 'Curaduría privada',
        title: 'Wine Scouting y cavas a medida',
        description: 'Búsqueda personalizada de etiquetas singulares, armado de colecciones privadas y adquisiciones directas para amantes del vino.'
      }
    ],
    ctaHeading: 'Coordinar una cata o consulta privada',
    ctaText: 'Polina diseña experiencias guiadas en BRUT bar, asesora cartas para ocasiones especiales y acompaña a coleccionistas privados.',
    ctaButtonWhatsApp: 'Contactar a Polina por WhatsApp',
    backToHome: 'Volver a BRUT bar',
    whatsappMessage: '¡Hola, Polina! Me gustaría coordinar una degustación privada / consulta de vinos en BRUT bar.'
  },

  EN: {
    pageTitleBadge: 'Head Sommelier • BRUT bar',
    name: 'Polina Schteiner',
    roles: ['Sommelier', 'Art Historian', 'Wine Scout'],
    roleSubtitle: 'Sommelier, art historian, wine scout',
    quote: '“Wine is the most honest message across space and time. Every bottle holds the decisions of its makers, the character of the soil, and the context of its era. My mission is to help you decipher this language and hear its story.”',
    aboutTitle: 'About me',
    aboutParagraphs: [
      'My journey into wine began through the lens of an art historian: graduating from the History Department of Moscow State University (MSU), I learned to examine things through form, content, and the cultural footprint left across time.',
      'When I first encountered authentic artisanal, living wines in 2018, I realized that winemaking is pure art—one that demands fundamental comprehension and precise language.',
      'To build an academic foundation, I completed the comprehensive course at Enotria Wine School (Simple Group). Today, I continue advancing my expertise internationally through the WSET program at CAVE (Centro Argentino de Vinos y Sommeliers) in Buenos Aires.'
    ],
    educationTitle: 'Academic Background',
    educationBadges: [
      {
        institution: 'Lomonosov Moscow State University (MSU)',
        detail: 'Department of History, Art History division'
      },
      {
        institution: 'Enotria Wine School',
        detail: 'Comprehensive professional sommelier program (Simple Group)'
      },
      {
        institution: 'CAVE (Centro Argentino de Vinos y Sommeliers)',
        detail: 'International WSET program (Buenos Aires, Argentina)'
      }
    ],
    philosophyTitle: 'Wine Focus & Philosophy',
    philosophySubtitle: 'Three fundamental principles of tasting and discovery',
    philosophyPillars: [
      {
        title: 'Wine as Dramaturgy & Storytelling',
        description: 'I avoid dry lectures filled with rote terminology. Each tasting unfolds like a narrative: we learn to perceive nuances, articulate personal impressions, and understand the creator’s vision in the glass.'
      },
      {
        title: 'The Other Argentina: Elegance Over Clichés',
        description: 'Beyond stereotypes of heavy, over-oaked, jammy wines, I explore and champion the refined side of Argentine terroir: delicate European profiles, garage projects, and daring fermentations.'
      },
      {
        title: 'Biodynamics & Low-Intervention Practices',
        description: 'I am drawn to living, low-intervention, organic, and biodynamic wines—honest stories of place where nothing is masked or fabricated.'
      }
    ],
    experienceTitle: 'Experience & Projects',
    experienceSubtitle: 'Active sommelier practice across Argentina',
    projects: [
      {
        tag: '3+ Years in Argentina',
        title: 'Wine Practice in Buenos Aires',
        description: 'Hundreds of intimate and public tastings, wine lectures, educational workshops, and private tasting clubs.'
      },
      {
        tag: 'Education',
        title: '“Luz del Vino” Wine School',
        description: 'Co-founder of the educational initiative (3 graduated cohorts) spanning the history, science, and sensory analysis of Argentine wine.'
      },
      {
        tag: 'Curated Travel',
        title: 'Boutique Mendoza Tours',
        description: 'Curating and guiding private journeys to closed-door artisan bodegas and high-altitude terroirs.'
      },
      {
        tag: 'Cellar Consulting',
        title: 'Wine Scouting & Custom Cellars',
        description: 'Personal scouting of rare bottles, curation of private collections, and direct sourcing for dedicated wine enthusiasts.'
      }
    ],
    ctaHeading: 'Book a Tasting or Private Consultation',
    ctaText: 'Polina hosts intimate tastings at BRUT bar, curates wine selections for milestone events, and advises collectors.',
    ctaButtonWhatsApp: 'Message Polina on WhatsApp',
    backToHome: 'Back to BRUT bar',
    whatsappMessage: 'Hello Polina! I would like to book a private tasting / wine consultation at BRUT bar.'
  },

  PT: {
    pageTitleBadge: 'Head Sommelier • BRUT bar',
    name: 'Polina Schteiner',
    roles: ['Sommelier', 'Historiadora da Arte', 'Wine Scout'],
    roleSubtitle: 'Sommelier, historiadora da arte, wine scout',
    quote: '«O vinho é a mensagem mais honesta através do espaço e do tempo. Cada garrafa guarda as decisões de quem a criou, o caráter da terra e o contexto da sua época. Minha missão é ajudar você a decifrar essa linguagem e ouvir sua história».',
    aboutTitle: 'Sobre mim',
    aboutParagraphs: [
      'Meu caminho no mundo do vinho começou pela perspectiva da história da arte: formada pela Faculdade de História da Universidade Estatal de Moscou (MGU), aprendi a observar as coisas pela forma, pelo conteúdo e pelo rastro cultural que o ser humano deixa no tempo.',
      'Quando em 2018 descobri o universo dos vinhos vivos e artesanais, percebi que a vinificação é pura arte — exigindo compreensão profunda e vocabulário preciso.',
      'Para consolidar a base acadêmica, concluí a formação profissional na escola Enotria (Simple Group). Hoje sigo aprofundando minha expertise internacionalmente pelo programa WSET no prestigiado instituto CAVE (Centro Argentino de Vinos y Sommeliers) em Buenos Aires.'
    ],
    educationTitle: 'Formação acadêmica',
    educationBadges: [
      {
        institution: 'Universidade Estatal de Moscou (MGU)',
        detail: 'Faculdade de História, especialização em História da Arte'
      },
      {
        institution: 'Escola de Vinhos «Enotria»',
        detail: 'Curso profissionalizante completo (Simple Group, Moscou)'
      },
      {
        institution: 'CAVE (Centro Argentino de Vinos y Sommeliers)',
        detail: 'Certificação internacional WSET (Buenos Aires, Argentina)'
      }
    ],
    philosophyTitle: 'Foco e filosofia do vinho',
    philosophySubtitle: 'Três pilares que conduzem cada taça e experiência',
    philosophyPillars: [
      {
        title: 'O vinho como dramaturgia e narrativa',
        description: 'Não dou aulas frias com termos decorados. Cada degustação é criada como um roteiro: aprendemos a sentir nuances, formular impressões próprias e compreender o pensamento que o produtor colocou na taça.'
      },
      {
        title: 'A outra Argentina: sutileza antes dos clichês',
        description: 'Longe dos estereótipos de vinhos pesados e amadeirados, investigo e revelo o lado elegante do terroir argentino: perfis delicados de estilo europeu, vinícolas de garagem e experimentos ousados.'
      },
      {
        title: 'Biodinâmica e práticas naturais',
        description: 'Tenho paixão especial por vinhos vivos, de baixa intervenção, orgânicos e biodinâmicos: histórias reais de terroir, sem artifícios.'
      }
    ],
    experienceTitle: 'Experiência e projetos',
    experienceSubtitle: 'Atuação enológica contínua na Argentina',
    projects: [
      {
        tag: '+3 anos na Argentina',
        title: 'Prática enológica em Buenos Aires',
        description: 'Centenas de degustações íntimas e públicas, palestras e confrarias exclusivas.'
      },
      {
        tag: 'Educação',
        title: 'Escola de vinhos «Luz del Vino»',
        description: 'Cofundadora do projeto educacional (3 turmas formadas), cobrindo história, processos e análise sensorial do vinho argentino.'
      },
      {
        tag: 'Roteiros de autor',
        title: 'Expedições exclusivas a Mendoza',
        description: 'Curadoria e acompanhamento de viagens a vinícolas boutique fechadas ao grande público.'
      },
      {
        tag: 'Curadoria personalizada',
        title: 'Wine Scouting e adegas sob medida',
        description: 'Busca personalizada de rótulos raros, estruturação de coleções privadas e compras exclusivas para apreciadores.'
      }
    ],
    ctaHeading: 'Agendar uma degustação ou consultoria',
    ctaText: 'Polina realiza degustações exclusivas no BRUT bar, consultoria de vinhos para eventos e curadoria para colecionadores particulares.',
    ctaButtonWhatsApp: 'Falar com a Polina no WhatsApp',
    backToHome: 'Voltar ao BRUT bar',
    whatsappMessage: 'Olá, Polina! Gostaria de agendar uma degustação privada / consultoria de vinhos no BRUT bar.'
  }
};
