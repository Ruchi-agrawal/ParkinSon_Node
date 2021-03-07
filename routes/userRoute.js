const express = require("express")
const router = express.Router()
const { loginUser, saveUser, checkUserStatus, blockUser, checkAllUserStatus, changeAdminPassord} = require("../controller/userController")
const verifyToken = require("./../middleware/authrization")
router.post("/loginUser", loginUser)

router.post("/save_users", saveUser)

router.post("/check_user_status", checkUserStatus)

router.post("/handle_user", blockUser)

router.post("/check_all_user_status", checkAllUserStatus)

router.post("/change_password", changeAdminPassord)

module.exports = router