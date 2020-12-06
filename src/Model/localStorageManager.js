import { convertPurposeCategoryMapToArray } from '../digest/convertPurposeCategoryMapToArray'

export function getTransactions() {
  let result
  try {
    result = JSON.parse(localStorage.getItem('transactions'))
  } catch (e) {
    console.log('Error parsing transactions from local storage')
  }
  return result || []
}

export function getPurposeCategory() {
  let result
  try {
    result = JSON.parse(localStorage.getItem('purposeCategory'))
    if (result.length === undefined)
      result = convertPurposeCategoryMapToArray(result)
  } catch (e) {
    console.log('Error parsing purposeCategory from local storage')
  }
  return result || []
}

export function getConfig() {
  let result
  try {
    result = JSON.parse(localStorage.getItem('config'))
  } catch (e) {
    console.log('Error parsing config from local storage')
    return { target: '', targetAccountNumber: '' }
  }
  return result || {}
}

export function getCurrentPage() {
  try {
    return JSON.parse(localStorage.getItem('currentPage'))
  } catch (e) {
    console.log('Error parsing currentPage from local storage')
    return undefined
  }
}

export function setTransactions(transactions) {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

export function setPurposeCategory(purposeCategory) {
  localStorage.setItem('purposeCategory', JSON.stringify(purposeCategory))
}

export function setConfig(config) {
  localStorage.setItem('config', JSON.stringify(config))
}

export function setCurrentPage(currentPage) {
  localStorage.setItem('currentPage', JSON.stringify(currentPage))
}
