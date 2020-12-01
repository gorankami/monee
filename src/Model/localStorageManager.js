export function getTransactions() {
  try {
    return JSON.parse(localStorage.getItem('transactions'))
  } catch (e) {
    console.log('Error parsing transactions from local storage')
    return []
  }
}

export function getPurposeCategory() {
  try {
    return JSON.parse(localStorage.getItem('purposeCategory'))
  } catch (e) {
    console.log('Error parsing purposeCategory from local storage')
    return {}
  }
}

export function getConfig() {
  try {
    return JSON.parse(localStorage.getItem('config'))
  } catch (e) {
    console.log('Error parsing config from local storage')
    return { target: '', targetAccountNumber: '' }
  }
}

export function setStorageData(state) {
  localStorage.setItem('transactions', JSON.stringify(state.transactions))
  localStorage.setItem('purposeCategory', JSON.stringify(state.purposeCategory))
  localStorage.setItem('config', JSON.stringify(state.config))
}
