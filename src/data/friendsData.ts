import { Language } from './translations';

export interface FriendPartner {
  id: string;
  name: string;
  /** Path to transparent (alpha-channel) PNG or SVG logo */
  logoSrc: string;
  /** Clickable destination URL of the partner project */
  url: string;
  /** Optical sizing classes to visually balance logos with different aspect ratios inside square alpha canvases */
  logoClassName?: string;
}

export const FRIENDS_PARTNERS: FriendPartner[] = [
  {
    id: 'questio',
    name: 'Questio',
    logoSrc: '/assets/aistudio/Questio_786af630.png',
    url: 'https://questio.fun/',
    logoClassName: 'w-[205px] sm:w-[225px]',
  },
  {
    id: 'philharmonic-pictures',
    name: 'Philharmonic Pictures',
    logoSrc: '/assets/aistudio/Philharmonic_6ff021f7.png',
    url: 'https://philharmonic.pictures/en/#top',
    logoClassName: 'w-[220px] sm:w-[244px]',
  },
  {
    id: 'cabaret-courage',
    name: 'Cabaret Courage',
    logoSrc: '/assets/aistudio/Cabaret_1f9b31ab.png',
    url: 'https://www.plateanet.com/obra/35791?obra=CABARET-COURAGE_&paso=inicio',
    logoClassName: 'w-[152px] sm:w-[176px] -translate-y-3',
  },
];

export const FRIENDS_SECTION_COPY: Record<
  Language,
  { eyebrow: string; title: string; subtitle: string; visitLabel: string }
> = {
  RU: {
    eyebrow: 'Выездной бар · Коллаборации',
    title: 'Наши друзья',
    subtitle: 'Проекты и площадки, с которыми мы сотрудничаем как выездной бар игристых вин.',
    visitLabel: 'Перейти к проекту',
  },
  ES: {
    eyebrow: 'Barra móvil · Colaboraciones',
    title: 'Nuestros amigos',
    subtitle: 'Proyectos y espacios con los que colaboramos con nuestra barra móvil de espumantes.',
    visitLabel: 'Visitar proyecto',
  },
  PT: {
    eyebrow: 'Bar itinerante · Parcerias',
    title: 'Nossos amigos',
    subtitle: 'Projetos e espaços com os quais colaboramos como bar itinerante de espumantes.',
    visitLabel: 'Visitar projeto',
  },
  EN: {
    eyebrow: 'Mobile Bar · Collaborations',
    title: 'Our Friends',
    subtitle: 'Projects and venues we partner with as a mobile Argentine sparkling wine bar.',
    visitLabel: 'Visit project',
  },
};
