// Importing required modules
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import morgan from 'morgan';

let users = [];

// Setting up Express app
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Middleware for logging requests
app.use(morgan('dev'));

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Add a new user
    const { username, email, password } = req.body;
    const newUser = { id: uuidv4(), username, email, password }; // Never store passwords as plain text in real apps.
    users.push(newUser);
    return res.status(201).json(newUser);
  } 
  if (req.method === 'GET') {
    // Get all users
    return res.status(200).json(users);
  }
  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
