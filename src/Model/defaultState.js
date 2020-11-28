import { PAGE_NAME_TRANSACTIONS } from '../Components/Pages/pageNames'

const ts = localStorage.getItem('transactions')
const pcs = localStorage.getItem('purposeCategory')
const ccs = localStorage.getItem('config')
let transactions = []
let purposeCategory = {}
let config = {
  target: '',
  targetAccountNumber: '',
}

try {
  transactions = ts ? JSON.parse(ts) : []
  purposeCategory = pcs ? JSON.parse(pcs) : {}
  if (ccs) config = JSON.parse(ccs)
} catch (e) {
  console.warnign('could not parse local storage: ', ts, pcs)
}

export const defaultState = {
  transactions,
  purposeCategory,
  config,
  CategoriesForm: {
    open: false,
    transaction: undefined,
  },
  PageTransactions: {
    filteredTransactions: [],
  },
  currentPage: PAGE_NAME_TRANSACTIONS,
}
