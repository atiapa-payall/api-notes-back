import { Router } from 'express'
import { addUser } from '../controllers/usersController.js'

const usersRouter = Router()

usersRouter.post('/users', addUser)

export default usersRouter
