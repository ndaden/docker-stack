import User from '../models/User';
import { SendToken } from '../service/EmailService';
import uploadService from '../service/UploadService';
import userService from '../service/UserService';
import { hashSync, compareSync } from 'bcryptjs';
import moment from 'moment';
import { ErrorHandler } from '../models/ErrorHandler';
const saltRounds = 10;

const UserController = {
    async activate(req, res, next) {
        const receivedCode = req.body.activationCode;
        const email = req.body.email;
        const renew = req.body.renew;

        const currentUser = await User
            .findOne({ email: email })
            .populate('activationCode')
            .exec();

        try {
            if (!currentUser.isActive) {
                const code = currentUser.activationCode;
                if (renew) {
                    await code.update({
                        validationCodeSendDate: moment(),
                        validationCodeExpirationDate: moment().add(30, 'minute')
                    }).exec();

                    await SendToken(email, code.validationCode);
                    res.send({
                        success: true,
                        message: "Code d'activation renouvelé"
                    });
                } else if (code.validationCode === receivedCode && moment().isBefore(code.validationCodeExpirationDate)) {
                    currentUser.isActive = true;
                    currentUser.activationDate = moment();
                    await currentUser.save();

                    await code.update({
                        validationCodeExpirationDate: moment().add(-1, 'minute'),
                    }).exec();

                    res.send({
                        success: true,
                        message: "Votre compte a été activé avec succés !"
                    });
                } else {
                    next(new ErrorHandler(500, "Code erroné ou expiré."));
                }
            } else {
                next(new ErrorHandler(500, "Votre compte est déjà activé."));
            }
        } catch (error) {
            next(new ErrorHandler(500, "Une erreur est survenue lors de l'activation."));
        }
    },
    async changePassword(req, res, next) {
        if (req.user && req.body.oldPassword && req.body.newPassword && req.body.oldPassword !== req.body.newPassword) {
            const user = await User.findOne({ username: req.user.username }).exec();
            if (compareSync(req.body.oldPassword, user.password)) {
                user.password = hashSync(req.body.newPassword, saltRounds);
                user.save();
                res.status(200).send({ success: true, message: 'Mot de passe modifié' });
            } else {
                next(new ErrorHandler(500, "Ancien mot de passe incorrect."));
            }
        } else {
            next(new ErrorHandler(500, "Une erreur technique est survenue."));
        }
    },
    async editAvatar(req, res, next) {
        try {
            if (req.user) {
                const user = await User.findOne({ username: req.user.username }).exec();
                await uploadService.optimizeImage(req.file.path);
                const result = await uploadService.uploadFileToAwsS3(req.file.path, req.file.originalname);
                user.avatarUrl = result.path;
                user.save();
                res.status(200).send({ success: true, avatarUrl: result.path });
            } else {
                next(new ErrorHandler(400, "Requête invalide."));
            }
        } catch (e) {
            next(new ErrorHandler(500, "Une erreur technique s'est produite."));
        }
    },
    disableUser(req, res, next) {
        try {
            userService.desactiver(req.params.id).then(result => res.send(result));
        } catch (error) {
            next(new ErrorHandler(500, "Une erreur technique s'est produite."));
        }
    },
    blockUser(req, res, next) {
        try {
            userService.bloquer(req.params.id, req.params.state === 'block').then(result => res.send(result));
        } catch (error) {
            next(new ErrorHandler(500, "Une erreur technique s'est produite."));
        }
    },
    async authenticateUser(username, password) {
        const user = await User.findOne({ username: username }).exec()
        if (compareSync(password, result[0].password)) {
            user.password = undefined;
            return user;
        } else {
            return "invalid username or password";
        }

    },
};

export default UserController;