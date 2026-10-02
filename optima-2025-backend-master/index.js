const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

require("dotenv").config();

const app = express();

// Use the PORT environment variable or default to 5000 if not set
const PORT = process.env.PORT || 5000;

// Middleware to enhance security by setting various HTTP headers
app.use(helmet());
// Middleware to compress responses to improve performance
app.use(compression());

// Use logging middleware depending on the environment
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS setup to allow or restrict requests from specific origins
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || "*" }));

// MongoDB connection using Mongoose, using environment variables for the URI
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false, // Prevents index creation in production for performance reasons
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(process.env.MONGO_URI);
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the application on failure to connect
  });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Optima 2027 Backend API",
    status: 200,
  });
});

const CARegistrationRoute = require("./routes/ca");
app.use("/ca", CARegistrationRoute);

const Admin = require("./routes/admin");
app.use("/admin", Admin);

const UserRoute = require("./routes/user");
app.use("/user", UserRoute);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    status: 404,
  });
});

// Start the server, listening on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Add this line at the end
module.exports = app;
