const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/appConfig');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
    res.json({ success: true, token, user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.create({ username, password });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'DB error or username taken' });
  }
};
