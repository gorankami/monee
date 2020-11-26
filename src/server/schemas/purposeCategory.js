import { Mongoose } from 'mongoose'

export const schema = new Mongoose.Schema({
  purpose: String,
  category: String,
})
