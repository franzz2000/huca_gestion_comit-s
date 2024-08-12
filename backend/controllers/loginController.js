const User = require("../models/User");
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  const {username, password} = req.body
  try {
    const user = await User.findByUsername(username);
    const token = jwt.sign({id: user._id, username: user.username })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
