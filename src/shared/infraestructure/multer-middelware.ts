import multer from "multer";
import * as path from "path";
import config from "../../config";

const filesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadsDir!);
  },
  filename: function (req, file, cb) {
    // const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const filesUpload = multer({
  storage: filesStorage,
});
