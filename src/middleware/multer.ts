import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "../../public/images");
  },
  filename(req, file, callback) {
    console.log(file);
  },
});
const uploader = multer({storage})

export default uploader