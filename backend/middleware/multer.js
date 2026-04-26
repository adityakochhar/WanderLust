import fs from "fs";
import os from "os";
import path from "path";
import multer from "multer";

const uploadsDir = path.join(os.tmpdir(), "wanderlust-uploads");

// Ensure uploads always go to a writable location.
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${baseName}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;