const {Router} = require("express");
const router = Router();
const multer = require("multer")
const path = require("path")
const {index,show,create,update,destroy} = require("../controllers/carrito.firebase");
const auth = require("../middleware/auth");


// Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.resolve(__dirname, '../public/uploads'))},

    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

// routes

router.get("/",index); // listado de productos
router.get("/:id",show); // mostrar un producto
router.post("/", [auth ,upload.single("image")], create); // crear un producto
router.put("/:id",[auth], update); // actualizar un producto
router.delete("/:id",[auth],destroy); // eliminar un producto

module.exports = router;