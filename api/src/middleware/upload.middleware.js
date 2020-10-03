import UploadService from '../service/UploadService';
import { ErrorHandler } from '../models/ErrorHandler';

const uploadMiddleware = async (req, res, next) => {
    const file = req.file;
    if (!file) {
        return next(new ErrorHandler(500, 'Veuillez selectionner un fichier à uploader.'));
    }
    const result = await UploadService.uploadFileToAwsS3(req.file.path, req.file.originalname);
    res.send(result);
};

export default uploadMiddleware;