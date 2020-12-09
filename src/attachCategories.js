export function attachCategories(transactions, purposeCategory) {
  return transactions.map((t) => {
    const item = purposeCategory.find((pc) => pc.purpose === t.purpose)
    const category = item ? item.category : ''
    return { ...t, category }
  })
}
