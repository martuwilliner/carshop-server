// Products routes
const {Router} = require("express");
const router = Router();
const {create,destroy, products, addCart, deleteCart} = require("../controllers/carrito");


// routes

router.post("/" , create); // crear un carrito
router.delete("/:id",destroy); // eliminar un carrito
router.get("/:id/productos",products); // listado de productos del carrito
router.post("/:id/productos",addCart); // agregar un producto al carrito
router.delete("/:id/productos/:id_prod",deleteCart); // eliminar un producto del carrito

module.exports = router;