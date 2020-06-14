import User from '../models/User';
import ActivationCode from '../models/ActivationCode';

const UserService = {
    async getAll() {
        const users = await User.find().populate('roles activationCode').exec();
        return users;
    },
    async getById(id) {
        return User.findById(id).exec();
    },
    async delete(id) {
        const userToDelete = await User.findOne({_id: id});
        await ActivationCode.deleteOne({ _id: userToDelete.activationCode });
        return await userToDelete.deleteOne();
    },
    async desactiver(id) {
        return await User.updateOne({ _id : id}, { isActive: false }).exec();
    },
    async bloquer(id, state = true) {
        return await User.updateOne({ _id : id}, { isBlocked: state }).exec();
    }
};

export default UserService;