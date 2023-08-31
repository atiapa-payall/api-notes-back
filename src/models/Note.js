import { Schema, model } from 'mongoose'

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Note = model('Note', noteSchema)

export default Note
