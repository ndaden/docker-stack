import RoleService from '../service/RoleService';
import Role from '../models/Role';

const RoleController = {
    async getAll(req, res) {
        try {
            const result = await RoleService.getRoles();
            res.status(200).send(result);
        } catch(e) {
            res.send({ success: false, error: e.message });
        }
    },
    async create(req, res) {
        if (req.body.code && req.body.name) {
            const result = await RoleService.create(req.body.code, req.body.name);
            res.status(200).send({ success: true });
        }
    },
    async addRoleToUser(req, res) {
        try {
            if (req.body.username && req.body.code) {
                await RoleService.assignRoleToUser(req.body.username, req.body.code);
                res.send({ success: true, message: 'rôle ajouté' });
            }
        } catch (e) {
            res.send({ success: false, error: e.message });
        }
    },
    async removeRoleToUser(req, res) {
        try {
            if (req.body.username && req.body.code) {
                await RoleService.unassignRoleToUser(req.body.username, req.body.code);
                res.send({ success: true });
            }
        } catch (e) {
            res.send({ success: false, error: e.message });
        }
    }
}

export default RoleController;