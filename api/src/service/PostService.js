import Post from '../models/Post';

const PostService = {
    async create(author, date, title, content) {
        const post = new Post({ postedBy: author, postDate: date, postTitle: title, postContent: content });
        const createdPost = await post.save();
        return createdPost;
    },
    async delete(id) {
        const deleteCount = await Post.deleteOne({ id: id });
        return deleteCount;
    },
    async edit(id, author, date, title, content) {
        const postToEdit = await Post.findOne({ id: id }).exec();
        if (postToEdit) {
            postToEdit = { ...postToEdit, postedBy: author, postDate: date, postTitle: title, postContent: content };
            const editedPost = await postToEdit.save();
            return editedPost;
        }
    }
};

export default PostService;