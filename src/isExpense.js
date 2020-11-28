export default function isExpense({ target, targetAccountNumber }) {
  try {
    const config = JSON.parse(localStorage.getItem('config'))
    return !(
      target === config.target &&
      targetAccountNumber === config.targetAccountNumber
    )
  } catch (e) {
    console.log('error reading config while checking isExpense')
    return true
  }
}
