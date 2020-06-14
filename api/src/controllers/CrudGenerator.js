import express from 'express';

const CrudGenerator = (Collection) => {
    const create = async (req, res) => {
        try {
            const newEntry = req.body;
            const created = await Collection.create(newEntry);
            res.send(created);
        }catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
        
    }

    const readMany = async (req, res) => {
        try{
            const query = res.locals.query || {};
            const result = await Collection.find(query);
            res.send(result);
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    const readOne = async (req, res) => {
        try{
            const { _id } = req.params;
            const result = await Collection.findById(_id);
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
            res.send(updated);
        }catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    const remove = async (req, res) => {
        try {
            const removed = await Collection.remove({ _id: req.params._id });
            res.send(removed);
        }catch(e) {
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