// Products routes
const {Router} = require("express");
const router = Router();
const {home} = require("../controllers/main");


// routes

router.get("/",home); // listado de productos

module.exports = router;