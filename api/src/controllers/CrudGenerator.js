import express from 'express';
import mongoose from 'mongoose';
import { hashSync } from 'bcryptjs';
import { publishToExchange } from '../service/MQService';

const saltRounds = 10;

const excludedProperties = { user: '-password' };
const populate = { user: 'roles activationCode' };
const queueAfterCreate = [ 'user' ];

const CrudGenerator = (Collection) => {
    const create = async (req, res) => {
        try {            
            const newEntry = req.body;

            if(Collection.modelName === 'user') {
                newEntry.password = hashSync(newEntry.password, saltRounds);
            }

            const newDocument = new Collection(newEntry);
            const created = await newDocument.save();
            if(queueAfterCreate.includes(Collection.modelName)) {
                publishToExchange(Collection.modelName, { service: Collection.modelName, data: created })
            }
            res.send({ success: true, message: '', id: created._id });
        }catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
        
    }

    const readMany = async (req, res) => {
        try{
            const query = res.locals.query || {};
            const result = await Collection.find(query)
            .select(excludedProperties[Collection.modelName] || "")                
            .populate(populate[Collection.modelName] || "");
                            

            res.send(result);
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    const readOne = async (req, res) => {
        try{
            const { _id } = req.params;
            const result = await Collection.findById(_id)
            .select(excludedProperties[Collection.modelName] || "")                
            .populate(populate[Collection.modelName] || "");
            res.send(result);
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    const update = async (req, res) => {
        try {
            const changedEntry = req.body;
            const updated = await Collection.update({ _id: req.params._id },{ $set: changedEntry });
            res.send(updated._id);
        }catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    const remove = async (req, res) => {
        try{
          const result = await Collection.findOneAndDelete({ _id: req.params._id })
          .select(excludedProperties[Collection.modelName] || "");
          res.send(result);
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
        
    }

    const router = express.Router();

    router.post('/', create);
    router.get('/', readMany);
    router.get('/:_id', readOne);
    router.put('/:_id', update);
    router.delete('/:_id', remove);

    return router;
};

export default CrudGenerator;