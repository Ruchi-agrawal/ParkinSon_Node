const userSchema = require("../schema/userSchema")
const { encryptPassword, decryptPassword } = require('../utility/pwdHashing');
const { generateToken } = require("../config/auth")
const statusMessages = require("../config/appConstants")



const getOneUser = async (criteria, callback) => {
    try {
        const response = await userSchema.findById({ _id: criteria.id }).lean()
        if (response) {
            if (response.role === 'agent' && response.admin_id) {
                const responseAdmin = await userSchema.findById({ _id: response.admin_id })
                if (responseAdmin) {
                    response['assignedDevelopment'] = responseAdmin['assignedDevelopment'];
                    response['name'] = responseAdmin['name']
                    response['commission'] = responseAdmin['commission']
                    callback(null, response);
                }
            }
            else {
                callback(null, response);
            }

        } else {
            callback('user not found', false);
        }
    }
    catch (error) {
        throw error
    }
}
/**
 * 
 * @param {body of data} req 
 * @param {statusMessages} res 
 * Get one user
 */
const loginUser = async (req, res) => {
    let { email, password } = req.body
    try {
        await findUser(email, async (response) => {
            const email = req.body.email.toLowerCase();
            let token;
            if (response && response.email) {
                const { _id, role, firstName, lastName, countryCode } = response
                const hash = response.password
                const result = await decryptPassword(password, hash)
                token = await generateToken(email, _id, role)
                if (result === true && token !== '') {
                    let data = { email: email, id: _id, token: token, userType: role, firstName, lastName, countryCode }
                    statusMessages.SUCCESS_MSG.SUCCESS.data = data
                    res.json(statusMessages.SUCCESS_MSG.SUCCESS);
                }
                else {
                    res.json(statusMessages.ERROR_MSG.PWD_NOT_MATCH);
                }
            }
            else {
                res.json(statusMessages.ERROR_MSG.EMAIL_NOT_FOUND);
            }
        });
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = error
        res.json(statusMessages.ERROR_MSG.IMP_ERROR);
    }
}

const findUser = async (email, callback) => {
    try {
        const response = await userSchema.findOne({ email: email })
        if (response) {
            callback(response);
        } else {
            callback(false);
        }
    }
    catch (error) {
        throw error
    }
}

const saveUser = async (req, res) => {
    try {
        let { userId } = req.body
        let values = {
            userId, email: userId, isBlocked: false
        }
        userSchema.find({ userId }).then(async (data) => {
            if (data && data.length > 0) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = data
                res.json(statusMessages.SUCCESS_MSG.SUCCESS);
            } else {
                var user = userSchema(values)
                var data = await user.save()
                statusMessages.SUCCESS_MSG.SUCCESS.data = data
                res.json(statusMessages.SUCCESS_MSG.SUCCESS);
            }
        })
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = error
        res.json(statusMessages.ERROR_MSG.IMP_ERROR);
    }
}


const listUser = async (req, res) => {
    try {
        let { user_profile } = req.body
        let response = await userSchema.find({ type: "user" })
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS);
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = error
        res.json(statusMessages.ERROR_MSG.IMP_ERROR);
    }
}

const checkUserStatus = async (req, res) => {
    try {
        console.log("USERID", req.body)
        let { userId } = req.body;
        let response = await userSchema.find({ userId }, ("isBlocked blockedAt"))
        statusMessages.SUCCESS_MSG.SUCCESS.data = response
        res.json(statusMessages.SUCCESS_MSG.SUCCESS);

    } catch (err) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = err
        res.json(statusMessages.ERROR_MSG.IMP_ERROR);
    }
}

const blockUser = async (req, res) => {
    try {
        let { userId, event } = req.body
        let data
        if (event == "block") {
            data = {
                isBlocked: true,
                blockedAt: new Date().getTime()
            }
        } else {
            data = { isBlocked: false }
        }
        console.log(data)
        let response = await userSchema.findOneAndUpdate({ userId }, data)
        statusMessages.SUCCESS_MSG.SUCCESS.data = response
        res.json(statusMessages.SUCCESS_MSG.SUCCESS);
    } catch (err) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = err
        res.json(statusMessages.ERROR_MSG.IMP_ERROR);
    }
}


const checkAllUserStatus = async (req, res) => {
    try {
        let { allUserID } = req.body;
        let response = await userSchema.find({ "userId": { $in: allUserID } }, ('isBlocked blockedAt userId'));
        let result = []
        if (response.length > 0) {
            result = response.filter(resp => {
                return resp.isBlocked
            })
        }
        statusMessages.SUCCESS_MSG.SUCCESS.data = result
        res.json(statusMessages.SUCCESS_MSG.SUCCESS);

    } catch (err) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = err
        res.json(statusMessages.ERROR_MSG.IMP_ERROR);
    }
}

changeAdminPassord = async (req, res) => {
    try {
        let password = req.headers.new_password
        let encrypted = await encryptPassword(password)
        let response = await userSchema.findOneAndUpdate({"email":"superadmin@gmail.com"}, {"password":encrypted})
        statusMessages.SUCCESS_MSG.SUCCESS.data = response
        res.json(statusMessages.SUCCESS_MSG.SUCCESS);
    } catch (err) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = err
        res.json(statusMessages.ERROR_MSG.IMP_ERROR);
    }
}

module.exports = {
    loginUser,
    saveUser,
    listUser,
    getOneUser,
    blockUser,
    checkUserStatus,
    checkAllUserStatus,
    changeAdminPassord
}