import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const connectionDB = process.env.CONNECTION_FRAG_L + process.env.USER_DB + ':' + process.env.PASSWORD_DB + process.env.CONNECTION_FRAG_R + process.env.DATABASE

// conexion a mongodb
if (process.env.USER_DB && process.env.PASSWORD_DB) {
  mongoose.connect(connectionDB)
    .then(() => {
      console.log('DataBase connected')
    }).catch(err => {
      console.error(err.message)
    })
} else console.log('Database access impossible')
