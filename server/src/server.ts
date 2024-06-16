import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose, { MongooseError } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import  router from './routes/userRoutes';

dotenv.config();

const app: Express = express();
const PORT: number | string = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI!)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/users', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.use((req: Request, res: Response) => {
  res.status(404).send('404 Not Found');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
