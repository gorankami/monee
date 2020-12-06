const DB = require('../dbFs')
setTimeout(() => {
  const pcObject = DB.getPurposeCategory()
  console.log(pcObject)
  const pcArray = Object.keys(pcObject).map((purpose) => ({
    purpose,
    category: pcObject[purpose],
  }))
  console.log(pcArray)
  DB.postPurposeCategory(pcArray)
}, 1000)
