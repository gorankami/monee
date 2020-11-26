const dbFs = require('../dbFs')
const dbMongo = require('../dbMongo')

async function start() {
  const transactions = dbFs.transactionsFindSync()
  try {
    await dbMongo.transactionsInsertSync(transactions)
  } catch (err) {
    console.log('error inserting transactions: ', err)
  }
  const purposeCategory = dbFs.purposeCategoryFindSync()
  try {
    await dbMongo.purposeCategoryInsertSync(purposeCategory)
  } catch (err) {
    console.log('error inserting purpsoeCategory: ', err)
  }
}
