import { Router } from 'express';
const router = Router();
import auth from '../../middleware/auth';
import Message, { find } from '../../models/Message';

// @route   POST api/messages
// @desc    Send a message
// @access  Private
router.post('/', auth, async (req, res) => {
  const { receiver, content } = req.body;

  try {
    const newMessage = new Message({
      sender: req.user.id,
      receiver,
      content
    });

    const message = await newMessage.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/messages
// @desc    Get all messages for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const messages = await find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }]
    }).populate('sender receiver', ['name']);
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
