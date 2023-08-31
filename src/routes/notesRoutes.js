import { Router } from 'express'
import { createOne, deleteOneById, getAll, getOneById, updateOneById } from '../controllers/notesController.js'

const notesRouter = Router()

notesRouter.route('/')
  .get(getAll)
  .post(createOne)
notesRouter.route('/:id')
  .get(getOneById)
  .put(updateOneById)
  .delete(deleteOneById)

export default notesRouter
