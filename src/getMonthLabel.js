import getMonthName from "./getMonthName"

export default function getMonthLabel(t) {
    let monthLabel = 'unknown'
    if (t.date) {
      const dateArr = t.date.split('.')
      if (dateArr.length === 3) {
        const monthName = getMonthName(Number(dateArr[1]))
        if (monthName) monthLabel = `${monthName} ${dateArr[2]}`
      }
    }
    return monthLabel
  }
  
  
  