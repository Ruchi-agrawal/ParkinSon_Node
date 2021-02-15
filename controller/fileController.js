const path = require('path');
const fs = require('fs')
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
// let rawdata = fs.readFileSync(path.resolve('../AgentGateway/keyAWS.json'));
// let awsCredential = JSON.parse(rawdata);
const multer = require('multer');
const statusMessages = require("../config/appConstants")

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads');
    },
    filename: function (request, file, callback) {
        const fileUrl = uuidv4() + path.extname(file.originalname)
        callback(null, fileUrl);
    },
})
const upload = multer({ storage: storage }).single("postImage");

const fileUpload = async (req, res) => {
    try {
        var file = req.files.file
        const developmentid = req.params.developmentid
        const filesource = req.query.filesource ? req.query.filesource : null
        let filename = Date.now() + '-' + file.originalFilename.replace(/\s/g, "")
        var keyfile = `developments/${developmentid}/`;
        if (filesource) {
            keyfile += `${filesource}/`
        }
        keyfile += `${filename}`
        fs.readFile(file.path, function (err, data) {
            if (err) {
                throw err;
            } // Something went wrong!
            AWS.config.update({ region: 'us-east-1' })
            AWS.config.update({
                accessKeyId: awsCredential.AWS_ACCESS_KEY_ID,
                secretAccessKey: awsCredential.AWS_SECRET_ACCESS_KEY
            })
            var s3bucket = new AWS.S3({ params: { Bucket: 'agentgateway' } });
            s3bucket.putObject(function () {
                var params = {
                    Key: keyfile,
                    Body: data,
                    ACL: `public-read`
                };
                s3bucket.upload(params, function (err, data) {
                    // Whether there is an error or not, delete the temp file
                    fs.unlink(file.path, function (err) {
                        if (err) {
                            console.error(err);
                        }
                        console.log('Temp File Delete');
                    });
                    if (err) {
                        console.log('ERROR MSG: ', err);
                        res.status(400).json({ status: 400, hassuccessed: false, msg: "Image is not uploaded" })
                    } else {
                        console.log('Successfully uploaded data');
                        var file_entry = { filename: keyfile, filetype: file.type }
                        res.json({ status: 200, hassuccessed: true, msg: 'image is uploaded', data: file_entry })
                    }
                });
            });
        });
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = error
        res.json(statusMessages.ERROR_MSG.IMP_ERROR);
    }
}


const uploadFileMulter = (req, res) => {
    try {
        upload(req, res, function (err) {
            if (err) {
                statusMessages.ERROR_MSG.FILE_UPLOAD_ERROR.error = err
                res.json(statusMessages.ERROR_MSG.FILE_UPLOAD_ERROR);
            } else {
                statusMessages.SUCCESS_MSG.SUCCESS.data = res.req.file
                res.json(statusMessages.SUCCESS_MSG.SUCCESS);
            }
        })
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = error
        res.json(statusMessages.ERROR_MSG.IMP_ERROR);
    }
}

module.exports = {
    fileUpload,
    uploadFileMulter
}
