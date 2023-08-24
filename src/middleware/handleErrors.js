export default (error, req, res, next) => {
  error.name === 'CastError'
    ? res.status(400).json({ error: error.name })
    : res.status(500).json({ error: 'internal server error' })
}
