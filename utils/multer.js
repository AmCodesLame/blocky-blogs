const multer = require("multer");

const fileStorageEnginge = multer.diskStorage({
  destination: "./public/img",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEnginge });

module.exports = { upload };
