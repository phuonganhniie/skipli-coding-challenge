import axios from 'axios';

const DEFAULT_HOST_URL = 'http://192.168.1.101:3003'

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