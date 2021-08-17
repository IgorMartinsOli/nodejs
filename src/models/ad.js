//ref mongoose --> modelSchema --> conectar e consultar 
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    idUser: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: String,
    priceNegotiable: String,
    description: String,
    views: Number,
    status: String
});

const modelName = 'Ad';

if(mongoose.connect && mongoose.models[modelName]){
    module.exports = mongoose.connect.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}

/*- _id
- _idUser
- images[{ulr, defalt:true}]
- category
- price
- description
- dateCreated
*/