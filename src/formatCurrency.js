export default function formatCurrency({ amount, currency }) {
  try {
    return getFormatter(currency).format(amount)
  } catch (e) {
    console.error(currency, amount, e)
    return '' + currency + ' ' + amount
  }
}

const formatters = {}

function getFormatter(currency) {
  return (
    formatters[currency] ||
    new Intl.NumberFormat('en', { style: 'currency', currency })
  )
}
