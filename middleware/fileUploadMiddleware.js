const multer = require('multer');

// multer configuration
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      let type = req.originalUrl.split('/')[2];
      cb(null, `public/uploads/${type}`);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, file.originalname);
    },
});

const upload = multer({
    storage: multerStorage
});

module.exports = {
    upload
}