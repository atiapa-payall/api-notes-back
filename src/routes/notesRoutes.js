import { Router } from 'express'
import { createOne, deleteOneById, getAll, getOneById, updateOneById } from '../controllers/notesController.js'

const notesRouter = Router()

notesRouter.get('/', getAll)
notesRouter.get('/:id', getOneById)
notesRouter.post('/', createOne)
notesRouter.put('/:id', updateOneById)
notesRouter.delete('/:id', deleteOneById)

export default notesRouter
