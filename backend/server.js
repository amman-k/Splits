// backend/server.js

// Import required packages
const express = require('express');
const cors = require('cors');
// Configure environment variables
require('dotenv').config();
// Import database connection function
const connectDB = require('./config/db');

// --- Connect to Database ---
// Execute the database connection
connectDB();

// --- Basic Setup ---
const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());

app.use(express.json());

// --- Define API Routes ---
app.use('/', require('./routes/index'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/auth', require('./routes/auth'));




// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
