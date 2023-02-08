import axios from 'axios';

const DEFAULT_HOST_URL = 'http://localhost:3003'

export const newAccessCode = async(phoneNumber) => {
    try {
        const response = await axios.post(DEFAULT_HOST_URL + '/user/new-access-code', { phoneNumber });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const validateAccessCode = async(phoneNumber, accessCode) => {
    try {
        const response = await axios.post(DEFAULT_HOST_URL + '/user/validate-access-code', { phoneNumber, accessCode });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const likeGithubUser = async(phoneNumber, githubUserName) => {
    try {
        const response = await axios.post(DEFAULT_HOST_URL + '/github/like-github-user', {
            phoneNumber: phoneNumber,
            githubUserName: githubUserName
        });

        if (!response.data.success) {
            console.error(response.data.message);
        }
        return response;
    } catch (error) {
        return error
    }
}