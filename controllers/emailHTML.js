const mjml2html = require('mjml');

function emailHTML(username) {
  let mail = 
  `<mjml>
    <mj-head>
      <mj-attributes>
        <mj-text font-family="Arial, sans-serif" font-size="16px" color="#333333" />
        <mj-button font-family="Arial, sans-serif" font-size="16px" background-color="#2196F3" color="white" />
      </mj-attributes>
      <mj-style>
        .container {
          padding: 30px 15px;
        }
        .cta {
          display: inline-block;
          padding: 12px 25px;
          text-decoration: none;
          border-radius: 4px;
        }
      </mj-style>
    </mj-head>
    <mj-body>
      <mj-section background-color="#f0f0f0" padding="0">
        <mj-column>
          <mj-image src="https://www.cdc.gov/suicide/images/suicide-twitter-fb-1200x675-2-large.png" alt="Support Image" />
          <mj-text align="center" font-size="28px" font-weight="bold">We're Here to Help You</mj-text>
          <mj-text>Hello ${username},</mj-text>
          <mj-text>We wanted to reach out to you because we noticed that a message you posted in the chat group was flagged for concerning content. We care about your well-being and want you to know that we're here to support you.</mj-text>
          <mj-text>Please remember that you're not alone, and there are resources available to help you. If you need someone to talk to, please don't hesitate to reach out to us or to the various support services we've listed below.</mj-text>
          <mj-text>Contact the <strong>988 Suicide and Crisis Lifeline</strong> if you are experiencing mental health-related distress or are worried about a loved one who may need crisis support. Call or text <strong>988</strong>, or chat at <a href="https://988lifeline.org/">988lifeline.org</a>. Connect with a trained crisis counselor. 988 is confidential, free, and available 24/7/365. Visit the 988 Suicide and Crisis Lifeline for more information at <a href="https://988lifeline.org/">988lifeline.org</a>.</mj-text>
          <mj-text>For veterans in need of support, connect with the <strong>Veterans Crisis Line</strong> to reach caring, qualified responders with the Department of Veterans Affairs: Call 988 then press 1, text 838255, or chat online at <a href="https://www.veteranscrisisline.net/get-help/chat">www.veteranscrisisline.net/get-help/chat</a>.</mj-text>
          <mj-text>Find tips for coping with stress for adults, teens, children, and school personnel at <a href="https://www.cdc.gov/violenceprevention/publichealthissue/copingwith-stresstips.html">Coping with Stress Tips</a>.</mj-text>
          <mj-button href="https://suicidepreventionlifeline.org/" class="cta">Get Help Now</mj-button>
          <mj-text>Remember, you are not alone, and there are people who care about your well-being. We encourage you to utilize these resources and reach out to friends, family, or mental health professionals for support.</mj-text>
          <mj-text>Take care, and please do not hesitate to contact us if you need further assistance.</mj-text>
          <mj-text><a href="https://harshal.codes/">Mental Health Support App</a></mj-text>
        </mj-column>
  </mj-section>
  </mj-body>
  </mjml>
  `
  return mjml2html(mail).html;
}

module.exports = { emailHTML };