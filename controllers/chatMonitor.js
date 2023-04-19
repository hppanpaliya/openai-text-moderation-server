const firebase = require("../config/firebase");
const openai = require("../config/openai");
const sendSelfHarmEmail = require("./selfHarmEmail");

// Define function to monitor chat collections
async function monitorChatCollections() {
  // Get Firestore database instance
  const db = firebase.firestore();

  // Get all group documents
  const groupQuerySnapshot = await db.collection("groups").get();

  // Iterate over each group
  groupQuerySnapshot.forEach((groupDoc) => {
    // Get group ID and chats collection reference
    const groupId = groupDoc.id;
    const chatsRef = db.collection("groups").doc(groupId).collection("chats");

    // Set up listener for new chats
    chatsRef.onSnapshot(async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          // Extract chat data from snapshot
          const chatData = change.doc.data();
          const chatText = chatData.text;
          const userId = chatData.userId;
          const isFlagged = chatData.isFlagged;

          // Check if the isFlagged field is present in the document
          if (isFlagged === undefined) {
            try {
              // Call moderation API to analyze chat content
              const moderationResult = await runModeration(chatText, userId);

              // Extract flagged and self-harm category information from moderation result
              const flagged = moderationResult.flagged;
              const selfHarmCategory = moderationResult.categories["self-harm"];

              // Log chat information and moderation result
              console.log(chatText, userId, flagged);
              console.log(selfHarmCategory, "self harm", flagged, "flagged" );
              
              // If chat contains self-harm content and is flagged, send email notification to user
              if (flagged === true && selfHarmCategory) {
                await sendSelfHarmEmail.sendSelfHarmEmail(userId);
              }
            
              // Update the isFlagged field based on the result
              await change.doc.ref.update({ isFlagged: flagged });
            } catch (error) {
              console.error(error);
            }
          }
        }
      });
    });
  });
}

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

// Export monitorChatCollections function for use in other modules
module.exports = {
  monitorChatCollections,
};
