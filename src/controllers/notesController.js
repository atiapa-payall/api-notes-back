import { queryAll, getOne, deleteOne, addOne, updateOne } from '../repository/persistence/notesLogic.js'

export const getAll = (req, res) => {
  queryAll().then(notes => {
    res.status(302).json(notes)
  })
}
export const getOneById = (req, res, next) => {
  const { id } = req.params
  const filter = { _id: id }

  getOne(filter).then(result => {
    if (result) res.status(302).json(result)
    else res.status(404).end()
  })
    .catch(err => next(err))
}
export const deleteOneById = (req, res, next) => {
  const { id } = req.params
  const filter = { _id: id }

  deleteOne(filter).then(result => {
    if (result) res.status(204).end()
    else res.status(304).end()
  })
    .catch(err => next(err))
}
export const createOne = (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  addOne(note).then(result => {
    res.status(201).json(result)
  }).catch(err => {
    console.error(err)
    res.status(500).end()
  })
}
export const updateOneById = (req, res, next) => {
  const { id } = req.params
  const filter = { _id: id }
  const note = res.body

  updateOne(filter, note)
    .then(result => res.json(result))
    .catch(err => next(err))
}
