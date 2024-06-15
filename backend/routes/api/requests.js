import { Router } from 'express';
const router = Router();
import auth from '../../middleware/auth';
import Request, { find, findById } from './models/Request';

// @route   POST api/requests
// @desc    Create a request
// @access  Private
router.post('/', auth, async (req, res) => {
  const { description, location } = req.body;

  try {
    const newRequest = new Request({
      receiver: req.user.id,
      description,
      location
    });

    const request = await newRequest.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/requests
// @desc    Get all requests
// @access  Public
router.get('/', async (req, res) => {
  try {
    const requests = await find().populate('receiver', ['name']);
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/requests/:id
// @desc    Get request by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const request = await findById(req.params.id).populate('receiver', ['name']);

    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    res.json(request);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Request not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/requests/:id
// @desc    Delete a request
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const request = await findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    // Check user
    if (request.receiver.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await request.remove();

    res.json({ msg: 'Request removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Request not found' });
    }
    res.status(500).send('Server error');
  }
});

export default router;
