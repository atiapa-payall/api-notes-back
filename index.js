import express from 'express'
import cors from 'cors'

let notes = [
  {
    id: 1,
    content: 'uwu'
  },
  {
    id: 2,
    content: '7w7'
  }
]

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const note = notes.find(note => note.id === +id)

  if (note) {
    res.send(note)
  } else {
    res.status(404).end('Informacion no existe mi pana')
  }
})
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const noteExists = notes.find(note => note.id === +id)

  if (noteExists) {
    notes = notes.filter(note => note.id !== +id)
    res.status(204).end()
  } else {
    res.status(404).end('Informacion no existe mi pana')
  }
})
app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)

  const newNote = {
    id: Math.max(...ids) + 1,
    content: note.content,
    important: typeof note.important !== 'undefined'
      ? note.important
      : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]

  res.status(201).json(newNote)
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found my pana'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
