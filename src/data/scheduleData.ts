import { Language } from './translations';

export interface DaySchedule {
  dayIndex: number; // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  dayName: Record<Language, string>;
  hoursDisplay: Record<Language, string>;
  isClosed: boolean;
  openHour?: number;  // 24-hr format
  closeHour?: number; // 24-hr format (24 = 00:00 midnight)
}

export const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    dayIndex: 1, // Monday
    dayName: { ES: 'Lunes', PT: 'Segunda-feira', EN: 'Monday', RU: 'Понедельник' },
    hoursDisplay: { ES: 'Cerrado', PT: 'Fechado', EN: 'Closed', RU: 'Выходной' },
    isClosed: true,
  },
  {
    dayIndex: 2, // Tuesday
    dayName: { ES: 'Martes', PT: 'Terça-feira', EN: 'Tuesday', RU: 'Вторник' },
    hoursDisplay: { ES: 'Cerrado', PT: 'Fechado', EN: 'Closed', RU: 'Выходной' },
    isClosed: true,
  },
  {
    dayIndex: 3, // Wednesday
    dayName: { ES: 'Miércoles', PT: 'Quarta-feira', EN: 'Wednesday', RU: 'Среда' },
    hoursDisplay: { ES: '15:00 – 22:00 hs', PT: '15:00 – 22:00 hs', EN: '15:00 – 22:00', RU: '15:00 – 22:00' },
    isClosed: false,
    openHour: 15,
    closeHour: 22,
  },
  {
    dayIndex: 4, // Thursday
    dayName: { ES: 'Jueves', PT: 'Quinta-feira', EN: 'Thursday', RU: 'Четверг' },
    hoursDisplay: { ES: '15:00 – 22:00 hs', PT: '15:00 – 22:00 hs', EN: '15:00 – 22:00', RU: '15:00 – 22:00' },
    isClosed: false,
    openHour: 15,
    closeHour: 22,
  },
  {
    dayIndex: 5, // Friday
    dayName: { ES: 'Viernes', PT: 'Sexta-feira', EN: 'Friday', RU: 'Пятница' },
    hoursDisplay: { ES: '14:00 – 00:00 hs', PT: '14:00 – 00:00 hs', EN: '14:00 – 00:00', RU: '14:00 – 00:00' },
    isClosed: false,
    openHour: 14,
    closeHour: 24,
  },
  {
    dayIndex: 6, // Saturday
    dayName: { ES: 'Sábado', PT: 'Sábado', EN: 'Saturday', RU: 'Суббота' },
    hoursDisplay: { ES: '14:00 – 00:00 hs', PT: '14:00 – 00:00 hs', EN: '14:00 – 00:00', RU: '14:00 – 00:00' },
    isClosed: false,
    openHour: 14,
    closeHour: 24,
  },
  {
    dayIndex: 0, // Sunday
    dayName: { ES: 'Domingo', PT: 'Domingo', EN: 'Sunday', RU: 'Воскресенье' },
    hoursDisplay: { ES: '14:00 – 22:00 hs', PT: '14:00 – 22:00 hs', EN: '14:00 – 22:00', RU: '14:00 – 22:00' },
    isClosed: false,
    openHour: 14,
    closeHour: 22,
  },
];

export const SCHEDULE_LABELS = {
  today: { ES: 'Hoy', PT: 'Hoje', EN: 'Today', RU: 'Сегодня' },
  scheduleTitle: { ES: 'Horarios de atención', PT: 'Horário de funcionamento', EN: 'Opening Hours', RU: 'График работы' },
  clickToExpand: { ES: 'Ver horario completo de la semana', PT: 'Ver horário completo da semana', EN: 'Click to view full weekly schedule', RU: 'Нажмите, чтобы увидеть график на всю неделю' },
  clickToCollapse: { ES: 'Ocultar horario completo', PT: 'Ocultar horário completo', EN: 'Hide full schedule', RU: 'Свернуть график' },
  openNow: { ES: 'Abierto ahora', PT: 'Aberto agora', EN: 'Open now', RU: 'Открыто сейчас' },
  closedNow: { ES: 'Cerrado por hoy', PT: 'Fechado por hoje', EN: 'Closed today', RU: 'Сегодня закрыто' },
};
