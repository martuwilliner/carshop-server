const firebaseManager = require('../classes/firebaseManager');

const carrito = new firebaseManager('Carrito');

module.exports = {

    index: async (req, res) => {
        return res.send(await carrito.getDocs());
    },

    show: async (req, res) => {
        const product = await carrito.getDoc(req.params.id);
        if (!product) return res.status(404).send('Producto no encontrado');
        return res.send(product);
    },

    create: async (req, res) => {
        let newProduct = Object({
            title: req.body.title,
            price: req.body.price,
            image: req.file ? req.file.filename : req.body.image,
            description: req.body.description,
            timestamp: new Date().getTime(),
            code: req.body.code,
            stock: req.body.stock
        })
        let product = await carrito.addDoc(newProduct);
        return res.send(product);
    },

    update: async (req, res) => {
        const product = await carrito.updateDoc(req.params.id, req.body);
        if (!product) return res.status(404).send('Producto no encontrado');
        return res.send(product);
    },

    destroy: async (req, res) => {
        const product = await carrito.deleteDoc(req.params.id);
        if (!product) return res.status(404).send('Producto no encontrado');
        return res.send(product);
    }
    

}