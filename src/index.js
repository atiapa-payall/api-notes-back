import './config/dbConnection.js'
import express from 'express'
import EventEmitter from 'events'
import cors from 'cors'
import notFound from './middleware/notFound.js'
import handleErrors from './middleware/handleErrors.js'
import notesRouter from './routes/notesRoutes.js'
import indexRouter from './routes/indexRoutes.js'

const app = express()
const emitter = new EventEmitter()

emitter.setMaxListeners(20)
app.use(cors())
app.use(express.json())

// API Routes
app.use('/', indexRouter)
app.use(process.env.API_URI, notesRouter)

// error middleware's
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
