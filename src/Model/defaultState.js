const ts = localStorage.getItem('transactions')
const pcs = localStorage.getItem('purposeCategory')
let transactions = []
let purposeCategory = {}

try {
  transactions = ts ? JSON.parse(ts) : []
  purposeCategory = pcs ? JSON.parse(pcs) : {}
} catch (e) {
  console.warnign("could not parse local storage: ", ts, pcs);
}

export const defaultState = {
  transactions,
  purposeCategory,
  CategoriesForm: {
    open: false,
    transaction: undefined,
  },
  PageTransactions: {
    filteredTransactions: [],
  },
}
