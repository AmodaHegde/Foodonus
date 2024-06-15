import express, { json } from 'express';
import connectDB from './config/db';
import cors from 'cors';
import { resolve } from 'path';

const app = express();

const path = require('path');

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/', require('./routes/index'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build') );

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
