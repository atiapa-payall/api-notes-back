import bcrypt from 'bcrypt'
import User from '../../models/User.js'

export const createUser = async (body) => {
  const { username, name, password } = body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  return savedUser
}

export const queryAllUsers = async () => await User.find({}).populate('notes', {
  content: 1,
  date: 1,
  _id: 0
})
