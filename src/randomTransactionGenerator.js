const firms = [
  'DIMAGO-S',
  'TOJO',
  'AKUMULATOR',
  'AUTOMIKA',
  'SHOP TRADE',
  'AUTO RICAMBI',
  'OVER DRIVE',
  'MILEX COMMERCE',
  'CRAZY FROG SOUND',
  'LINEA',
  'JOKSA',
  'HANA',
  'AS',
  'DTM',
  'BOGOMIR',
  'AUTO VLADA SHOP',
  '3DT',
  'BiS',
  'AMAZON MOTORS',
  'V&D',
  'AUTO LUKA',
  'GOMIKOM',
  'ADM AUTO DEKI',
  'ARTUR & CO',
  'FILIP MOTORS',
  'STARTER SHOP',
  'VAJS & CO',
  'SIMEN PROM',
  'BIANCO TRADE',
  'TURBO',
  'SHOP INVEST',
]

export default function randomTransactionGenerator(numtransactions = 100) {
  const lineArray = []
  for (let i = 0; i < numtransactions; i++) {
    const minMonth = new Date()
    minMonth.setMonth(minMonth.getMonth() - 2)
    const maxMonth = new Date()
    let valDate = new Date(rand(minMonth.getTime(), maxMonth.getTime()))
    lineArray.push({
      target: undefined,
      targetAccountNumber: undefined,
      amount: rand(50, 10000),
      currency: rand(0, 1) ? 'RSD' : 'EUR',
      purpose: firms[rand(0, firms.length - 1)],
      purposeCode: undefined,
      date: valDate, //`${valDate.getDate()}.${valDate.getMonth()}.${valDate.getFullYear()}`,
      // category: categories[rand(0, categories.length - 1)],
    })
  }
  return lineArray
    .sort((a, b) => b.date > a.date)
    .map((t) => {
      return {
        ...t,
        date: `${t.date.getDate()}.${t.date.getMonth()}.${t.date.getFullYear()}`,
      }
    })
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
