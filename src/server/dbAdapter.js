const DB_INTERFACES = {
  DB_FS: 1,
  DB_MONGODB: 2,
  DB_MONGOOSE: 3,
}

const dbFS = require('./dbFs')
const { transactionReadCSVAsync } = dbFS

const dbMongo = require('./dbMongo')

const dbFsInterface = {
  transactionsFindSync: dbFS.transactionsFindSync,
  transactionsInsertSync: dbFS.transactionsInsertSync,
  purposeCategoryFindSync: dbFS.purposeCategoryFindSync,
  purposeCategoryInsertSync: dbFS.purposeCategoryInsertSync,
  transactionReadCSVAsync: transactionReadCSVAsync,
}

const dbMongoInterface = {
  transactionsFindSync: dbMongo.transactionsFindSync,
  transactionsInsertSync: dbMongo.transactionsInsertSync,
  purposeCategoryFindSync: dbMongo.purposeCategoryFindSync,
  purposeCategoryInsertSync: dbMongo.purposeCategoryInsertSync,
  transactionReadCSVAsync: transactionReadCSVAsync,
}

function getInterfaceFunctions(interfaceName) {
  switch (interfaceName) {
    case DB_INTERFACES.DB_FS:
      return dbFsInterface
    case DB_INTERFACES.DB_MONGODB:
      return dbMongoInterface
    default:
      return dbFsInterface
  }
}

module.exports = {
  DB_INTERFACES,
  getInterfaceFunctions,
}
