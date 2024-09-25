const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

// Initialize the S3 SDK with your AWS credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Store securely in environment variables
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Store securely in environment variables
    region: 'your-region' // E.g., 'us-east-1'
});

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'my-app-attachments', // Replace with your S3 bucket name
        acl: 'public-read', // Files will be publicly accessible via URL
        key: function (req, file, cb) {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName); // File will be saved with this key (filename) in S3
        }
    })
});

module.exports = upload;
