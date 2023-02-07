const express = require('express');
const { SearchUsers, UserProfile, instance } = require('../modules/github');
const { formatPhoneNumber } = require('../modules/phone-number-format');
const router = express.Router();

// Route for searching Github users based on the search term
// - Parameters:
//      - q: string, the search term for Github users. Required
//      - page: integer, the page number for the search results. Optional, default is 1
//      - per_page: integer, the number of results per page. Optional, default is 20
// - Returns:
//      - Array: an array of objects representing the Github users whose login name contain the search term
// - Throws:
//      - Error: "Search term is required." if q parameter is not provided
//      - Error: "Page must be a positive integer." if page parameter is not a positive integer
//      - Error: "Results per page must be a positive integer." if per_page parameter is not a positive integer
//      - Error: "Failed to fetch Github users." if there is an issue fetching the Github users from the API endpoint.
router.get('/github/search-github-users', async(req, res) => {
    const q = req.query.q;
    const page = req.query.page;
    const per_page = req.query.per_page;
    const githubUsers = new SearchUsers();

    // Validate the search term
    if (!q) {
        return res.status(400).send({ error: 'Search term is required' });
    }

    // Search for Github users
    try {
        const users = await githubUsers.search(q, page, per_page);
        res.json({ users });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

// Route to find a Github user profile by Github username
// - Parameters:
//    - github_user_id: string, the Github username
// - Returns:
//    - Object: containing profile details, including login, id, avatar_url, html_url, public_repos, followers
// - Throws:
//    - Error: 'User not found' if the user is not found in Github API
//    - Error: error message from Github API if there's any error response from the API
//    - Error: Server error if there's any internal server error
router.get('/github/find-github-user-profile/:github_user_id', async(req, res) => {
    const username = req.params.github_user_id;
    const user = new UserProfile();

    // Validate the username term
    if (!username) {
        return res.status(400).send({ error: 'Github user id is required' });
    }

    // Get Github user profile
    try {
        const userProfile = await user.getUserProfile(username);
        return res.status(200).send(userProfile);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(500).send({ error: error.message });
    }
});

// Route for liking Github users
// - Parameters:
//      - phoneNumber: string, the phone number of the user who wants to like the Github user. Required.
//      - githubUsername: string, the Github username of the user to be liked. Required.
// - Returns:
//      - Object:
//          - success: boolean, indicating whether the operation was successful.
//          - message: string, providing additional information about the operation result.
// - Throws:
//      - Error: "Phone number and Github user id are required." if phoneNumber or githubUsername parameters are not provided.
//      - Error: "User not found." if the Github user could not be found.
//      - Error: "Error message" if there is an issue with liking the Github user.
router.post('/github/like-github-user', async(req, res) => {
    let phoneNumber = req.body.phoneNumber;
    const githubUsername = req.body.githubUsername;

    // Validate phone number and Github user id
    if (!phoneNumber || !githubUsername) {
        return res.status(400).send({
            success: false,
            message: 'Phone number and Github user id are required.'
        });
    }

    // Add favorites Github users
    try {
        phoneNumber = formatPhoneNumber(phoneNumber);
        const response = await instance.likeUser(phoneNumber, githubUsername)
        if (response.success === false) {
            return res.status(400).send(response);
        }
        return res.status(200).send(response);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        return res.status(500).send({ error: error.message });
    }
})

module.exports = router;