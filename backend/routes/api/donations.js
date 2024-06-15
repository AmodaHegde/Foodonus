import { Router } from 'express';
const router = Router();
import auth from '../../middleware/auth';
import Donation, { find, findById } from '../../models/Donation';

// @route   POST api/donations
// @desc    Create a donation
// @access  Private
router.post('/', auth, async (req, res) => {
  const { description, location } = req.body;

  try {
    const newDonation = new Donation({
      donor: req.user.id,
      description,
      location
    });

    const donation = await newDonation.save();
    res.json(donation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/donations
// @desc    Get all donations
// @access  Public
router.get('/', async (req, res) => {
  try {
    const donations = await find().populate('donor', ['name']);
    res.json(donations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/donations/:id
// @desc    Get donation by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const donation = await findById(req.params.id).populate('donor', ['name']);

    if (!donation) {
      return res.status(404).json({ msg: 'Donation not found' });
    }

    res.json(donation);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Donation not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/donations/:id
// @desc    Delete a donation
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const donation = await findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ msg: 'Donation not found' });
    }

    // Check user
    if (donation.donor.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await donation.remove();

    res.json({ msg: 'Donation removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Donation not found' });
    }
    res.status(500).send('Server error');
  }
});

export default router;
