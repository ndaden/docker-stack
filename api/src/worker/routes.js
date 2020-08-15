import express from 'express';
import moment from 'moment';
import ActivationCode from '../models/ActivationCode';
import User from '../models/User';
import Role from '../models/Role';
import { SendToken } from '../service/EmailService';

const router = express.Router();

const finalizeUserCreation = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username }).exec();
        const code = generateActivationCode(6);
        const newActivationCode = await ActivationCode.create({
            validationCode: code,
            validationCodeSendDate: moment(),
            validationCodeExpirationDate: moment().add(30, 'minute')
        });

        const guestRole = await Role.findOne({ roleCode: 'GUEST' }).exec();
        user.activationCode = newActivationCode;
        user.roles = [guestRole];

        await user.updateOne(user);
        await SendToken(user.email, code);
        res.status(200).send({ success : true });
    } catch(e) {
        console.log(e);
        res.status(500).send({ success: false });
    }
};

const generateActivationCode = (length) => {
    let code = "";
    const alphaNum = 'ABCDEFGHIJKLMNOPQRSTUVWXY1234567890'
    for (var i = 0; i < length; i++) {
        code = `${code}${alphaNum.substr(Math.random() * alphaNum.length, 1)}`;
    }
    return code;
}

router.post('/users', finalizeUserCreation);
export default router;