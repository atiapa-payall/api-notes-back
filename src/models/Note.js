import { Schema, model } from 'mongoose'

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = model('Note', noteSchema)

export default Note
