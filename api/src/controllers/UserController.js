import User from '../models/User';
import Role from '../models/Role';
import ActivationCode from '../models/ActivationCode';
import { SendToken } from '../service/EmailService';
import uploadService from '../service/UploadService';
import userService from '../service/UserService';
import { hashSync, compareSync } from 'bcryptjs';
import moment from 'moment';
const saltRounds = 10;

const UserController = {
    async create(req, res) {
        //1. creation du code d'activation
        const code = generateActivationCode(6);

        const newActivationCode = new ActivationCode({ 
            validationCode: code, 
            validationCodeSendDate: moment(), 
            validationCodeExpirationDate: moment().add(30, 'minute') 
        });

        await newActivationCode.save();

        const guestRole = await Role.findOne({ roleCode: 'GUEST' }).exec();

        //2. creation du user
        let newUser = new User({
            ...req.body,
            isActive: false,
            password: hashSync(req.body.password, saltRounds),
            activationCode: newActivationCode,
            roles: [ guestRole ],
        });

        newUser.save()
            .then(
                created => {
                    let result = {
                        success: true,
                        user: {
                            username: created.username, email: created.email
                        }, message: "Félicitations ! votre compte a été créé avec succés. Un code d'activation vous a été envoyé sur : " + created.email
                    };

                    //3. envoi de l'e-mail avec le code d'activation
                    SendToken(created.email, code)
                        .then(() => {
                            res.send(result);
                        })
                        .catch((error) => {
                            result.success = false;
                            result.message = "Un problème est survenu lors de l'envoi de votre code d'activation.";
                            console.log(error);
                            res.send(result);
                        });
                }).catch((error) => {
                    let returnedError = { success: false, message: "Une erreur technique s'est produite. merci de contacter l'administrateur du site." }
                    if (error.name && error.name == "MongoError") {
                        if (error.code == 11000) {
                            returnedError.message = "Un compte avec le même e-mail ou nom d'utilisateur existe déjà.";
                        }
                    }
                    res.status(500).send(returnedError);
                });
    },
    async activate(req, res) {
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
                } else if (code.validationCode === receivedCode && moment().isBefore(code.validationCodeExpirationDate)) {
                    await currentUser.update({
                        isActive: true,
                        activationDate: moment(),
                    }).exec();

                    await code.update({
                        validationCodeExpirationDate: moment().add(-1, 'minute'),
                    }).exec();

                    res.send({
                        success: true,
                        message: "Votre compte a été activé avec succés !"
                    });
                } else {
                    res.send({
                        success: false,
                        message: "Code incorrect ou expiré"
                    });
                }
            } else {
                res.status(500).send({
                    success: false,
                    message: "Impossible d'effectuer cette action"
                });
            }
        } catch (error) {
            res.send({ success: false, message: "Code incorrect ou expiré" });
        }
    },
    changePassword(req, res) {
        if (req.user && req.body.oldPassword && req.body.newPassword && req.body.oldPassword !== req.body.newPassword) {
            User.find({ username: req.user.username }).exec().then((result) => {
                const user = result[0];

                if (compareSync(req.body.oldPassword, user.password)) {
                    user.password = hashSync(req.body.newPassword, saltRounds);
                    user.save();
                    res.status(200).send({ success: true, message: 'Mot de passe modifié' });
                } else {
                    res.status(500).send({ success: false, message: 'Ancien mot de passe erroné' });
                }
            });
        } else {
            res.status(500).send({ success: false, message: 'Erreur technique' });
        }
    },
    editAvatar(req, res) {
        if (req.user) {
            User.find({ username: req.user.username }).exec().then((result) => {
                const user = result[0];
                console.log(user);
                uploadService.uploadFileToAwsS3(req.file.path, req.file.originalname, (error, result) => {
                    user.avatarUrl = result.path;
                    user.save();
                    res.status(200).send({ success: true, avatarUrl: result.path })
                });
            }).catch(error => {
                console.log(error);
                res.status(500).send({ success: false });
            });
        } else {
            res.status(500).send({ success: false, message: 'erreur technique interne' });
        }
    },
    getAll(req, res) {
        try {
            userService.getAll().then(result => res.send(result));
        } catch (error) {
            res.status(500).send(error);
        }
    },
    deleteUser(req, res) {
        try {
            userService.delete(req.params.id).then(result => res.send(result));
        } catch (error) {
            res.status(500).send(error);
        }
    },
    disableUser(req, res) {
        try {
            userService.desactiver(req.params.id).then(result => res.send(result));
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getById(req, res) {
        User.findById(req.params.id).exec()
            .then(result => res.send(result),
                error => res.status(500).send(error));
    },
    getUserById(id, cb) {
        console.log("getting user by id");
        User.findById(id).exec()
            .then(result => {
                let user = result[0];
                user.password = undefined;
                return cb(null, user);
            },
                error => cb(error, null));
    },
    authenticateUser(username, password, cb) {
        User.find({ username: username }).exec()
            .then(result => {
                if (result.length > 0 && compareSync(password, result[0].password)) {
                    let user = result[0];
                    user.password = undefined;
                    return cb(null, user);
                } else {
                    return cb("invalid username or password", null);
                }
            }, error => cb("unknown error", null));
    },
};

/**
 * Genere un code d'activation aleatoire 
 * @param {*} length : longueur du code d'activation
 */
const generateActivationCode = (length) => {
    let code = "";
    const alphaNum = 'ABCDEFGHIJKLMNOPQRSTUVWXY1234567890'
    for (var i = 0; i < length; i++) {
        code = `${code}${alphaNum.substr(Math.random() * alphaNum.length, 1)}`;
    }
    return code;
}

export default UserController;