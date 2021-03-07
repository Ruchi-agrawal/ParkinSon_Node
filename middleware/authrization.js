const statusMessages = require('../config/appConstants')
const token = require('../config/auth');
const { getOneUser } = require('../controller/userController')

module.exports = async (req, res, next) => {
    try {
        const legit = await token.checkToken(req.headers.token);
        console.log("legit", legit)
        if (legit && legit.success === true) {
            const { user_token } = legit
            const role = user_token.role.toLowerCase()
            const { id } = legit.user_token;
            req.body.useridOrg = user_token.id
            await getOneUser(user_token, (error, response) => {
                if (error) {
                    statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG.error = error
                    res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG);
                }
                if (response) {
                    const newId = response._id === id
                    if (response._id == id) {
                        req.body.user_profile = response
                        next()
                    }
                    else {
                        res.json(statusMessages.ERROR_MSG.UNAUTHORIZATION_ACCESS);
                    }
                }
            })

        }
        else {
            res.json(statusMessages.ERROR_MSG.UNAUTHORIZATION_ACCESS);
        }
    }
    catch (error) {
        res.json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}