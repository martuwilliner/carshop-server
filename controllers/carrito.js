const modelManager = require('../classes/modelManager');

const carrito = new modelManager('carrito'); // carrito.json
const producto = new modelManager('productos'); // productos.json

module.exports = {
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
        let product = carrito.create(newProduct);
        return res.send(product);
    },
    destroy: (req, res) => {
        const product = carrito.destroy(parseInt(req.params.id));
        if (!product) return res.status(404).send('carrito no encontrado');
        return res.send(product);
    },

    products: (req, res) => {
        const cart = carrito.show(parseInt(req.params.id));
        if (!cart) return res.status(404).send('carrito no encontrado');
        return res.send(cart.products); // solo enviamos los productos del carrito que nos indiquen
    },

    addCart: (req, res) => {
        const cart = carrito.show(parseInt(req.params.id));
        if (!cart) return res.status(404).send('carrito no encontrado');
        const product = producto.show(parseInt(req.body.id));
        if (!product) return res.status(404).send('producto no encontrado');
        if (product.stock < req.body.cantidad) return res.status(404).send('No hay stock suficiente');
        const newProduct = Object({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
            timestamp: product.timestamp,
            code: product.code,
            stock: product.stock,
            cantidad: req.body.cantidad
        })
        cart.products.push(newProduct);
        return res.send(cart);
    },
    deleteCart: (req, res) => {
        const cart = carrito.show(parseInt(req.params.id));
        if (!cart) return res.status(404).send('carrito no encontrado');
        const product = producto.show(parseInt(req.params.id_prod));
        if (!product) return res.status(404).send('producto no encontrado');
        const newCart = cart.products.filter(prod => prod.id != req.params.id_prod);
        return res.send(newCart);
    }
    

}