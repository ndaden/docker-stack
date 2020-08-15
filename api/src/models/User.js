import mongoose, {Schema} from 'mongoose';
import ActivationCode from './ActivationCode';

const UserSchema = new Schema({
    username: {
        type: String,
        required: 'Username is required',
        unique: true
    },
    email: {
        type: String,
        required: 'Email is required',
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    },
    avatarUrl: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    activationDate: {
        type: Date
    },
    activationCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activationCode'
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role'
    }]
});

UserSchema.post('findOneAndDelete', async (user, next) => {
    await ActivationCode.deleteOne({ _id : user.activationCode });
    next();
});

const User = mongoose.model("user", UserSchema);
export default User;