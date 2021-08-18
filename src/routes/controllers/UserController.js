const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validationResult, matcheData } = require('express-validator');
const State = require('../../models/State');
const User = require('../../models/User');

module.exports = {
    getStats: async(req, res) => {
        let states = await State.find();
        res.json({ states });
    },
    info: async(req, res) => {
        //identificar usuario pelo token

        //query porque requisição é tipo get
        let token = req.query.token;

        const user = await User.findOne({ token });
        const state = await State.findOne( user.state );

        res.json({
            name: user.name,
            emaik: user.email,
            state: state.name
        })

    },
    editAction: async(req, res) => {
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            res.json({
                error: erros.mapped()
            });
            return;
        }

        const data = matcheData(req);

        let updates = {};

        if(data.name){
            updates.name = data.name;
        }

        if(data.email){
            const emailCheck = await User.findOne({email: data.email});

            if(emailCheck){
                res.json({
                    error: 'Email ja existente'
                });
                return;
            }

            updates.email = data.email;
        }

        if(data.state){
            if(mongoose.Types._ObjectId.isValid(data.state)){
                const stateCheck = await State.findById(data.state);

                if(!stateCheck){
                    res.json({ error: 'Estado não existente'});
                    return;
                }

                updates.state = data.state;
            }else{
                res.json({error: 'Codigo do estado em formato invalido'});
                return;
            }
        }

        if(data.password){
            updates.passwordHash = await bcrypt.hash(data.password, 10);
        }

        await User.findOneAndUpdate({token: data.token}, {$set: updates});

        res.json({});
    }
};