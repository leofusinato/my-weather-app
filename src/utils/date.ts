var months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const weekDays = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

export function getWeekDay(day: number) {
  return weekDays[day];
}

export function getDateFromUnix(unix: number) {
  return new Date(unix * 1000);
}

export function weekDayFromUnixTime(unix: number) {
  const date = getDateFromUnix(unix);
  return weekDays[date.getDay()];
}

export function getExtenseDay(date: Date) {
  const day = date.getDate();
  return day + " de " + months[date.getMonth()];
}
