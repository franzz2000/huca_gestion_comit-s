// server.js
const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/personas', require('./routes/personas'));
app.use('/api/grupos', require('./routes/grupos'));
app.use('/api/reuniones', require('./routes/reuniones'));
app.use('/api/consultas', require('./routes/consultas'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));