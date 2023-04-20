const openai = require("../config/openai");

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
module.exports = { runModeration };