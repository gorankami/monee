import * as apiActions from '../apiActions'
import { filterByMonth } from '../digest/filterByMonth'
import * as localStorageManager from './localStorageManager'
import { uniq } from 'lodash'

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
      localStorageManager.setTransactions(action.payload)
      const months = uniq(
        action.payload.map((t) => {
          const ds = t.date.split('.')
          return `${ds[1]}.${ds[2]}`
        }),
      )
      const years = uniq(months.map((m) => m.split('.')[1]))
      return {
        ...state,
        transactions: action.payload,
        filters: { ...state.filters, months, years },
      }
    case API_PURPOSE_CATEGORY_LOAD:
      localStorageManager.setPurposeCategory(action.payload)
      const categories = uniq(action.payload.map((pc) => pc.category))
      return {
        ...state,
        purposeCategory: action.payload,
        filters: { ...state.filters, categories },
      }
    case API_CONFIG_LOAD:
      localStorageManager.setConfig(action.payload)
      return { ...state, config: action.payload }
    case CATEGORY_FORM_OPEN:
      return {
        ...state,
        CategoriesForm: { isOpen: true, transaction: action.payload },
      }
    case CATEGORY_FORM_CANCEL:
      return { ...state, CategoriesForm: { isOpen: false } }
    case CATEGORY_FORM_SELECT:
      const { purpose } = state.CategoriesForm.transaction
      let findRes = { purpose: purpose, category: action.payload }
      const newPC = state.purposeCategory.filter((pc) => pc.purpose !== purpose)

      const purposeCategory = [...newPC, findRes]

      localStorageManager.setPurposeCategory(purposeCategory)
      apiActions
        .postPurposeCategory(purposeCategory)
        .catch((e) =>
          console.error('Unable to post purpose category to API', e),
        )
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
      localStorageManager.setCurrentPage(action.payload)
      return {
        ...state,
        currentPage: action.payload,
      }
    case PAGE_CONFIG_SAVE_FIELD:
      const config = {
        ...state.config,
        ...action.payload,
      }
      console.log('Sending CONFIG to SERVER: ', action.payload)
      localStorageManager.setConfig(config)
      apiActions
        .postConfig(config)
        .catch((e) => console.error('Unable to post config to API', e))
      return {
        ...state,
        config,
      }
    default:
      return state
  }
}
