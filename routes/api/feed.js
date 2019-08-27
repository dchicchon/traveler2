const router = require("express").Router();

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
            console.log(file)

            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            console.log("IN THE FEED PHOTO KEY")
            console.log(file)
            cb(null, file.originalname)
        }
    }),
});


router.route("/feed")
    .post(upload.single("imageData"), (req, res, next) => {
        console.log("IMAGE FEED POST")
        // var location = (`https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/`)
        console.log(req.file)
        res.json({
            imageURL: req.file.location
        })
        // res.send(req.file.location)
    })

module.exports = router

