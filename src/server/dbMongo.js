var MongoClient = require('mongodb').MongoClient

const DOMAIN = 'respberrypi'
const DB_NAME = 'finance'
const url = `mongodb://${DOMAIN}:27017/`

async function transactionsFindSync() {
  let db = await MongoClient.connect(url)
  var dbo = db.db(DB_NAME)
  const transactions = dbo.collection('transactions').find()
  db.close()
  return transactions
}

async function transactionsInsertSync(transactions) {
  let db = await MongoClient.connect(url)
  var dbo = db.db(DB_NAME)
  dbo.collection('transactions').drop()
  dbo.collection('transactions').insertMany(transactions)
  db.close()
}

async function purposeCategoryFindSync() {
  let db = await MongoClient.connect(url)
  var dbo = db.db(DB_NAME)
  const purposeCategory = dbo.collection('purposeCategory').find()
  const purposeCategoryMap = {}
  purposeCategory.forEach(
    ({ purpose, category }) => (purposeCategoryMap[purpose] = category),
  )
  db.close()
  return purposeCategoryMap
}

async function purposeCategoryInsertSync(purposeCategory) {
  let db = await MongoClient.connect(url)
  var dbo = db.db(DB_NAME)
  dbo.collection('purposeCategory').drop()
  dbo
    .collection('purposeCategory')
    .insertMany(
      Object.keys(purposeCategory).map((purpose) => ({
        purpose,
        category: purposeCategory[purpose],
      })),
    )
  db.close()
}

module.exports = {
  transactionsFindSync,
  transactionsInsertSync,
  purposeCategoryFindSync,
  purposeCategoryInsertSync,
}
