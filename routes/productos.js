// Products routes
const {Router} = require("express");
const router = Router();
const multer = require("multer")
const path = require("path")
const {index,show,create,update,destroy} = require("../controllers/products");

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

router.get("/",index);
router.get("/:id",show);
router.post("/", upload.single("image"), create); // upload.single("image") --> multer implementation
router.put("/:id",update);
router.delete("/:id",destroy);

module.exports = router;