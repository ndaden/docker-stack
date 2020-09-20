import UploadService from '../service/UploadService';
import { ErrorHandler } from '../models/ErrorHandler';

const uploadMiddleware = (req, res, next) => {
    const file = req.file;
    if (!file) {
        return next(new ErrorHandler(500, 'Veuillez selectionner un fichier à uploader.'));
    }
    UploadService.uploadFileToAwsS3(req.file.path, req.file.originalname, (error, result) => {
        res.send(result);
    });

};

export default uploadMiddleware;