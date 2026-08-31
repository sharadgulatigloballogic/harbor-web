export function formatDate(isoDate) {
  if (!isoDate) return "—";
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${month}/${day}/${year}`;
}

export function isFutureDate(isoDate) {
  if (!isoDate) return false;
  return isoDate > new Date().toISOString().slice(0, 10);
}
