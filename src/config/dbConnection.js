import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
const connectionDB = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

// conexion a mongodb
if (process.env.MONGO_DB_URI) {
  mongoose.connect(connectionDB)
    .then(() => {
      console.log('DataBase connected')
    }).catch(err => {
      console.error(err.message)
    })
} else console.log('Database access impossible')
