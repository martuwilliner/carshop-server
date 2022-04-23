const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

//----------------------------------------------------------------

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

//-----------------------------------
//Routes
app.use('/api/productos', require('../routes/productos'));


//-----------------------------------





//--------------------------------------
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
server.on('error', (err) => {
    console.log(err);
});
