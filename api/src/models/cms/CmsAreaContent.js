import mongoose, {Schema} from 'mongoose';

const CmsAreaContentSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String,
        enum : ['EDITORIAL','MEDIA','SCRIPT']
    },
    value : {
        type: String
    }
});

const CmsAreaContent = mongoose.model("cmsAreaContent", CmsAreaContentSchema);

export default CmsAreaContent;