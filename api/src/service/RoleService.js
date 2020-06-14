import Role from '../models/Role';
import User from '../models/User';

const RoleService = {
    async assignRoleToUser(username, roleCode) {
        const role = await Role.findOne({ roleCode: roleCode}).exec();
        if(role) {
            const user = await User.findOne({ username: username }).exec();
            if(user && user.roles.find(r => r == role.id) === undefined) {
                user.roles = [...user.roles, role.id];
                return user.save();
            }
            
            throw new Error('rôle déjà assigné');
        }    
    },
    async unassignRoleToUser(username, roleCode) {
        const role = await Role.findOne({ roleCode: roleCode}).exec();
        const user = await User.findOne({ username: username }).exec();
        if(role && user) {
            user.roles = user.roles.filter(r => r != role.id);
            return user.save();
        }

        throw new Error('une erreur s\'est produite');
    }
};

export default RoleService;