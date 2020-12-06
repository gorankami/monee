import { useState, useContext, useEffect } from 'react'
import { CATEGORY_FORM_CANCEL, CATEGORY_FORM_SELECT } from '../../Model/reducer'
import './CategoriesForm.css'
import { Context } from '../StoreProvider'
import { uniq } from 'lodash'
import Paginator from '../Paginator'

export default function CategoriesForm() {
  const [txtInput, setTxtInput] = useState('')
  const [categories, setCategories] = useState([])
  const [state, dispatch] = useContext(Context)
  const [pagedCategories, setPagedCategories] = useState([])

  useEffect(() => {
    setCategories(uniq(state.purposeCategory.map((pc) => pc.category)).sort())
  }, [state.purposeCategory])

  function onChange(e) {
    setTxtInput(e.target.value)
  }

  function cancel() {
    setTxtInput('')
    dispatch({ type: CATEGORY_FORM_CANCEL })
  }

  function select(category) {
    setTxtInput('')
    dispatch({ type: CATEGORY_FORM_SELECT, payload: category })
  }

  if (!state.CategoriesForm.isOpen) return <></>
  return (
    <div className="CategoriesForm">
      <div className="content">
        <div className="form">
          <input onChange={onChange} value={txtInput} />
          <input
            disabled={!txtInput.length}
            type="button"
            value="OK"
            onClick={() => select(txtInput)}
          />
          <input type="button" value="Cancel" onClick={cancel} />
        </div>
        <ul>
          <li datacategory={undefined} onClick={() => select()}>
            None
          </li>
          {pagedCategories.map((category, i) => (
            <li
              key={i}
              datacategory={undefined}
              onClick={() => select(category)}
            >
              {category}
            </li>
          ))}
        </ul>
        <Paginator items={categories} onPageChange={setPagedCategories} />
      </div>
    </div>
  )
}
