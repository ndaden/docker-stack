import mongoose, {Schema} from 'mongoose';

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

UserSchema.pre('deleteOne', (next) => {
    console.log('Removing user...');
    next();
});

UserSchema.post('deleteOne', (doc, next) => {
    console.log(doc);
    next();
});

UserSchema.pre('save', (next) => {
    console.log('Saving user...');
    next();
});

UserSchema.post('save', (user, next) => {
    console.log(user);
    next();
});

const User = mongoose.model("user", UserSchema);



export default User;