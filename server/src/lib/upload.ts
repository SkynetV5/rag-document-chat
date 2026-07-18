import multer from "multer";

const allowedMimeTypes = [
    "application/pdf"
]

export const upload  = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 10*1024*1024},
    fileFilter: (_req, file, cb) => {
        if (allowedMimeTypes.includes(file.mimetype)){
            cb(null,true);
            return;
        }

        cb(new Error("Only PDF"));
    }
})