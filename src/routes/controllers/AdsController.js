//gera codigo de id aleatorio padrao
const { v4: uuid} = require('uuid');
const jimp = require('jimp');

const Category = require('../../models/category');
const Ad = require('../../models/ad');
const User = require('../../models/User');

//função para ajustar imagem

const addImage = async(buffer) =>{
    let newName = `${uuid()}.jpg`;
    let tmpImage = await jimp.read(buffer);
    tmpImage.cover(500, 500).quality(75).write(`./public/assets/${newName}`);
    return newName;
}



module.exports = {
    addAction: async(req, res) => {
        //recebe anuncios, categorias, usuario => Validar e Organizar dados
        let {title, price, priceneg, toke, cat, desc} = req.body;
        const user = await User.findOne({ token: token }).exec();

        if(!title || !cat || !desc){
            res.json({error: 'Titulo, categoria ou descrição não foram preenchidos'});
            return;
        }

        if(price){
            //tratar 8.000,02 para 8000.02
            price = price.replace('.', '').replace(',', '.').replace('R$', '');
            prince = parseFloat(price);
        }else{
            price = 0;
        }

        const newAd = new Ad();
        newAd.idUser = user._id;
        newAd.state = user.state;
        newAd.category = cat;
        newAd.dateCreated = new Date();
        newAd.title = title;
        newAd.price = price;
        newAd.priceNegotiable = (priceneg == true) ? true : false;
        newAd.description = desc;
        newAd.views = 0;
        newAd.status = true;

        //envio da imagem --> verificar se tem alguma e se tem imagem
        //verificar quantitativo de imagens

        if(req.files && req.files.img){
            //verifica se tem varias imagens
            if(req.files.img.length == undefined){
                //ajustar a imageme guardar
                if(['imagem/jpeg', 'imagem/jpg', 'imagem/png'].includes(req.files.img.mimetype)){
                    let url = await addImage(req.files.img.data);
                    newAd.images.push({
                        url,
                        default: false
                    })
                }
            }
        }

        const info = await newAd.save();
        res.json({ id: info._id });
    },
    getCategories: async(req, res) => {
        //resgatar todos os dados tentar resgatar imagens...
        const cats = await Category.find();
        let categories = [];

        //montar categorias
        for(let i in cats){
            categories.push({
                ...cats[i]._doc,
                img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
            });
        }

        res.json({categories});
    },
    getList: async(req, res) => {

    },
    getItem: async(req, res) => {

    },
    editAction: async(req, res) => {

    },
};