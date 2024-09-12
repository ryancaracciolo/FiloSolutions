import express from 'express'; // express is a web framework for Node.js
import bodyParser from 'body-parser'; // body-parser is a middleware used to parse incoming request bodies in a middleware before your handlers, available under the req.body property
import cors from 'cors'; // CORS (Cross-Origin Resource Sharing) is a middleware for Express that allos backend to accept requests from frontend running on a different origin
import dotenv from 'dotenv'; // this is a package that loads environment variables from a .env file into process.env. (purpose is to keep sensitive data like API keys, passwords, etc. out of the codebase)
import itemRoutes from './routes/itemRoutes.js'; // import the routes from itemRoutes.js
import userRoutes from './routes/userRoutes.js'; // import the routes from userRoutes.js

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// test commit