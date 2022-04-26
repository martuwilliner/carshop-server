const modelManager = require('../classes/modelManager');

const carrito = new modelManager('carrito'); // carrito.json
const producto = new modelManager('productos'); // productos.json

module.exports = {
    create: (req, res) => {
        
        let newCart = Object({
            id: req.body.id,
            timestamp: new Date().getTime(),
            productos:[]
        })
        let product = carrito.create(newCart);
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
        let updateCart = carrito.getAll().map(cart => { // recorremos todos los carritos
            if (cart.id == req.params.id) { // si el carrito que nos indiquen es el que estamos buscando
                let exist = cart.products.find(product => product.id == newProduct.id); // buscamos si el producto que queremos agregar ya existe en el carrito
                if (exist) { // si existe
                    exist.cantidad += newProduct.cantidad;  // sumamos la cantidad que nos indiquen
                    if (exist.cantidad > product.stock) return res.status(404).send('No hay stock suficiente'); // si la cantidad que nos indiquen es mayor a la cantidad del producto
                } else {        
                cart.products.push(newProduct); // si no existe lo agregamos al carrito
                }
            }
        })
        carrito.writeData(updateCart); // escribimos los datos en el archivo
        return res.send(updateCart); // enviamos el carrito actualizado
    },
    deleteCart: (req, res) => { // eliminamos un producto del carrito
        const cart = carrito.show(parseInt(req.params.id)); // buscamos el carrito que nos indiquen
        if (!cart) return res.status(404).send('carrito no encontrado'); // si no existe el carrito
        const product = producto.show(parseInt(req.params.id_prod)); // buscamos el producto que nos indiquen
        if (!product) return res.status(404).send('producto no encontrado'); // si no existe el producto
        const newCart = cart.products.filter(prod => prod.id != req.params.id_prod); // eliminamos el producto del carrito
        carrito.writeData(newCart); // escribimos los datos en el archivo
        return res.send(newCart); // enviamos el carrito actualizado
    }
    

}