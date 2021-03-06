import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import UploadService from './src/service/UploadService';
import ReflectionController from './src/controllers/ReflectionController';
import UserController from './src/controllers/UserController';
import AuthenticationController from './src/controllers/AuthenticationController';
import RoleController from './src/controllers/RoleController';
import PostController from './src/controllers/PostController';
import UploadController from './src/controllers/UploadController';

import testMiddleware from './src/middleware/test.middleware';
import authMiddleware from './src/middleware/auth.middleware';
import uploadMiddleware from './src/middleware/upload.middleware';

const app = express();
const port = process.env.PORT || 3000;
const mongoUser = process.env.MONGOUSER || '';
const mongoPwd = process.env.MONGOPWD || '';
const mongoUri = process.env.MONGOURI || 'localhost';
const mongoDbName = process.env.MONGODBNAME || 'users';
const frontAppUri = process.env.FRONTAPPURI || 'http://localhost:8080';
let uri = '';

if (mongoUser && mongoPwd) {
    uri = `mongodb+srv://${mongoUser}:${mongoPwd}@${mongoUri}/${mongoDbName}?retryWrites=true&w=majority`;
} else {
    uri = `mongodb://${mongoUri}/${mongoDbName}`;
}

mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB !'))
    .catch(error => console.log(error));

mongoose.set('useCreateIndex', true);

const corsOptions = {
    origin: frontAppUri,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

const uploadManager = UploadService.init();

app.get('/', (req, res) => {
    return res.status(200).send({ 'message': 'Welcome to the backend! version : 23/02/2020' });
});

app.post('/v1/reflections', [testMiddleware, ReflectionController.create]);
app.get('/v1/reflections', [testMiddleware, ReflectionController.getAll]);
app.get('/v1/reflections/:id', [testMiddleware, ReflectionController.getOne]);
app.delete('/v1/reflections/:id', [testMiddleware, testMiddleware]);

app.get('/v1/users', [authMiddleware, UserController.getAll]);
app.delete('/v1/users/:id', [authMiddleware, UserController.deleteUser]);
app.get('/v1/users/disable/:id', [authMiddleware, UserController.disableUser]);
app.get('/v1/users/:id', UserController.getById);
app.post('/v1/users', UserController.create);
app.post('/v1/users/activate', UserController.activate);
app.post('/v1/users/edit/avatar', [authMiddleware, uploadManager.single('avatar'), UserController.editAvatar]);
app.post('/v1/users/edit/password', [authMiddleware, UserController.changePassword]);

app.post('/v1/post', PostController.create);

app.get('/v1/roles', [authMiddleware,RoleController.getAll]);
app.post('/v1/roles', [authMiddleware,RoleController.create]);
app.post('/v1/roles/add', [authMiddleware,RoleController.addRoleToUser]);
app.post('/v1/roles/delete', [authMiddleware,RoleController.removeRoleToUser]);

app.post('/v1/upload', [authMiddleware, uploadManager.single('avatar'), uploadMiddleware]);
app.get('/v1/file/:id', UploadController.get);

/* OCR: disabled
app.post('/api/v1/ocr', uploadManager.single('image'),ocrMiddleware(worker), OcrController.doOcr);
*/

app.post('/auth', AuthenticationController.authenticate);
app.get('/auth', AuthenticationController.test);

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
