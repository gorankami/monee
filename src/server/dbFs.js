const fs = require('fs')
const homedir = require('os').homedir()

const csvStringToJson = require('../digest/csvStringToJson')
let cachedDb = {
  transactions: [],
  purposeCategory: {},
  config: {},
}

const dbFileTransactions = homedir + '/db_transactions.json'
const dbFilePurposeCategory = homedir + '/db_purpose_category.json'
const dbFileConfig = homedir + '/db_config.json'

function syncFile(filename, dbPropName) {
  if (fs.existsSync(filename)) {
    console.log('reading file ' + filename)
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) throw err
      cachedDb[dbPropName] = JSON.parse(data)
    })
  } else {
    fs.writeFile(filename, JSON.stringify(cachedDb[dbPropName]), (err) => {
      if (err) throw err
    })
  }
}

syncFile(dbFileTransactions, 'transactions')
syncFile(dbFilePurposeCategory, 'purposeCategory')
syncFile(dbFileConfig, 'config')

function transactionReadCSV() {
  fs.readFile('PrintList.csv', 'utf8', (err, data) => {
    if (err) throw err
    cachedDb.transactions = csvStringToJson(data)
  })
}

function getTransactions() {
  return cachedDb.transactions
}

function postTransactions(data) {
  cachedDb.transactions = data
  fs.writeFileSync(dbFileTransactions, JSON.stringify(cachedDb.transactions))
}

function getPurposeCategory() {
  return cachedDb.purposeCategory
}

function postPurposeCategory(data) {
  cachedDb.purposeCategory = data
  fs.writeFileSync(
    dbFilePurposeCategory,
    JSON.stringify(cachedDb.purposeCategory),
  )
}

function getConfig() {
  return cachedDb.config
}

function postConfig(data) {
  cachedDb.config = data
  fs.writeFileSync(dbFileConfig, JSON.stringify(cachedDb.config))
}

module.exports = {
  getTransactions,
  postTransactions,
  getPurposeCategory,
  postPurposeCategory,
  transactionReadCSV,
  getConfig,
  postConfig,
}
