const router = require("express").Router();
const userController = require("../../controllers/user-controller");


// const db = require("../models")
const multer = require('multer');
const multerS3 = require("multer-s3")
var AWS = require("aws-sdk");

// require("dotenv").config();


var s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'travelerdb',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }),
});


router.route("/user")
    .put(userController.editUser)
    .post(upload.single("imageData"), (req, res, next) => {
        console.log("IMAGE ROUTE POST")
        console.log(req.file.location)
        res.json({
            imageURL: req.file.location
        })
    })

router.route("/user/:id")
    .get(userController.getUser)
// .get(userController.updatePhoto)


module.exports = router