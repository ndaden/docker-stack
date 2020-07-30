import mongoose, {Schema} from 'mongoose';
import ActivationCode from './ActivationCode';
import Role from './Role';
import moment from 'moment';
import { hashSync } from 'bcryptjs';

const saltRounds = 10;

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

UserSchema.pre('findOneAndDelete',{query:true}, (next) => {
    console.log('Removing user...');
    next();
});

UserSchema.post('findOneAndDelete', async (user, next) => {
    await ActivationCode.deleteOne({ _id : user.activationCode });
    next();
});

UserSchema.pre('save', (next) => {
    console.log('Saving user...');
    next();
});

UserSchema.post('save', async (user, next) => {
    const code = generateActivationCode(6);
    const newActivationCode = await ActivationCode.create({ 
        validationCode: code, 
        validationCodeSendDate: moment(), 
        validationCodeExpirationDate: moment().add(30, 'minute') 
    });

    const guestRole = await Role.findOne({ roleCode: 'GUEST' }).exec();
    user.password = hashSync(user.password, saltRounds),
    user.activationCode = newActivationCode;
    user.roles = [ guestRole ];
    
    await user.updateOne(user);
    next();
});

const generateActivationCode = (length) => {
    let code = "";
    const alphaNum = 'ABCDEFGHIJKLMNOPQRSTUVWXY1234567890'
    for (var i = 0; i < length; i++) {
        code = `${code}${alphaNum.substr(Math.random() * alphaNum.length, 1)}`;
    }
    return code;
}

const User = mongoose.model("user", UserSchema);
export default User;