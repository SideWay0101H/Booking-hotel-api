import { diskStorage } from "multer";
//Cấu hình cho upload file hình ảnh
export const storageConfig = (folder: string) => diskStorage({
    destination: `uploads/${folder}`,
    filename: (req, file, cb) => {
        cb(null,Date.now() + '-' + file.originalname)
    }
})