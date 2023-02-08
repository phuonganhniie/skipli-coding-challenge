const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, child, get } = require('firebase/database');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASURE_ID,
    "databaseURL": process.env.FIREBASE_DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Create new access code
const createAndSaveAccessCode = async(phoneNumber) => {
    const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
    try {
        await set(ref(db, `/phoneNumbers/${phoneNumber}`), { accessCode });
        return accessCode;
    } catch (error) {
        throw error;
    }
};

// Validate access code
const validateAccessCode = async(phoneNumber, accessCode) => {
    try {
        let storedAccessCode;
        await get(child(ref(db), `/phoneNumbers/${phoneNumber}`)).then((code) => {
            if (code.exists) {
                storedAccessCode = code.val();
            } else {
                return { error: 'Data is not available' };
            }
        })

        if (storedAccessCode.accessCode === accessCode) {
            await set(ref(db, `/phoneNumbers/${phoneNumber}`), '');
            return { success: true };
        } else {
            return { error: 'Invalid access code' };
        }
    } catch (error) {
        throw error;
    }
};

// Add github users to favorites list
const addGithubUserToFavorites = async(phoneNumber, githubUserId, userProfile) => {
    // Check if the phone number exists in the database
    const phone = await get(child(ref(db), `phoneNumbers/${phoneNumber}`));
    if (!phone.exists()) {
        return {
            success: false,
            message: 'Phone number is not registered'
        };
    }

    // Add the Github user id to the user's list of liked profiles
    const listRef = ref((db), `favorite_github_users/${phoneNumber}`);
    await set(child(listRef, `${githubUserId}`), userProfile)
    return {
        success: true,
        message: "Github user added to the favorite list."
    };
}

const getUserProfile = async(encodePhoneNumber) => {
    const phoneNumber = decodeURIComponent(encodePhoneNumber);

    // Check if the phone number exists in the database
    const phone = await get(child(ref(db), `phoneNumbers/${phoneNumber}`));
    if (!phone.exists()) {
        return {
            success: false,
            message: 'User not found or not registered'
        };
    }

    // Get favorite list github users
    const users = await get(child(ref(db), `/favorite_github_users/${phoneNumber}`));
    if (users.exists) {
        return users.val();
    } else {
        return { error: 'Data is not available' };
    }
}

module.exports = {
    createAndSaveAccessCode,
    validateAccessCode,
    addGithubUserToFavorites,
    getUserProfile
};