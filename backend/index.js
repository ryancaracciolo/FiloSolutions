import express from 'express'; // express is a web framework for Node.js
import bodyParser from 'body-parser'; // body-parser is a middleware used to parse incoming request bodies in a middleware before your handlers, available under the req.body property
import cors from 'cors'; // CORS (Cross-Origin Resource Sharing) is a middleware for Express that allos backend to accept requests from frontend running on a different origin
import dotenv from 'dotenv'; // this is a package that loads environment variables from a .env file into process.env. (purpose is to keep sensitive data like API keys, passwords, etc. out of the codebase)
import businessRoutes from './routes/businessRoutes.js';
import partnershipRoutes from './routes/partnershipRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import demoRoutes from './routes/demoRoutes.js';



// Load environment variables
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });

// Initialize Express app
const app = express();
app.use(bodyParser.json());

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

app.use(cors({
  origin: function (origin, callback) {
    // Allow only the specified origins from the environment variable
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Routes
app.use('/api/businesses', businessRoutes);
app.use('/api/partnerships', partnershipRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/demo', demoRoutes);

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// Start the server if running locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Running in ${process.env.NODE_ENV} mode`);
  });
}

export default app;