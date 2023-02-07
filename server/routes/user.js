const express = require('express');
const { createAndSaveAccessCode, validateAccessCode, getUserProfile } = require('../db/firebase');
const { formatPhoneNumber } = require('../modules/phone-number-format');
const { sendSMS } = require('../lib/twilio');
const router = express.Router();

// Route for requesting a new access code for a given phone number
//  - Parameters:
//      - phoneNumber: string, the phone number to create access code
//  - Returns:
//      - Object: { accessCode }, if create access code successfully
//  - Throws:
//      - Error: If request params is not valid or create access code is failed
router.post('/user/new-access-code', async(req, res) => {
    let phoneNumber = req.body.phoneNumber;

    // Validate the phone number
    if (!phoneNumber) {
        return res.status(400).send({ error: 'Phone number is required' });
    }

    try {
        phoneNumber = formatPhoneNumber(phoneNumber);
        console.log('Phone number: ', phoneNumber);

        // Create access code and send code to client
        const accessCode = await createAndSaveAccessCode(phoneNumber);
        const message = `Your access code is: ${accessCode}`;

        // send the message to the client
        await sendSMS(phoneNumber, message);

        return res.status(201).send({ accessCode });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

// Route for validate access code for the provided phone number
//  - Parameters:
//      - phoneNumber: string, the phone number to validate access code for
//      - accessCode: string, the access code to be validated
//  - Returns:
//      - Object: { success: true }, if validation is successful
//  - Throws:
//      - Error: "Access code is invalid." if access code is not valid
router.post('/user/validate-access-code', async(req, res) => {
    let phoneNumber = req.body.phoneNumber;
    const accessCode = req.body.accessCode;

    // Validate the phone number and access code request
    if (!phoneNumber) {
        return res.status(400).send({ error: 'Phone number is required' });
    }
    if (!accessCode) {
        return res.status(400).send({ error: 'Access code is required' });
    }

    // Validate access code
    try {
        phoneNumber = formatPhoneNumber(phoneNumber);
        const result = await validateAccessCode(phoneNumber, accessCode);
        res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

// Route for retrieving user profile based on phone number
// - Parameters:
//      - phone_number: string, the phone number of the user
// - Returns:
//      - Object: { "favorite_github_users": [{...}, {...}, ...] }, an array of objects representing the favorite GitHub users of the user
//      - An empty array if result is either null or an empty string
// - Throws:
//      - Error: "Phone number is required." if phone number is not provided
//      - Error: [error message], in case of any other error during retrieval of the user profile
router.get('/user/get-user-profile', async(req, res) => {
    let phoneNumber = encodeURIComponent(req.query.phone_number);

    // Validate the phone number
    if (!phoneNumber) {
        return res.status(400).send({ error: 'Phone number is required' });
    }

    try {
        let favArr = [];
        phoneNumber = formatPhoneNumber(phoneNumber);
        const result = await getUserProfile(phoneNumber);
        if (result !== null && result !== "") {
            Object.entries(result).forEach(([key, value]) => {
                favArr.push({
                    [key]: value
                });
            });
        } else {
            favArr = [];
        }
        return res.status(200).send({
            "favorite_github_users": favArr
        })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
})

module.exports = router;