import { useState, useContext, useEffect } from 'react'
import { CATEGORY_FORM_CANCEL, CATEGORY_FORM_SELECT } from '../../Model/reducer'
import './CategoriesForm.css'
import { Context } from '../StoreProvider'
import { uniq } from 'lodash'

export default function CategoriesForm() {
  const [txtInput, setTxtInput] = useState('')
  const [categories, setCategories] = useState([])
  const [state, dispatch] = useContext(Context)
  
  useEffect(() => {
    setCategories(uniq(state.purposeCategory.map((pc) => pc.category)))
  }, [])

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
          {categories.map((category, i) => (
            <li
              key={i}
              datacategory={undefined}
              onClick={() => select(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
