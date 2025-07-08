const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security-related HTTP headers
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Setup logging
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}
const accessLogStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream })); // Log to file
app.use(morgan('dev')); // Log to console (for development)


// Basic route
app.get('/', (req, res) => {
  res.send('WINS Backend API is running!');
});

// Import route files
const authRoutes = require('./src/routes/authRoutes');
const dealsRoutes = require('./src/routes/dealsRoutes');
const guidesRoutes = require('./src/routes/guidesRoutes');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/deals', dealsRoutes);
app.use('/api/guides', guidesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For potential testing or programmatic use
