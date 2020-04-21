import mongoose, {Schema} from 'mongoose';

const PostSchema = new Schema({
    postedBy: {
        type: String,
        required: 'postedBy is required',
    },
    postTitle: {
        type: String,
        required: 'postTitle is required',
    },
    postDate: {
        type: Date,
        default: Date.now,
        required: 'postDate is required',
    },
    postContent: {
        type: String,
        required: 'postContent is required',
    }
});

const Post = mongoose.model("post", PostSchema);

export default Post;