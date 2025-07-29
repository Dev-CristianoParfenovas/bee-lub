const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/s3");
const bucketName = "bee-aplicativos-img";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: "public-read", // Obrigatório para deixar imagem pública
    key: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

module.exports = upload;
