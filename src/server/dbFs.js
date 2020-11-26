const fs = require('fs')
const homedir = require('os').homedir()

const csvStringToJson = require('../csvStringToJson')
let transactions = []
let purposeCategory = {}

const dbFileTransactions = homedir + '/db_transactions.json'
const dbFilePurposeCategory = homedir + '/db_purpose_category.json'

if (fs.existsSync(dbFileTransactions)) {
  console.log('reading file ' + dbFileTransactions)
  fs.readFile(dbFileTransactions, 'utf8', (err, data) => {
    if (err) throw err
    transactions = JSON.parse(data)
  })
} else {
  fs.writeFile(dbFileTransactions, JSON.stringify(transactions), (err) => {
    if (err) throw err
  })
}

if (fs.existsSync(dbFilePurposeCategory)) {
  fs.readFile(dbFilePurposeCategory, 'utf8', (err, data) => {
    if (err) throw err
    purposeCategory = JSON.parse(data)
  })
} else {
  fs.writeFile(
    dbFilePurposeCategory,
    JSON.stringify(purposeCategory),
    (err) => {
      if (err) throw err
    },
  )
}

function transactionReadCSV() {
  fs.readFile('PrintList.csv', 'utf8', (err, data) => {
    if (err) throw err
    transactions = csvStringToJson(data)
  })
}

function getTransactions() {
  return transactions
}

function postTransactions(data) {
  transactions = data
  fs.writeFileSync(dbFileTransactions, JSON.stringify(transactions))
}

function getPurposeCategory() {
  return purposeCategory
}

function postPurposeCategory(data) {
  purposeCategory = data
  fs.writeFileSync(dbFilePurposeCategory, JSON.stringify(purposeCategory))
}

module.exports = {
  getTransactions,
  postTransactions,
  getPurposeCategory,
  postPurposeCategory,
  transactionReadCSV,
}
