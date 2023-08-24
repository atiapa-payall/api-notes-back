import Note from '../../models/Note.js'

export const queryAll = async () => await Note.aggregate().project('-_id -__v')
export const getOne = async (filter) => await Note.findOne(filter)
export const deleteOne = async (filter) => await Note.findOneAndDelete(filter)
export const addOne = async (note) => {
  const doc = new Note({
    content: note.content,
    important: typeof note.important !== 'undefined'
      ? note.important
      : false,
    date: new Date().toISOString()
  })

  return await doc.save()
}
export const updateOne = async (filter, note) => {
  const newNote = {
    content: note.content,
    import: note.import
  }

  return await Note.findByIdAndUpdate(filter, newNote, { new: true })
}
