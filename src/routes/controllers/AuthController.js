const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../../models/user');
const State = require('../../models/State');

module.exports = {
    signin: async (req, res) => {
        const erros = validatorResult(req);

        if(!erros.isEmpty()){
            res.json({
                error: erros.mapped()
            });
            return;
        }

        const data = matcheData(req);

        //verifica no banco email correspondente
        const user = await User.findOne({ email: data.email });
        if(!user){
            res.json({ error: 'Email/senha nao corresponde'});
            return;
        }

        //validar senha correspondente
        const match = await bcrypt.compare(data.passaword, user.passawordHash);
        if(!match){
            res.json({ error: 'Email/senha nao corresponde'});
            return;
        }

        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        user.token = token;
        await user.save();

        res.json({token, email: data.email});
    },
    signup: async (req, res) => {
        const erros = validationResult(req);

        if (!erros.isEmpty()) {
            res.json = ({
                error: erros.mapped()
            });
            return;
        }

        const data = matchedData(req);
        const user = await User.findOne({
            email: data.email
        });

        if (user) {
            res.json = ({
                error: {
                    email: {
                        msg: 'Ja tem esse email cadastrado!'
                    }
                }
            });
            return;
        }

        if (mongoose.Types._ObjectId.isValid(data.State)) {
            const statItem = await State.findById(data.State);
            if (!statItem) {
                res.json = ({
                    error: {
                        state: {
                            msg: 'Esse estado não existe!'
                        }
                    }
                });
                return;
            }
        }else{
            res.json = ({
                error: {
                    state: {
                        msg: 'Codigo do estado não existe'
                        }
                    }
            });
            return;
        }
        //gravar no banco
        const passawordHash = await bcrypt.hash(data.passaword, 10);
        //has aleatorio
        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        const newUser = new User({
            nome: data.nome,
            email: data.email,
            passawordHash,
            token,
            state: data.state
        });

        await newUser.save();

        res.json({token});

        res.json({ tudoCerto: true, data });

    },
    editAction: async (req, res) => {
        
    }
};