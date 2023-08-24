import { Router } from 'express'
import { indexMessage } from '../controllers/indexController.js'

const indexRouter = Router()

indexRouter.get('/', indexMessage)

export default indexRouter
