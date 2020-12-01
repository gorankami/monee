import { postPurposeCategory } from '../apiActions'
import { filterByMonth } from '../digest/filterByMonth'

export const API_TRANSACTIONS_LOAD = 'API_TRANSACTIONS_LOAD'
export const API_PURPOSE_CATEGORY_LOAD = 'API_PURPOSE_CATEGORY_LOAD'
export const API_CONFIG_LOAD = 'API_CONFIG_LOAD'
export const CATEGORY_FORM_OPEN = 'CATEGORY_FORM_OPEN'
export const CATEGORY_FORM_CANCEL = 'CATEGORY_FORM_CANCEL'
export const CATEGORY_FORM_SELECT = 'CATEGORY_FORM_SELECT'
export const PAGE_TRANSACTIONS_FILTER_MONTH = 'PAGE_TRANSACTIONS_FILTER_MONTH'
export const PAGE_GOTO = 'PAGE_GOTO'
export const PAGE_CONFIG_SAVE_FIELD = 'PAGE_CONFIG_SAVE_FIELD'

export default function reducer(state, action) {
  switch (action.type) {
    case API_TRANSACTIONS_LOAD:
      return { ...state, transactions: action.payload }
    case API_PURPOSE_CATEGORY_LOAD:
      return { ...state, purposeCategory: action.payload }
    case API_CONFIG_LOAD:
      return { ...state, config: action.payload }
    case CATEGORY_FORM_OPEN:
      return {
        ...state,
        CategoriesForm: { isOpen: true, transaction: action.payload },
      }
    case CATEGORY_FORM_CANCEL:
      return { ...state, CategoriesForm: { isOpen: false } }
    case CATEGORY_FORM_SELECT:
      const purposeCategory = {
        ...state.purposeCategory,
        [state.CategoriesForm.transaction.purpose]: action.payload,
      }
      postPurposeCategory(purposeCategory)

      const CategoriesForm = { isOpen: false }
      return { ...state, purposeCategory, CategoriesForm }
    case PAGE_TRANSACTIONS_FILTER_MONTH:
      return {
        ...state,
        PageTransactions: {
          filteredTransactions: filterByMonth(
            state.transactions,
            action.payload,
          ),
        },
      }
    case PAGE_GOTO:
      return {
        ...state,
        currentPage: action.payload,
      }
    case PAGE_CONFIG_SAVE_FIELD:
      return {
        ...state,
        config: {
          ...state.config,
          ...action.payload,
        },
      }
    default:
      return state
  }
}
