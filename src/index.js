// src/index.js
require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');   // <-- now just imports the bare app

const PORT = process.env.PORT || 5000;

// Only connect & listen when _not_ in test mode:
if (process.env.NODE_ENV !== 'test') {
  connectDB()
    .then(() => {
      console.log('MongoDB connected');
      app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
      );
    })
    .catch(err => {
      console.error('DB connection failed:', err.message);
      process.exit(1);
    });
}

module.exports = app;  // export for Supertest
