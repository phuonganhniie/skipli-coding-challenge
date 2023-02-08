const axios = require('axios');
const { addGithubUserToFavorites } = require('../db/firebase');

class SearchUsers {
    constructor() {
        // Define the Github API endpoint 
        this.GITHUB_SEARCH_USERS_API = 'https://api.github.com/search/users';

        // Define the default page number and results per page
        this.DEFAULT_PAGE = 1;
        this.DEFAULT_RESULTS_PER_PAGE = 10;
    }

    async search(q, page = this.DEFAULT_PAGE, per_page = this.DEFAULT_RESULTS_PER_PAGE) {
        try {
            const resp = await axios.get(this.GITHUB_SEARCH_USERS_API, {
                params: {
                    q,
                    page,
                    per_page
                }
            });

            const users = resp.data.items;

            const filteredUsers = users.filter(user => user.login.toLowerCase().includes(q.toLowerCase()));

            return filteredUsers;
        } catch (error) {
            throw new Error(`Failed to search Github users: ${error.message}`);
        }
    }
}

class UserProfile {
    constructor() {
        this.GITHUB_GET_USER_PROFILE = 'https://api.github.com/users/';
    }

    async getUserProfile(githubUserId) {
        try {
            const resp = await axios.get(this.GITHUB_GET_USER_PROFILE + `${githubUserId}`);
            const user = resp.data;

            const profile = {
                login: user.login,
                id: user.id,
                avatar_url: user.avatar_url,
                html_url: user.html_url,
                public_repos: user.public_repos,
                followers: user.followers
            };

            return profile;
        } catch (error) {
            throw error;
        }
    }
}

class LikeGithubUser {
    constructor() {
        if (!LikeGithubUser.instance) {
            LikeGithubUser.instance = this;
            this.GITHUB_GET_USER_PROFILE = 'https://api.github.com/users/';
        }

        return LikeGithubUser.instance;
    }

    async likeUser(phoneNumber, username) {
        try {
            const userProfile = await axios.get(this.GITHUB_GET_USER_PROFILE + `${username}`);

            const result = await addGithubUserToFavorites(phoneNumber, username, userProfile.data)
            return result;
        } catch (error) {
            throw error;
        }
    }
}

const instance = new LikeGithubUser();
Object.freeze(instance);

module.exports = {
    SearchUsers,
    UserProfile,
    instance
}