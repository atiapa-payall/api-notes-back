import { createUser, queryAllUsers } from '../repository/persistence/usersLogic.js'

export const addUser = async (req, res, next) => {
  const { body } = req
  console.log('POST')
  createUser(body)
    .then(user => res.status(201).json(user))
    .catch(err => next(err))
}

export const getAll = async (req, res) => {
  try {
    queryAllUsers().then(users => {
      res.status(302).json(users)
    })
  } catch (error) {
    console.log(error)
  }
}
