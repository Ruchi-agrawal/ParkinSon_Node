const bcrypt = require('bcrypt');

generateSalt = async () => {
    return Math.floor(Math.random() * (10 - 6 + 1) + 6);
}

module.exports = {
    async encryptPassword(data) {
        try {
            const saltRounds = await generateSalt()
            const hash = await bcrypt.hash(data, saltRounds);
            if (hash) {
                return hash;
            }
            else {
                return false
            }
        }
        catch (error) {
            return error
        }
    },

    async decryptPassword(password, hash) {
        try {
            const match = await bcrypt.compare(password, hash)
            if (match) {
                return match
            }
            else {
                return false
            }
        }
        catch (error) {
            return error
        }
    }
}