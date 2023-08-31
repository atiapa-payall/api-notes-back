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
