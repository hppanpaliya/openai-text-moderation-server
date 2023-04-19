const sgMail = require("@sendgrid/mail");
const firebase = require("../config/firebase");
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
  const msg = {
    to: email,
    from: process.env.ADMIN_EMAIL,
    subject: `We're here to help you`,
    text: `Hello ${name}, we noticed that a message you posted in the chat group was flagged for concerning content. We want you to know that we care about you and are here to support you. Please know that you are not alone and that there are resources available to help you. If you need someone to talk to, please don't hesitate to reach out.`,
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>We're Here to Help You</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            color: #333;
            line-height: 1.5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }
          h1 {
            font-size: 24px;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            margin-bottom: 10px;
          }
          .cta {
            background-color: #4caf50;
            color: #fff;
            display: inline-block;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
          .cta:hover {
            background-color: #3e8e41;
          }
          img {
            max-width: 100%;
            height: auto;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://www.cdc.gov/suicide/images/suicide-twitter-fb-1200x675-2-large.png" alt="Support Image">
          <h1>We're Here to Help You</h1>
          <p>Hello ${name},</p>
          <p>We noticed that a message you posted in the chat group was flagged for concerning content. We want you to know that we care about you and are here to support you.</p>
          <p>Please know that you are not alone and that there are resources available to help you. If you need someone to talk to, please don't hesitate to reach out.</p>
          <p>Contact the <strong>988 Suicide and Crisis Lifeline</strong> if you are experiencing mental health-related distress or are worried about a loved one who may need crisis support. Call or text <strong>988</strong>, or chat at <a href="https://988lifeline.org/">988lifeline.org</a>. Connect with a trained crisis counselor. 988 is confidential, free, and available 24/7/365. Visit the 988 Suicide and Crisis Lifeline for more information at <a href="https://988lifeline.org/">988lifeline.org</a>.</p>
          <p>For veterans in need of support, connect with the <strong>Veterans Crisis Line</strong> to reach caring, qualified responders with the Department of Veterans Affairs: Call 988 then press 1, text 838255, or chat online at <a href="https://www.veteranscrisisline.net/get-help/chat">www.veteranscrisisline.net/get-help/chat</a>.</p>
          <p>Find tips for coping with stress for adults, teens, children, and school personnel at <a href="https://www.cdc.gov/violenceprevention/publichealthissue/copingwith-stresstips.html">Copingwith Stress Tips</a>.</p>
          <a href="https://suicidepreventionlifeline.org/" class="cta">Get Help Now</a>
          <p>Remember, you are not alone, and there are people who care about your well-being. We encourage you to utilize these resources and reach out to friends, family, or mental health professionals for support.</p>
          <p>Take care, and please do not hesitate to contact us if you need further assistance.</p>
          <a href="https://harshal.codes/" >Mental Health Support App</a>
          </div>
          
            </body>
          </html>
    
    `,
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
