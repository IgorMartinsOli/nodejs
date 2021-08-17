//ref mongoose --> modelSchema --> conectar e consultar 
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name: String,
    slyg: String
});

const modelName = 'Category';

if(mongoose.connect && mongoose.models[modelName]){
    module.exports = mongoose.connect.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}