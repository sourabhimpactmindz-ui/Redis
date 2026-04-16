import multer from "multer";

const Uploads = multer({
  storage: multer.memoryStorage(), // no file saved
});

export default Uploads;