import Note from '../../models/Note.js'
import User from '../../models/User.js'

export const queryAll = async () => await Note.aggregate().project('-_id -__v')
export const getOne = async (filter) => await Note.findOne(filter)
export const deleteOne = async (filter) => await Note.findOneAndDelete(filter)
export const addOne = async (note) => {
  const user = await User.findById(note.userId)

  const doc = new Note({
    content: note.content,
    important: typeof note.important !== 'undefined'
      ? note.important
      : false,
    userId: user._id
  })

  const result = await doc.save()
  user.notes = user.notes.concat(doc._id)
  await user.save()

  return result
}
export const updateOne = async (filter, note) => {
  const newNote = {
    content: note.content,
    import: note.import
  }

  return await Note.findByIdAndUpdate(filter, newNote, { new: true })
}
