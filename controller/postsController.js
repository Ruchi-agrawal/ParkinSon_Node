const postsSchema = require("../schema/postSchema")
const { v4: uuidv4 } = require('uuid');
const statusMessages = require("../config/appConstants")
/**
 * 
 * @param {body of data} req 
 * @param {statusMessages} res 
 * Add Posts to database
 */
const addPost = async (req, res) => {
    try {
        let postData = req.body
        postData.id = uuidv4();
        var Post = new postsSchema(postData)
        let response = await Post.save()
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        } else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = error.message
        res.json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

/**
 * 
 * @param {body of data} req 
 * @param {statusMessages} res 
 * Get (listing) Posts from database
 */
const getPosts = async (req, res) => {
    try {
        let { countryCode } = req.query
        let response
        if (countryCode) {
            console.log("countryCode", countryCode)
            response = await postsSchema.find({ countryCode })
        }
        else {
            response = await postsSchema.find({})
        }
        if (response) {
            if (response.length > 0) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = response
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            } else {
                res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
            }
        } else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WRONG_TO_GET_DATA)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG.error = error.message
        res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
    }
}

/**
 * 
 * @param {body of data} req 
 * @param {statusMessages} res 
 * Get one Posts from database
 */
const getOnePost = async (req, res) => {
    try {
        const { _id } = req.query
        let response = await postsSchema.find({ _id: _id })
        if (response) {
            if (response.length > 0) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = response
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            } else {
                res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
            }
        } else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WRONG_TO_GET_DATA)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG.error = error.message
        res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
    }
}

/**
 * 
 * @param {body of data} req 
 * @param {statusMessages} res 
 * Update Posts in database
 */

const updatePost = async (req, res) => {
    try {
        const { id } = req.query
        console.log("_id", id)
        const response = await postsSchema.findByIdAndUpdate({ _id: id }, req.body, { returnOriginal: false })
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        }
        else {
            res.json(statusMessages.ERROR_MSG.UNABLE_TO_UPDATE)
        }
    }
    catch (error) {
        statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG.error = error.message
        res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
    }
}

/**
* 
* @param {body of data} req 
* @param {statusMessages} res 
* Delete Posts in database
*/
const deletePost = async (req, res) => {
    try {
        const { id } = req.query
        let response = await postsSchema.findByIdAndDelete({ _id: id })
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        }
        else {
            res.json(statusMessages.ERROR_MSG.UNABLE_TO_DELETE)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = error.message
        res.json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const getCountriesCount = async (req, res) => {
    try {
        const { countryCode } = req.query
        let count = await postsSchema.countDocuments({ countryCode })
        if (count) {
            statusMessages.SUCCESS_MSG.SUCCESS.count = count
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        }
        else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = error.message
        res.json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const getCountries = async (req, res) => {
    try {
        let response = await postsSchema.aggregate([
            { "$group": { _id: "$countryCode", count: { $sum: 1 } } }
        ])
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        }
        else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = error.message
        res.json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

module.exports = {
    addPost,
    getPosts,
    getOnePost,
    deletePost,
    updatePost,
    getCountries,
    getCountriesCount
}