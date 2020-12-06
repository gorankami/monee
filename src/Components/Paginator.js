import React, { useEffect, useState } from 'react'

const ITEMS_PER_PAGE = 50

export default function Paginator({ items, itemsPerPage, onPageChange }) {
  if (!itemsPerPage) itemsPerPage = ITEMS_PER_PAGE

  const [page, setPage] = useState(0)

  function prev() {
    setPage(page - 1)
  }
  function next() {
    setPage(page + 1)
  }

  const pageCount = Math.floor(items.length / itemsPerPage)

  useEffect(() => {
    let pagedItems
    if (pageCount) {
      pagedItems = []
      const offset = itemsPerPage * page
      for (let i = offset; i < offset + itemsPerPage; i++)
        pagedItems.push(items[i])
    } else pagedItems = items
    onPageChange(pagedItems)
  }, [page, items])

  return (
    <div className="TransactionList">
      {!!pageCount && (
        <div>
          Page {page + 1}/{pageCount}
          <input type="button" value="Prev" onClick={prev} disabled={!page} />
          <input
            type="button"
            value="Next"
            onClick={next}
            disabled={page === pageCount - 1}
          ></input>
        </div>
      )}
    </div>
  )
}
