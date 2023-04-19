const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Set up OpenAI API configuration using API key from environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create OpenAI API instance using configuration
const openai = new OpenAIApi(configuration);

// Export OpenAI API instance for use in other modules
module.exports = openai;
