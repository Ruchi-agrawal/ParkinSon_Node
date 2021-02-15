const express = require("express")
const router = express.Router()
const verifyToken = require("./../middleware/authrization")
const {
    addPost,
    getPosts,
    getOnePost,
    deletePost,
    updatePost,
    getCountries,
    getCountriesCount
} = require("../controller/postsController")


router.post("/create_post", addPost)

router.get("/get_all_post", getPosts)

router.get("/get_one_post", getOnePost)

router.post("/update_post", updatePost)

router.post("/delete_post", deletePost)

router.get("/get_country", getCountries)

router.get("/get_country_count", getCountriesCount)

module.exports = router