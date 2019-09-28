const crypto = require('crypto')


const userUtils = {
    genRandomString: function (length) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString("hex") /*convert to hexa fomat*/
            .slice(0, length); /*return required number of character */
    },
    sha512: function (password, salt) {
        const hash = crypto.createHmac("sha512", salt); //Use SHA512
        hash.update(password);
        const value = hash.digest('hex');
        return {
            salt: salt,
            passwordHash: value
        }
    },
    saltHashPassword: function (userPassword) {
        const salt = this.genRandomString(16); //gen random string with 16 character to salt
        const passwordData = this.sha512(userPassword, salt);
        return passwordData;
    },
    checkHashPassword: function (userPassword, salt) {
        const passwordData = this.sha512(userPassword, salt);
        return passwordData;
    }
}

module.exports = userUtils