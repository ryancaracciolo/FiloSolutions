import express from 'express'; // express is a web framework for Node.js
import bodyParser from 'body-parser'; // body-parser is a middleware used to parse incoming request bodies in a middleware before your handlers, available under the req.body property
import cors from 'cors'; // CORS (Cross-Origin Resource Sharing) is a middleware for Express that allos backend to accept requests from frontend running on a different origin
import dotenv from 'dotenv'; // this is a package that loads environment variables from a .env file into process.env. (purpose is to keep sensitive data like API keys, passwords, etc. out of the codebase)
import businessRoutes from './routes/businessRoutes.js';
import partnershipRoutes from './routes/partnershipRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import waitlistRoutes from './routes/waitlistRoutes.js';



// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));
// Routes
app.use('/api/businesses', businessRoutes);
app.use('/api/partnerships', partnershipRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/waitlist', waitlistRoutes);




// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});