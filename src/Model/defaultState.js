import { PAGE_NAME_OVERVIEW } from '../Components/Pages/pageNames'
import {
  getConfig,
  getPurposeCategory,
  getTransactions,
} from './localStorageManager'

export const defaultState = {
  transactions: getTransactions(),
  purposeCategory: getPurposeCategory(),
  config: getConfig(),
  CategoriesForm: {
    open: false,
    transaction: undefined,
  },
  PageTransactions: {
    filteredTransactions: [],
  },
  currentPage: PAGE_NAME_OVERVIEW,
}
