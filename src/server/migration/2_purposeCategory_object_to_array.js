const {
  convertPurposeCategoryMapToArray,
} = require('../../digest/convertPurposeCategoryMapToArray')
const DB = require('../dbFs')
setTimeout(() => {
  const pcObject = DB.getPurposeCategory()
  console.log(pcObject)
  const pcArray = convertPurposeCategoryMapToArray(pcObject)
  console.log(pcArray)
  DB.postPurposeCategory(pcArray)
}, 1000)
