import { Schema, model } from 'mongoose'

const noteSchema = new Schema({
  content: String,
  date: {
    type: Date,
    default: new Date().toISOString()
  },
  important: Boolean,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Note = model('Note', noteSchema)

export default Note
