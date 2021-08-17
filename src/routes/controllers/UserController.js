const State = require('../../models/State');

module.exports = {
    getStats: async(req, res) => {
        let states = await State.find();
        res.json({
            states
        });
    },
    info: async(req, res) => {

    },
    editAction: async(req, res) => {

    }
};