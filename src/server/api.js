const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const {
  transactionReadCSV,
  getTransactions,
  postTransactions,
  getPurposeCategory,
  postPurposeCategory,
  getConfig,
  postConfig,
} = require('./dbFs')

// app.use(cors())
app.use(bodyParser.json({ limit: '1mb' }))
// app.use(express.static('build'))
// })

app.post('/api/readcsv', function (req, res) {
  console.log('POST /api/readcsv')
  transactionReadCSV()
  res.json({ message: 'Reading file, call /transations to get results' })
})

app.get('/api/transactions', async function (req, res) {
  console.log('GET /api/transactions')
  const transactions = getTransactions()
  res.json(transactions)
})

app.post('/api/transactions', async function (req, res) {
  console.log('POST /api/transactions')
  const transactions = req.body
  if (transactions) {
    postTransactions(transactions)
    res.json(transactions)
  } else {
    handleInvalidJson(res)
  }
})

app.get('/api/purposeCategory', async function (req, res) {
  console.log('GET /api/purposeCategory')
  const purposeCategory = getPurposeCategory()
  res.json(purposeCategory)
})

app.post('/api/purposeCategory', async function (req, res) {
  console.log('POST /api/purposeCategory')
  const purposeCategory = req.body
  if (purposeCategory) {
    postPurposeCategory(purposeCategory)
    res.json(purposeCategory)
  } else {
    handleInvalidJson(res)
  }
})

app.get('/api/config', async function (req, res) {
  console.log('GET /api/config')
  const config = getConfig()
  res.json(config)
})

app.post('/api/config', async function (req, res) {
  console.log('POST /api/config')
  const config = req.body
  if (config) {
    postConfig(config)
    res.json(config)
  } else {
    handleInvalidJson(res)
  }
})

function handleInvalidJson(res) {
  res.status(400)
  const message = 'Invalid JSON'
  console.error(message)
  res.json({ message })
}


const port = 8080
app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
})