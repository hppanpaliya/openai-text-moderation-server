const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors'); // Import the cors middleware
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();

// Use the cors middleware to enable CORS
app.use(cors({
    origin: 'https://www.harshal.codes'
  }));
  
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.post('/moderate', (req, res) => {
  const { userId, message } = req.body;
  runModeration(message, userId)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred while moderating the message");
    });
});

async function runModeration(message, userId) {
  try {
    const response = await openai.createModeration({
      input: message,
      user: userId,
    });
    console.log(message, userId);
    console.log(response.data.results);
    return response.data.results[0];
  } catch (err) {
    console.error(err);
    throw new Error("An error occurred while moderating the message");
  }
}


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
