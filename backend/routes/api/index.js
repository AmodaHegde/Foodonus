import { Router } from 'express';
const router = Router();

// Import all routes
import auth from './api/auth';
import users from './api/users';
import donations from './api/donations';
import requests from './api/requests';
import messages from './api/messages';

// Use routes
router.use('/api/auth', auth);
router.use('/api/users', users);
router.use('/api/donations', donations);
router.use('/api/requests', requests);
router.use('/api/messages', messages);

export default router;
