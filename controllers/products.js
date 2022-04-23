const modelManager = require('../classes/modelManager');

const producto = new modelManager('productos'); // productos.json

module.exports = {
    index: (req, res) => {
        return res.send(producto.index());
    },
    show: (req, res) => {
        const product = producto.show(parseInt(req.params.id));
        if (!product) return res.status(404).send('Producto no encontrado');
        return res.send(product);
    },
    create: (req, res) => {
        
        let newProduct = Object({
            title: req.body.title,
            price: req.body.price,
            image: req.file ? req.file.filename : null,
            description: req.body.description,
            timestamp: new Date().getTime(),
            code: req.body.code,
            stock: req.body.stock
        })
        let product = producto.create(newProduct);
        return res.send(product);
    },
    update: (req, res) => {
        const product = producto.update(parseInt(req.params.id), req.body);
        if (!product) return res.status(404).send('Producto no encontrado');
        return res.send(product);
    },
    destroy: (req, res) => {
        const product = producto.destroy(parseInt(req.params.id));
        if (!product) return res.status(404).send('Producto no encontrado');
        return res.send(product);
    }

}