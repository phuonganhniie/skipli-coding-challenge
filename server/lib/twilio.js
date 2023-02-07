const twilio = require('twilio')

// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const sendSMS = (to, message) => {
    client.messages
        .create({
            to: to,
            from: from,
            body: message
        })
        .then(message => {
            console.log("Twilio message SID: ", message.sid);
        })
}

module.exports = {
    sendSMS
}