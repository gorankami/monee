import { postPurposeCategory } from '../apiActions'
import { filterByMonth } from '../digest/filterByMonth'

export const TRANSACTIONS_LOAD = 'TRANSACTIONS_LOAD'
export const PURPOSE_CATEGORY_LOAD = 'PURPOSE_CATEGORY_LOAD'
export const CATEGORY_FORM_OPEN = 'CATEGORY_FORM_OPEN'
export const CATEGORY_FORM_CANCEL = 'CATEGORY_FORM_CANCEL'
export const CATEGORY_FORM_SELECT = 'CATEGORY_FORM_SELECT'
export const PAGE_TRANSACTIONS_FILTER_MONTH = 'PAGE_TRANSACTIONS_FILTER_MONTH'

export default function reducer(state, action) {
  switch (action.type) {
    case TRANSACTIONS_LOAD:
      return { ...state, transactions: action.payload }
    case PURPOSE_CATEGORY_LOAD:
      return { ...state, purposeCategory: action.payload }
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
          filteredTransactions: filterByMonth(state.transactions, action.payload),
        },
      }
    default:
      return state
  }
}
