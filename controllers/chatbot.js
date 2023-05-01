const { Configuration, OpenAIApi } = require("openai");
const firebase = require("../config/firebase");
const db = firebase.firestore();


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chatHistory = {};

async function saveUsageData(userId, usage) {
  try {
    const usageRef = db.collection("usage_data").doc(userId);
    const doc = await usageRef.get();
    if (doc.exists) {
      await usageRef.update({
        prompt_tokens: firebase.firestore.FieldValue.increment(usage.prompt_tokens),
        completion_tokens: firebase.firestore.FieldValue.increment(usage.completion_tokens),
        total_tokens: firebase.firestore.FieldValue.increment(usage.total_tokens),
      });
    } else {
      await usageRef.set(usage);
    }
  } catch (error) {
    console.error("Firestore error:", error);
  }
  try {
    const usageRef = db.collection("usage_data").doc("Total Usage");
    const doc = await usageRef.get();
    if (doc.exists) {
      await usageRef.update({
        prompt_tokens: firebase.firestore.FieldValue.increment(usage.prompt_tokens),
        completion_tokens: firebase.firestore.FieldValue.increment(usage.completion_tokens),
        total_tokens: firebase.firestore.FieldValue.increment(usage.total_tokens),
      });
    } else {
      await usageRef.set(usage);
    }
  } catch (error) {
    console.error("Firestore error:", error);
  }
}

async function checkUsageData(userId) {
  try {
    const usageRef = db.collection("usage_data").doc(userId);
    const doc = await usageRef.get();
    if (doc.exists) {
      const userData = doc.data();
      return userData.total_tokens;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Firestore error:", error);
    return -1;
  }
}



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
    // return {
    //   success: true,
    //   message: "Hello there! I'm sorry to inform you that I am currently offline and unavailable to provide support at the moment. Unfortunately, my developer, Harshal, did not add the necessary API keys to save tokens, which has caused my temporary outage. As a Mental Health Support AI Therapist, my goal is to actively listen, empathize, and guide you through challenges related to your emotional well-being and mental health. I specialize in providing a secure and empathetic space for you to share your concerns, and I am here to support you without diagnosing or treating medical conditions. Please feel free to come back and talk to me when I am online again. I apologize for any inconvenience this may have caused, and thank you for your patience. Take care of yourself!",
    // };
  }
    
  if (chatHistory[userId] && chatHistory[userId].length > 10) {
    // remove chat history of user with too many messages
    delete chatHistory[userId];
  }

  const userTotal = await checkUsageData(userId);
  const totalUsage = await checkUsageData("Total Usage");

  console.log("User Total:", userTotal);

  if (userTotal < 0) {
    return {
      success: false,
      message: "An error occurred while checking token usage.",
    };
  } else if (userTotal >= 2500) {
    return {
      success: false,
      message: "Token limit reached.",
    };
  }

  if (totalUsage < 0) {
    return {
      success: false,
      message: "An error occurred while checking api token usage.",
    };
  } else if (totalUsage >= 100000) {
    return {
      success: false,
      message: "End of Free tokens.",
    };
  }
  

  try {
    if (!chatHistory[userId]) {
      chatHistory[userId] = [
        {
          role: "system",
          content:
            "As a Mental Health Support AI Therapist, I specialize in providing a secure and empathetic space for users to share their concerns. My goal is to actively listen, empathize, and guide users through challenges like stress, anxiety, depression, relationships, and personal growth. I customize my responses based on individual circumstances, offering valuable insights and tools to enhance emotional well-being and mental health. Keep your answers short and to the point, my responses are limited to 70 words, Most upto 2 sentences maximum.",
        },
      ];
    }

    chatHistory[userId].push({ role: "user", content: message });
    console.log(chatHistory);


    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatHistory[userId],
      user: userId,
      temperature: 0,
      max_tokens: 500,
    });
    

    if (response.data.choices && response.data.choices.length > 0) {
      const assistantMessage = response.data.choices[0].message.content;
      chatHistory[userId].push({ role: "assistant", content: assistantMessage });

      await saveUsageData(userId, response.data.usage);

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
