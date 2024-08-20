import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SALT_ROUNDS } from '../config.js';

const authController = {

  login: async (req, res) => {
    const { username, password } = req.body
    try {
      const user = await User.findByUsername(username);
      const token = jwt.sign({ id: user._id, username: user.username })
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createUser: async (req, res) => {
    const { username, password, email, fullname, role } = req.body

    if (typeof password != 'string') throw new Error('El password ha de ser un string.')

    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS)

    const user = new User({ username, password: hashedPassword, email, fullname, role });

    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default authController