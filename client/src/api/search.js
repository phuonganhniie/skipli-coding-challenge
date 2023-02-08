import axios from 'axios';

const DEFAULT_HOST_URL = 'http://localhost:3003'

export const searchGithubUsers = async(q, page, per_page) => {
    try {
        const response = await axios.get(DEFAULT_HOST_URL + '/github/search-github-users', {
            params: {
                q,
                page,
                per_page
            },
        });
        return response.data.users;
    } catch (error) {
        throw error;
    }
}