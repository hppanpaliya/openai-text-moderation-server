const sgMail = require("@sendgrid/mail");
const firebase = require("../config/firebase");
const {emailHTML} = require("./emailHTML");
const dotenv = require("dotenv");
dotenv.config();

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Define function to send self-harm email
async function sendSelfHarmEmail(uid) {
  // Get Firestore database instance and user data
  const db = firebase.firestore();
  const userDoc = await db.collection("users").doc(uid).get();
  const userData = userDoc.data();
  const email = userData.email;
  const name = userData.username;

  // Define email message

  let mailHTML = emailHTML(name);
  
  const msg = {
    to: email,
    from: process.env.ADMIN_EMAIL,
    subject: `We're here to help you`,
    text: `Hello ${name}, we noticed that a message you posted in the chat group was flagged for concerning content. We want you to know that we care about you and are here to support you. Please know that you are not alone and that there are resources available to help you. If you need someone to talk to, please don't hesitate to reach out.`,
    html: mailHTML,
  };

  // Send email using SendGrid API
  sgMail
    .send(msg)
    .then(() => {
      console.log(`Self-harm email sent to ${email}`);
    })
    .catch((error) => {
      console.error(error);
      throw new Error("An error occurred while sending the self-harm email");
    });
}

// Export sendSelfHarmEmail function for use in other modules
module.exports = { sendSelfHarmEmail };
