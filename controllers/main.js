const modelManager = require('../classes/modelManager');

const producto = new modelManager('productos'); // productos.json

module.exports = {
    home: (req, res) => {
        return res.render('home',{
            styles:['home'],
            scripts:['home'],
            title: 'Welcome',
            productos: producto.index()        })
    },
 }