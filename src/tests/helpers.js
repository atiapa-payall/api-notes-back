import supertest from 'supertest'
import { app } from '../index'
import User from '../models/User'

export const api = supertest(app)

export const initialNotes = [
  {
    content: 'me pone el tulo en 4 despues que me lo mama',
    important: true
  },
  {
    content: 'tokicha sin mi tu no chicha',
    important: true
  }
]

export const getAllContentFromNotes = async () => {
  const response = await api.get(process.env.API_URI)
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

export const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}
