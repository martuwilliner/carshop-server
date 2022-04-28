const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');



app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // para poder recibir datos de formularios
app.use(express.static(path.join(__dirname, '../public'))); // para que se pueda acceder a los archivos estaticos
app.use(express.static(path.join(__dirname, '../uploads'))); // para subir imagenes

//----------------------------------------------------------------

app.set('views', path.join(__dirname, '../views')); 
app.set('view engine', 'pug'); // para que se pueda usar pug

//-----------------------------------
//Routes

app.use(require('../routes/main'))

app.use('/api/productos', require('../routes/productos'));
app.use('/api/carrito', require('../routes/carrito'));


//-----------------------------------





//--------------------------------------
const PORT = 8080;
server.listen(PORT, () => { 
    console.log(`Server listening on port ${PORT}`); 
});
server.on('error', (err) => {
    console.log(err);  
});
