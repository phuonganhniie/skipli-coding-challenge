const libphonenumber = require('google-libphonenumber');

const formatPhoneNumber = (phoneNumber, defaultCountry = 'VN') => {
    try {
        const phoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();
        let parsedNumber = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, defaultCountry);
        if (!phoneNumberUtil.isValidNumber(parsedNumber)) {
            parsedNumber = phoneNumberUtil.parseAndKeepRawInput(`+${phoneNumber}`, '');
            if (!phoneNumberUtil.isValidNumber(parsedNumber)) {
                throw new Error('Invalid phone number');
            }
        }
        return phoneNumberUtil.format(parsedNumber, libphonenumber.PhoneNumberFormat.INTERNATIONAL);
    } catch (error) {
        throw error;
    }
};

module.exports = { formatPhoneNumber };