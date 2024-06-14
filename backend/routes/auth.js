import { Router } from 'express';
import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User, { findOne } from '../models/User';

const router = Router();

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password, userType, location } = req.body;
  try {
    let user = await findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password, userType, location });

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    sign(payload, '40664c6b42aec20f2882167d6d390d6908fa755fe6631be8d0b3c749ac4a6797', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { user: { id: user.id } };
    sign(payload, '40664c6b42aec20f2882167d6d390d6908fa755fe6631be8d0b3c749ac4a6797', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
