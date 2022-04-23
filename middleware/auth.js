// Auth Middleware

module.exports = function (req, res, next) { 
    if(req.headers && req.headers['api']&&req.headers['api']==='admin'){ 
        next();
    }
    else{
        return res.status(401).send('No tienes permisos para acceder a esta ruta');
    }
}

