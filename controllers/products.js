const fs = require('fs')
const path = require('path')

const productos = require('../data/productos.json')

module.exports = {
    index: (req, res) => {
        return res.send(productos)
    },
    show: (req, res) => {
        const product = productos.find(product => product.id == req.params.id)
        if (!product) return res.status(404).send('Producto no encontrado')
        return res.send(product)
    },
    create: (req, res) => {
        let data = fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf8')
        let list = JSON.parse(data)
        let element = list[list.length - 1];
        let id = list.length > 0 ? element.id + 1 : 1;
        let newProduct = Object({
            id,
            title: req.body.title,
            price: req.body.price,
            image: req.file ? req.file.filename : null,
        })
        list.push(newProduct)
        fs.writeFileSync(path.join(__dirname, '../productos.json'), JSON.stringify(list, null, 2))
        return res.send(newProduct)
    },
    update: (req, res) => {
        let data = fs.readFileSync(path.join(__dirname, '../productos.json'), 'utf8')
        let list = JSON.parse(data);
        let product = Object({
            id: parseInt(req.params.id),
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        })
        let update = list.map(prod => prod.id == product.id ? product : prod)
        fs.writeFileSync(path.join(__dirname, '../productos.json'), JSON.stringify(update, null, 2))
        return res.send(product)
    },
    destroy: (req, res) => {
        let data = fs.readFileSync(path.join(__dirname, '../productos.json'), 'utf8')
        let list = JSON.parse(data);
     
        list = list.filter(e=> e.id != req.params.id);
        fs.writeFileSync(path.join(__dirname, '../productos.json'), JSON.stringify(list, null, 2))
    
        return res.send(list)
    }

}