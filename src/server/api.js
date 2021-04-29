const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const DB = require('./dbFs')
const {
  validateTransactionsJSON,
  validatePurposeCategoryJSON,
  validateConfigJSON,
} = require('../jsonValidator')

// app.use(cors())
app.use(bodyParser.json({ limit: '1mb' }))
app.use(express.static('build'))
// })

app.post('/api/readcsv', function (req, res) {
  console.log('POST /api/readcsv')
  DB.transactionReadCSV()
  res.json({ message: 'Reading file, call /transations to get results' })
})

const ERR_CORRUPTED_DB = 'Corrupted database'
const ERR_INVALID_JSON = 'Invalid JSON'

app.get('/api/transactions', async function (req, res) {
  console.log('GET /api/transactions')
  const transactions = DB.getTransactions()
  const { errors, valid } = validateTransactionsJSON(transactions)
  if (valid) {
    res.json(transactions)
  } else {
    res.status(400)
    res.json({ message: ERR_CORRUPTED_DB, errors })
  }
})

app.post('/api/transactions', async function (req, res) {
  console.log('POST /api/transactions')
  const transactions = req.body
  const { errors, valid } = validateTransactionsJSON(transactions)
  if (valid) {
    DB.postTransactions(transactions)
    res.json(transactions)
  } else {
    res.status(400)
    res.json({ message: ERR_INVALID_JSON, errors })
  }
})

app.get('/api/purposeCategory', async function (req, res) {
  console.log('GET /api/purposeCategory')
  const purposeCategory = DB.getPurposeCategory()
  const { errors, valid } = validatePurposeCategoryJSON(purposeCategory)
  if (valid) {
    res.json(purposeCategory)
  } else {
    res.status(400)
    res.json({ message: ERR_CORRUPTED_DB, errors })
  }
})

app.post('/api/purposeCategory', async function (req, res) {
  console.log('POST /api/purposeCategory')
  const purposeCategory = req.body
  const { errors, valid } = validatePurposeCategoryJSON(purposeCategory)
  if (valid) {
    DB.postPurposeCategory(purposeCategory)
    res.json(purposeCategory)
  } else {
    res.status(400)
    res.json({ message: ERR_INVALID_JSON, errors })
  }
})

app.get('/api/config', async function (req, res) {
  console.log('GET /api/config')
  const config = DB.getConfig()
  const { errors, valid } = validateConfigJSON(config)
  if (valid) {
    res.json(config)
  } else {
    res.status(400)
    res.json({ message: ERR_CORRUPTED_DB, errors })
  }
})

app.post('/api/config', async function (req, res) {
  console.log('POST /api/config')
  const config = req.body
  const { errors, valid } = validateConfigJSON(config)
  if (valid) {
    DB.postConfig(config)
    res.json(config)
  } else {
    res.status(400)
    res.json({ message: ERR_INVALID_JSON, errors })
  }
})

const port = 8080
app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
})
