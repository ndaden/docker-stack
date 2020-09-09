import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import { CmsSite } from './src/models/cms';
import { Role, Post, User } from './src/models';

import CrudGenerator from './src/controllers/CrudGenerator';

import UploadService from './src/service/UploadService';
import UserController from './src/controllers/UserController';
import AuthenticationController from './src/controllers/AuthenticationController';
import RoleController from './src/controllers/RoleController';
import UploadController from './src/controllers/UploadController';

import errorHandlingMiddleware from './src/middleware/error.middleware';
import authMiddleware from './src/middleware/auth.middleware';
import uploadMiddleware from './src/middleware/upload.middleware';
import CmsController from './src/controllers/CmsController';
import workerRoutes from './src/worker/routes';
import { ErrorHandler } from './src/models/ErrorHandler';

const app = express();
const port = process.env.PORT || 3000;
const mongoUser = process.env.MONGOUSER || '';
const mongoPwd = process.env.MONGOPWD || '';
const mongoUri = process.env.MONGOURI || 'localhost';
const mongoDbName = process.env.MONGODBNAME || 'users';
const frontAppUri = process.env.FRONTAPPURI || 'http://localhost:8080';
let uri = '';

if (mongoUser && mongoPwd) {
    uri = `mongodb://${mongoUser}:${mongoPwd}@${mongoUri}/${mongoDbName}?retryWrites=true&w=majority`;
} else {
    uri = `mongodb://${mongoUri}/${mongoDbName}`;
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB !'))
    .catch(error => console.log(error));

mongoose.set('useCreateIndex', true);

var whitelist = frontAppUri.split(',');

var corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

const uploadManager = UploadService.init();

app.get('/', (req, res) => {
    return res.status(200).send({ 'message': 'Welcome to the backend! version : 15/08/2020' });
});

app.use('/v1/users', CrudGenerator(User));
app.get('/v1/users', [authMiddleware, UserController.getAll]);
app.delete('/v1/users/:id', [authMiddleware, UserController.deleteUser]);
app.get('/v1/users/disable/:id', [authMiddleware, UserController.disableUser]);
app.get('/v1/users/block/:id/:state', [authMiddleware, UserController.blockUser]);
app.get('/v1/users/:id', UserController.getById);
app.post('/v1/users', UserController.create);
app.post('/v1/users/activate', UserController.activate);
app.post('/v1/users/edit/avatar', [authMiddleware, uploadManager.single('avatar'), UserController.editAvatar]);
app.post('/v1/users/edit/password', [authMiddleware, UserController.changePassword]);

app.use('/worker', workerRoutes);

app.use('/v1/post', authMiddleware, CrudGenerator(Post));

app.use('/v1/roles', authMiddleware, CrudGenerator(Role));
app.post('/v1/roles/add', [authMiddleware, RoleController.addRoleToUser]);
app.post('/v1/roles/delete', [authMiddleware, RoleController.removeRoleToUser]);

app.post('/v1/upload', [authMiddleware, uploadManager.single('avatar'), uploadMiddleware]);
app.get('/v1/file/:id', UploadController.get);

/* OCR: disabled
app.post('/api/v1/ocr', uploadManager.single('image'),ocrMiddleware(worker), OcrController.doOcr);
*/

app.post('/auth', AuthenticationController.authenticate);
app.get('/auth', AuthenticationController.test);

// CMS routes
app.use('/cms/site', authMiddleware, CrudGenerator(CmsSite));

app.post('/cms/site', CmsController.create);
app.put('/cms/site/:id', CmsController.update);
app.get('/cms/site/:name', CmsController.get);
app.get('/cms/site', CmsController.get);
app.delete('/cms/site/:id', CmsController.delete);

app.get('/cms/page', CmsController.getPages);
app.post('/cms/page', CmsController.createPage);
app.delete('/cms/page/:id', CmsController.deletePage);

app.get('/cms/area', CmsController.getCmsArea);
app.post('/cms/area', CmsController.createCmsArea);
app.delete('/cms/area/:id', CmsController.deleteCmsArea);

app.get('/cms/content', CmsController.getCmsContent);
app.post('/cms/content', CmsController.createCmsContent);
app.delete('/cms/content/:id', CmsController.deleteCmsContent);

app.use(errorHandlingMiddleware);

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
