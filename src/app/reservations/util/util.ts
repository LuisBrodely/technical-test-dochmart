export function getDayOfMonth(date: Date): number {
  const dateObj = new Date(date);
  const day = dateObj.getUTCDate();
  return day;
}

export function convertTo12HourFormat(hour24: number): string {
  if (hour24 < 1 || hour24 > 24) {
    return "Hora invalida";
  }
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const period = hour24 < 12 ? "AM" : "PM";
  return hour12 + ":00 " + period;
}
