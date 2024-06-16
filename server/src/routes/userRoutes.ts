import express, { Request, Response } from 'express';
import { User } from '../models/User';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({ username, password, email });
    await newUser.save();
    console.log(`New user registered: ${newUser.username}`);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    if (err instanceof mongoose.Error && err.message.includes('E11000 duplicate key error')) {
      return res.status(400).json({ error: 'Duplicate email', message: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    // Логика входа пользователя
    console.log('User logged in');
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/send-message', async (req: Request, res: Response) => {
  try {
    // Логика отправки сообщения
    const { message } = req.body;
    console.log(`Message sent: ${message}`);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
