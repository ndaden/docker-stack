import { CmsPage, CmsSite, CmsPageArea, CmsAreaContent } from '../models/cms';


const CmsService = {
    async getSites() {
        return await CmsSite.find().populate({ path: 'pages', populate: { path: 'areas', populate:{ path: 'content' }}}).exec();
    },
    async createCmsSite({ name, pages = [] }) {
        return await new CmsSite({ name, pages }).save();
    },
    async getCmsSiteById({ id }) {
        return await CmsSite.findOne({ _id: id }).populate({ path: 'pages', populate: { path: 'areas', populate:{ path: 'content' }}}).exec();
    },
    async getCmsSiteByName({ name }) {
        return await CmsSite.findOne({ name }).populate({ path: 'pages', populate: { path: 'areas', populate:{ path: 'content' }}}).exec();
    },
    async updateCmsSite({ id, name, pages = [] }) {
        return await CmsSite.updateOne({ _id: id}, {name, pages}).exec();
    },
    async deleteCmsSite({ id }) {
        return await CmsSite.deleteOne({ _id: id }).exec();
    },
    //page
    async getCmsPages({ id, route }) {
        if(id) {
            return await CmsPage.findById(id).populate({ path : 'areas', populate: { path: 'content' }}).populate({path: 'subPages'});
        } else if (route) {
            return await CmsPage.find({ route }).populate({path : 'areas', populate: { path: 'content' }}).populate({path: 'subPages'});
        } else {
            return await CmsPage.find().populate({path : 'areas', populate: { path: 'content' }}).populate({path: 'subPages'});
            
        }
    },
    async createCmsPage({ siteName, route, title, areas = [], subpages = [], parentPageId = undefined }) {
        const newPage = new CmsPage({ route, title, areas, subPages: subpages });
        if(parentPageId) {
            const parentPage = this.getCmsPages({ id : parentPageId });
            this.updateCmsPage({ id : parentPageId, route : parentPage.route, title : parentPage.title, areas : parentPage.areas, subpages: [...parentPage.subPages, newPage._id] })
        } else {
            await this.addPageToSite({ siteName, pageId: newPage._id});
        }
        return await newPage.save();
    },
    async updateCmsPage({ id,  route, title, areas = [], subpages = [] }) {
        return await CmsPage.updateOne({ _id: id }, { route, title, areas, subPages: subpages }).exec();
    },
    async deleteCmsPage({ id }) {
        await this.detachPageFromSite({ pageId: id });
        return await CmsPage.deleteOne({ _id: id }).exec();
    },
    async addPageToSite({ siteName, pageId }) {
        const cmsSite = await this.getCmsSiteByName({ name : siteName });
        return await this.updateCmsSite({ id: cmsSite._id, name: cmsSite.name, pages: [...cmsSite.pages, pageId]});
    },
    async detachPageFromSite({ siteName, pageId }) {
        let cmsSite;
        if(siteName){
            cmsSite = await this.getCmsSiteByName({ name : siteName });
        } else {
            console.log('scanning all sites to delete ', pageId);
            const allSites = await this.getSites();
            cmsSite = allSites.find(s => s.pages.includes(pageId));
        }
        
        return await this.updateCmsSite({ id: cmsSite._id, name: cmsSite.name, pages: [...cmsSite.pages.filter(p => p != pageId)]});
    },
    //areas
    async getCmsArea() {
        return await CmsPageArea.find().populate('subAreas').populate('content').exec();
    },
    async createCmsArea({ parentPageId, name, type, subAreas = [], content = []}) {
        //TODO: add sub area
        const newArea = new CmsPageArea({ name, type, subAreas, content });
        const page = await this.getCmsPages({ id: parentPageId });
        await this.updateCmsPage({ id: parentPageId, route: page.route, title: page.title, areas: [...page.areas, newArea._id], subpages: page.subPages });
        return await newArea.save();
    },
    async updateCmsArea({ id, name, type, subAreas = [], content = [] }) {
        return await CmsPageArea.updateOne({ _id: id }, { name, type, subAreas, content }).exec();
    },
    async deleteCmsArea({ id }) {
        //TODO: detach Area from page
        return await CmsPageArea.deleteOne({ _id: id }).exec();
    },

    //content
    async getCmsContent() {
        return await CmsAreaContent.find().exec();
    },
    async createCmsContent({ parentAreaId, name, type, value }) {
        const newContent = new CmsAreaContent({ name, type, value });
        const area = await CmsPageArea.findOne({ _id: parentAreaId });
        await this.updateCmsArea({ id: area._id, name: area.name, type: area.type, subAreas: area.subAreas, content: [...area.content, newContent._id]});
        return await newContent.save();
    },
    async updateCmsContent({ id, name, type, value }) {
        return await CmsAreaContent.updateOne({ _id: id }, { name, type, value });
    },
    async deleteCmsContent({ id }) {
        //TODO: detach content from area
        return await CmsAreaContent.deleteOne({ _id: id }).exec();
    }
};

export default CmsService;