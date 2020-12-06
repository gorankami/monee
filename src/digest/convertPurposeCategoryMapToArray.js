export function convertPurposeCategoryMapToArray(map) {
  return Object.keys(map).map((purpose) => ({
    purpose,
    category: map[purpose],
  }))
}
