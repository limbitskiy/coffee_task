export function compareDates(date: Date, startDate: Date, endDate: Date) {
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  if (
    utcDate.getUTCFullYear() >= startDate.getUTCFullYear() &&
    utcDate.getUTCFullYear() <= endDate.getUTCFullYear() &&
    utcDate.getUTCMonth() >= startDate.getUTCMonth() &&
    utcDate.getUTCMonth() <= endDate.getUTCMonth() &&
    utcDate.getUTCDate() >= startDate.getUTCDate() &&
    utcDate.getUTCDate() <= endDate.getUTCDate()
  ) {
    return true;
  }
  return false;
}
