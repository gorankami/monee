import { PAGE_NAME_OVERVIEW } from '../Components/Pages/pageNames'
import {
  getConfig,
  getPurposeCategory,
  getTransactions,
  getCurrentPage
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
  currentPage: getCurrentPage() || PAGE_NAME_OVERVIEW,
}