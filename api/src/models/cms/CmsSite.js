import mongoose, {Schema} from 'mongoose';

const CmsSiteSchema = new Schema({
    name : {
        type: String
    },
    pages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cmsPage'
    }]
});

const CmsSite = mongoose.model("cmsSite", CmsSiteSchema);

export default CmsSite;