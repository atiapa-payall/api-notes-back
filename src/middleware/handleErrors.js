export default (error, req, res, next) => {
  console.log(error)
  if (error.name === 'CastError') res.status(400).json({ error: error.name })
  else if (error.errors.username.message) res.status(400).json({ error: error.errors.username.message })
  else res.status(500).json({ error: 'internal server error' })
}
