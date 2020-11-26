const mongoose = require('mongoose')
const DOMAIN = 'respberrypi'
const DB_NAME = 'finance'

mongoose.connect(`mongodb://${DOMAIN}/${DB_NAME}`, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function () {
  console.log('Connected to mongodb ')
})
