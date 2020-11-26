import { useState, useContext } from 'react'
import { CATEGORY_FORM_CANCEL, CATEGORY_FORM_SELECT } from '../../Model/reducer'
import './CategoriesForm.css'
import { Context } from '../StoreProvider'

export default function CategoriesForm() {
  const [txtInput, setTxtInput] = useState('')
  const [state, dispatch] = useContext(Context)

  const categories = []
  Object.keys(state.purposeCategory).forEach((purpose) => {
    const category = state.purposeCategory[purpose]
    if (categories.indexOf(category) === -1) categories.push(category)
  })

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
