import { createUser } from '../repository/persistence/usersLogic.js'

export const addUser = async (req, res, next) => {
  const { body } = req

  createUser(body)
    .then(user => res.status(201).json(user))
    .catch(err => next(err))
}
