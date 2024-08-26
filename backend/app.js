// app.js
import express from 'express';
import { PORT, SECRET_JWT_KEY } from './config.js';
import cors from 'cors';
import mongoose from 'mongoose';
import membersRouter from './routes/members.js';
import groupsRouter from './routes/groups.js';
import meetingsRouter from './routes/meetings.js';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';

const API_PORT = process.env.PORT ?? 3001;

const app = express();
app.use(cors({
  origin: `http://localhost:5173`,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())

app.use((req, res, next) => {
    const token = req.cookies.access_token

    req.session = {user: null}
    try {
      const data = jwt.verify(token, SECRET_JWT_KEY)
      req.session.user = data
    } catch {}
    next()
})


// Conectar a MongoDB
mongoose.connect('mongodb://localhost/comites_db');

app.use('/api/members', membersRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/meetings', meetingsRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server running on port ${API_PORT}`));