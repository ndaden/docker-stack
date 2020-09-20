import multer from 'multer';
import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import jimp from 'jimp';

import * as config from './config.js';
import { ErrorHandler } from '../models/ErrorHandler.js';

const UploadService = {
    init() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => cb(null, 'dist/uploads'),
            filename: (req, file, cb) => cb(null, file.originalname)
        });

        return multer({
            dest: 'dist/uploads',
            limits: { fileSize: config.MAX_FILE_SIZE },
            fileFilter: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                if (!config.IMAGE_FILE_TYPES.includes(ext)) {
                    return cb(new ErrorHandler(500, 'Format de fichier non accepté.'))
                }
                cb(null, true);
            }
        });
    },
    uploadFileToAwsS3(filepath, originalName, cb) {
        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: config.AWS_S3_KEY_ID,
            secretAccessKey: config.AWS_S3_KEY_SECRET,
            region: config.AWS_REGION
        });

        const s3 = new aws.S3();

        let ext = '';
        const arr = originalName.split('.');
        if (arr.length > 1) {
            ext = arr[arr.length - 1];
        }

        var params = {
            ACL: 'public-read',
            Bucket: config.AWS_BUCKET,
            Body: fs.createReadStream(filepath),
            Key: `userAvatar/${arr[0]}-${Date.now()}.${ext}`
        };

        s3.upload(params, (error, data) => {
            if (error) {
                console.log('Erreur Upload AWS S3 : ', error);
                cb(error, null);
            }

            if (data) {
                fs.unlinkSync(filepath);
                const locationUrl = data.Location;

                cb(null, { path: locationUrl });
            }
        });
    },
    async optimizeImage(path) {
        const image = await jimp.read(path);
        if (image.getHeight() !== image.getWidth()) {
            const largestSide = image.getWidth() > image.getHeight() ? image.getWidth() : image.getHeight();
            const smallerSide = image.getWidth() > image.getHeight() ? image.getHeight() : image.getWidth();
            const diff = largestSide - smallerSide;
            const x = image.getWidth() > image.getHeight() ? diff / 2 : 0;
            const y = image.getHeight() > image.getWidth() ? diff / 2 : 0;

            const width = image.getWidth() > image.getHeight() ? image.getWidth() - diff / 2 : image.getWidth();
            const height = image.getHeight() > image.getWidth() ? image.getHeight() - diff / 2 : image.getHeight();
            await image.crop(x, y, width, height);
            await image.writeAsync(path);
        }
    }
}

export default UploadService;