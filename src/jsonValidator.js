const { Validator } = require('jsonschema')

const transactionsSchema = {
  id: '/Transactions',
  type: 'array',
  items: '/TransactionsItem',
}

const transactionsItemSchema = {
  id: '/TransactionsItem',
  type: 'object',
  properties: {
    target: { type: 'string' },
    targetAccountNumber: { type: 'string' },
    amount: { type: 'number' },
    currency: { type: 'string' },
    purpose: { type: 'string' },
    purposeCode: { type: 'string' },
    date: { type: 'string' },
  },
  required: ['date', 'purpose', 'amount', 'currency'],
}

const purposeCategorySchema = {
  id: '/PurposeCategory',
  type: 'array',
  items: '/PurposeCategoryItem',
}

const purposeCategoryItemSchema = {
  id: '/PurposeCategoryItem',
  type: 'object',
  properties: {
    purpose: { type: 'string' },
    category: { type: 'string' },
  },
}

const configSchema = {
  id: '/Config',
  type: 'object',
  properties: {
    target: { type: 'string' },
    targetAccountNumber: { type: 'string' },
  },
}

function validateTransactionsJSON(transactions) {
  const v = new Validator()
  v.addSchema(transactionsItemSchema)
  return v.validate(transactions, transactionsSchema)
}

function validatePurposeCategoryJSON(purposeCategory) {
  const v = new Validator()
  v.addSchema(purposeCategoryItemSchema)
  return v.validate(purposeCategory, purposeCategorySchema)
}

function validateConfigJSON(config) {
  const v = new Validator()
  return v.validate(config, configSchema)
}

module.exports = {
  validateTransactionsJSON,
  validatePurposeCategoryJSON,
  validateConfigJSON,
}
