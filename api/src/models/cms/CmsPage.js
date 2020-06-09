import mongoose, {Schema} from 'mongoose';

const CmsPageSchema = new Schema({
    route: {
        type: String
    },
    title : {
        type: String
    },
    areas : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cmsPageArea'
    }],
    subPages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cmsPage'
    }]
});

const CmsPage = mongoose.model("cmsPage", CmsPageSchema);

export default CmsPage;