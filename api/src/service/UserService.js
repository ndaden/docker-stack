import User from '../models/User';

const UserService = {
    async getAll() {
        const users = await User.find().populate('roles').populate('activationCode').exec();
        return users;
    },
    async getById(id) {
        return User.findById(id).exec();
    },
    async delete(id) {
        return User.deleteOne({ _id: id});
    },
    async desactiver(id) {
        return await User.updateOne({ _id : id}, { isActive: false }).exec();
    },
    async bloquer(id, state = true) {
        return await User.updateOne({ _id : id}, { isBlocked: state }).exec();
    }
};

export default UserService;