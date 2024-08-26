import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { SALT_ROUNDS, SECRET_JWT_KEY } from '../config.js';

const authController = {

  login: async (req, res) => {
    const { username, password } = req.body
    try {
      Validation.username(username)

      const user = await User.findByUsername(username);
      if (!user) throw new Error('Usuario no encontrado')
      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) throw new Error('password is invalid') 

      const token = jwt.sign(
        { id:user._id, fullname:user.fullname, username: user.username, email: user.email },
         SECRET_JWT_KEY,
         {
          expiresIn: '1h'
         })
      
      res.cookie('access-token',token, {
        httpOnly: true, //La cookie solo se puede acceder en el servidor
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      }).send({
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      });
    } catch (err) {
      res.status(401).send({ error: true, message: err.message });
    }
  },
  logout: (req, res) => {
    res.clearCookie('access-token').send({message: 'Logout successfully'})
  },
  createUser: async (req, res) => {
    const { username, password, email, fullname, role } = req.body

    if (typeof password != 'string') throw new Error('El password ha de ser un string.')

    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS)

    const user = new User({ username, password: hashedPassword, email, fullname, role });

    try {
      const newUser = await user.save();
      res.status(201).send(newUser);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  },
  checkAuth: async (req, res) => {
    const token = req.cookies['access-token']

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
  }

  // Verificar el JWT
  jwt.verify(token, SECRET_JWT_KEY, (err, user) => {
      if (err) {
          return res.status(401).json({ message: 'Invalid token' });
      }
      // Si el token es válido, devolver éxito
      res.status(200).json({ message: 'Authenticated', user: user });
  });

  }
}

class Validation {
  static username(username){
   if (typeof username !== 'string') throw new Error("username must be a string")
   if (username.length < 3) throw new Error("username must be at least 3 characters long")
  }   

  static password(password) {
   if (typeof password !== 'string') throw new Error("password must be a string")
   if (password.length < 8) throw new Error("password must be at least 8 characters long")
  }
}
export default authController