import { Mongoose } from 'mongoose'

export const schema = new Mongoose.Schema({
  target: String,
  targetAccountNumber: String,
  amount: Number,
  currency: String,
  purpose: String,
  purposeCode: String,
  date: Date,
})
