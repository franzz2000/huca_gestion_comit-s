// app.js
const express = require('express');
const mongoose = require('mongoose');
const membersRouter = require('./routes/members');
const committeesRouter = require('./routes/committees');
const meetingsRouter = require('./routes/meetings');

const app = express();

app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/comites_db');

app.use('/api/members', membersRouter);
app.use('/api/committees', committeesRouter);
app.use('/api/meetings', meetingsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));