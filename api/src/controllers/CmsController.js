import CmsService from '../service/CmsService';
import CmsService2 from '../service/CmsService_2';
import moment from 'moment';

const CmsController = {
    async toto(req, res) {
        const result = await new CmsService2().get();
        res.send(result);
    },
    async create(req, res) {
        try {
            const result = await CmsService.createCmsSite({ name: req.body.name });
            res.status(200).send(result);
        } 
        catch(e) {
            res.status(500).send(e);
        }
    },
    async update(req, res) {
        try {
            const result = await CmsService.updateCmsSite({ id: req.params.id, name: req.body.name });
            res.status(200).send(result);
        } 
        catch(e) {
            res.status(500).send(e);
        }
    },
    async get(req, res) {
        try {
            let result;
            if(req.params.name) {
                result = await CmsService.getCmsSiteByName({ name: req.params.name });
            } else {
                result = await CmsService.getSites();
            }
            res.status(200).send(result);
        } 
        catch(e) {
            res.status(500).send(e);
        }
    },
    async delete(req, res) {
        try {
            const result = await CmsService.deleteCmsSite({ id: req.params.id });
            res.status(200).send(result);
        } 
        catch(e) {
            res.status(500).send(e);
        }
    },
    // cmsPage
    async getPages(req, res) {
        try {
            const result = await CmsService.getCmsPages(req.query);
            res.status(200).send(result);
        } 
        catch(e) {
            res.status(500).send(e);
        }
    },
    async createPage(req, res) {
        try {
            const result = await CmsService.createCmsPage({ siteName: req.body.siteName, route: req.body.route, title: req.body.title, parentPageId: req.body.parentPageId ? req.body.parentPageId : undefined });
            res.status(200).send(result);
        } 
        catch(e) {
            res.status(500).send(e);
        }
    },
    async deletePage(req, res) {
        try {
            const result = await CmsService.deleteCmsPage({ id: req.params.id });
            res.status(200).send(result);
        } 
        catch(e) {
            res.status(500).send(e);
        }
    },
    //CmsPageArea
    async getCmsArea(req, res) {
        try {
            const result = await CmsService.getCmsArea();
            res.status(200).send(result);
        } 
        catch(e) {
            res.status(500).send(e);
        }
    },
    async createCmsArea(req, res) {
        try {
            const result = await CmsService.createCmsArea({ parentPageId: req.body.parentPageId, name: req.body.name, type: req.body.type });
            res.status(200).send(result);
        } 
        catch(e) {
            res.status(500).send(e);
        }
    },
    async deleteCmsArea(req, res) {
        try {
            const result = await CmsService.deleteCmsArea({ id: req.params.id });
            res.status(200).send(result);
        } 
        catch(e) {
            res.status(500).send(e);
        }
    },
    //CmsAreaContent
    async getCmsContent(req, res) {
        try {
            const result = await CmsService.getCmsContent();
            res.status(200).send(result);
        } 
        catch(e) {
            res.status(500).send(e);
        }
    },
    async createCmsContent(req, res) {
        try {
            const result = await CmsService.createCmsContent({ parentAreaId: req.body.parentAreaId, name: req.body.name, type: req.body.type, value: req.body.value });
            res.status(200).send(result);
        } 
        catch(e) {
            res.status(500).send(e);
        }
    },
    async deleteCmsContent(req, res) {
        try {
            const result = await CmsService.deleteCmsContent({ id: req.params.id });
            res.status(200).send(result);
        } 
        catch(e) {
            res.status(500).send(e);
        }
    }
}

export default CmsController;