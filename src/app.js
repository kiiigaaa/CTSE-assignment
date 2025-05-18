// src/app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
app.use(cors());
app.use(express.json());

// load your Swagger spec
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// mount your auth API
app.use('/api/auth', authRoutes);

// health‑check for Docker & tests
app.get('/health', (_req, res) => res.send('OK'));

module.exports = app; //
