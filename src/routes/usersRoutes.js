import { Router } from 'express'
import { addUser, getAll } from '../controllers/usersController.js'

const usersRouter = Router()

usersRouter.route('/').get(getAll).post(addUser)

export default usersRouter
