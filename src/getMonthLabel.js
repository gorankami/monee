import getMonthName from './getMonthName'

export default function getMonthLabel(t) {
  let monthLabel = 'unknown'
  let date = typeof t === "string" ? t : t.date;
  if (date) {
    const [d, m, y] = date.split('.')
    if (m) {
      const monthName = getMonthName(Number(m))
      if (monthName) monthLabel = `${monthName} ${y}`
    }
  }
  return monthLabel
}
