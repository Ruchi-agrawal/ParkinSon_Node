const express = require("express")
const router = express.Router()
const verifyToken = require("./../middleware/authrization")
const {
    addPost,
    getPosts,
    getOnePost,
    getAllPosts,
    deletePost,
    updatePost,
    getCountries,
    getCountriesCount,
    handleStatus
} = require("../controller/postsController")


router.post("/create_post", addPost)

router.get("/get_active_post", getPosts)

router.get("/get_all_post", getAllPosts)

router.get("/get_one_post", getOnePost)

router.post("/update_post", updatePost)

router.post("/delete_post", deletePost)

router.get("/get_country", getCountries)

router.get("/get_country_count", getCountriesCount)

router.post("/handle_post_status", handleStatus)

module.exports = router