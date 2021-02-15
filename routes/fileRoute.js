const express = require('express');
const router = express.Router();
const { fileUpload, uploadFileMulter } = require('../controller/fileController');

router.post("/file_upload", uploadFileMulter)

module.exports = router