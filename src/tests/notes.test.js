import mongoose from 'mongoose'
import { server } from '../index'
import Note from '../models/Note'
import {
  initialNotes,
  api,
  getAllContentFromNotes
} from './helpers'

beforeEach(async () => {
  await Note.deleteMany({})

  const noteObject = initialNotes.map(note => new Note(note))
  const promises = noteObject.map(note => note.save())
  await Promise.all(promises)
})

test('notes are returned as json', async () => {
  await api
    .get('/notes/api/v1')
    .expect(302)
    .expect('content-Type', /application\/json/)
})

test('thera are some notes', async () => {
  const response = await api.get('/notes/api/v1')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about tokicha', async () => {
  const { contents } = await getAllContentFromNotes()
  expect(contents).toContain('me pone el tulo en 4 despues que me lo mama')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'Ella quiere bicho bellaca',
    important: true,
    data: new Date()
  }

  await api
    .post('/notes/api/v1')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const { contents, response } = await getAllContentFromNotes()
  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(contents).toContain(newNote.content)
})

test('a note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/notes/api/v1')
    .send(newNote)
    .expect(400)

  const { response } = await getAllContentFromNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

test.skip('a note can be deleted', async () => {
  // para que este test funcione hay que quitar del projet de getAll en notesLogic
  // la restriccion del envio del id
  const { response: firstResponse } = await getAllContentFromNotes()
  const { body: notes } = firstResponse
  const noteToDelete = notes[0]

  await api
    .delete(`${process.env.API_URI}/${noteToDelete._id}`)
    .expect(204)

  const { response: secondResponse } = await getAllContentFromNotes()
  expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
})

test('a note that do not exits can not be deleted', async () => {
  await api
    .delete(`${process.env.API_URI}/1234`)
    .expect(400)

  const { response } = await getAllContentFromNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
