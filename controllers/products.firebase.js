const firebaseManager = require('../classes/firebaseManager');

const producto = new firebaseManager('Productos');

module.exports = {

    index: async (req, res) => {
        return res.send(await producto.getDocs());
    },
    show: async (req, res) => {
        const product = await producto.getDoc(req.params.id);
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
        let product = await producto.addDoc(newProduct);
        return res.send(product);
    },
    update: async (req, res) => {
        const product = await producto.updateDoc(req.params.id, req.body);
        if (!product) return res.status(404).send('Producto no encontrado');
        return res.send(product);
    },
    destroy: async (req, res) => {
        const product = await producto.deleteDoc(req.params.id);
        if (!product) return res.status(404).send('Producto no encontrado');
        return res.send(product);
    }

}