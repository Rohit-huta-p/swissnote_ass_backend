// config/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'swissnote_ass/uploads', // Specify the folder path here
    format: async (req, file) => 'jpeg', // Specify one format (e.g., 'jpeg', 'png') or make this dynamic
    public_id: (req, file) => file.originalname.split('.')[0], // Use the file name without extension as the public ID
  },
});

const multerUploads = multer({ storage: storage });

module.exports = multerUploads;
