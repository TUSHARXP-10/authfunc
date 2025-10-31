const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');

// Load passport config
require('./config/passport')(passport);

dotenv.config();

// Connect to database (will continue even if MongoDB is not available)
connectDB().then((connected) => {
  if (connected) {
    console.log('Database connection established');
  } else {
    console.log('Running without database - authentication features disabled');
  }
}).catch(err => {
  console.error('Database connection failed:', err.message);
});

const app = express();
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
}));

// Body parser
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/search'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});