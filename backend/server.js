import express from 'express';
import { connect, connection } from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(json());
app.use(cors());

// Connect to MongoDB
connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

const db = connection;
db.once('open', () => console.log('Connected to MongoDB'));

// Define routes
app.get('/', (req, res) => res.send('Hello World'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
