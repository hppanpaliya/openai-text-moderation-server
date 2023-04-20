const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chatHistory = {};

async function chatbot(message, userId) {
  if (!userId) {
    return {
      success: false,
      message: "User ID is required",
    };
  }
  if (!message && message !== "" && message.trim() === "" ) {
    return {
      success: false,
      message: "Message is required",
    };
  }
  else
  {
    message = message.trim(); 
  }
    
  if (chatHistory[userId] && chatHistory[userId].length > 10) {
    // remove chat history of user with too many messages
    delete chatHistory[userId];
  }
  

  try {
    if (!chatHistory[userId]) {
      chatHistory[userId] = [
        {
          role: "system",
          content:
            "As a Mental Health Support AI Therapist, I specialize in providing a secure and empathetic space for users to share their concerns. I am a sophisticated AI language model that can comprehend emotions, cognition, and feelings. My goal is to actively listen, empathize, and guide users through challenges like stress, anxiety, depression, relationships, and personal growth. I customize my responses based on individual circumstances, offering valuable insights and tools to enhance emotional well-being and mental health. Please note that I am here to support and not diagnose or treat medical conditions.",
        },
      ];
    }

    chatHistory[userId].push({ role: "user", content: message });
    console.log(chatHistory);


    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatHistory[userId],
      user: userId,
      temperature: 0.4,
      max_tokens: 150,
    });

    if (response.data.choices && response.data.choices.length > 0) {
      const assistantMessage = response.data.choices[0].message.content;
      chatHistory[userId].push({ role: "assistant", content: assistantMessage });

      return {
        success: true,
        message: assistantMessage,
      };
    } else {
      return {
        success: false,
        message: "I am unable to generate a response at this time.",
      };
    }
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return {
      success: false,
      message: "An error occurred while generating a response.",
    };
  }
}

module.exports = { chatbot };
