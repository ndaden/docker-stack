import PostService from '../service/PostService';
import moment from 'moment';
const PostController = {
    async create(req, res) {
        if (req.body.author && req.body.title && req.body.content) {
            const result = await PostService.create(req.body.author, moment(), req.body.title, req.body.content);
            res.status(200).send({ success: true, result });
        } else {
            res.status(400).send({ success: false, message: 'Données manquantes' });   
        }
    }
}

export default PostController;