// Import necessary modules
const express = require("express");
const cors = require("cors");
const openai = require("./config/openai");

// Create Express app instance
const app = express();

// Enable CORS middleware
app.use(cors());

// Enable JSON request parsing middleware
app.use(express.json());

// Set up route for testing
app.get("/test", (req, res) => {
    res.send("Hello World!");
});

// Set up route for POST requests to test endpoint
app.post("/test", (req, res) => {
    res.send("Hello World!");
});

// Set up route for moderation requests
app.post("/moderation", async (req, res) => {
    // Extract userId and message from request body
    const { userId, message } = req.body;
    
    // Call OpenAI moderation API and send response to client
    const moderationResult = await runModeration(message, userId);
    res.send(moderationResult);
});

// Function to call OpenAI moderation API
async function runModeration(message, userId) {
    try {
      const response = await openai.createModeration({
        input: message,
        user: userId,
      });
      return response.data.results[0];
    } catch (err) {
      console.error(err);
      throw new Error("An error occurred while moderating the message");
    }
}

// Export app instance for use in other modules
module.exports = app;
