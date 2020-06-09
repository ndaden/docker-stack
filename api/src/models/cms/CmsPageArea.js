import mongoose, {Schema} from 'mongoose';

const CmsPageAreaSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String,
        enum: ['HEADER', 'BODY', 'FOOTER', 'CONTENT']
    },
    subAreas : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cmsPageArea'
    }],
    content : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cmsAreaContent'
    }]
});

const CmsPageArea = mongoose.model("cmsPageArea", CmsPageAreaSchema);

export default CmsPageArea;