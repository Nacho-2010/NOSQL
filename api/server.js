//Crea el server principal

//npm install express mongoose body-parser cors
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');//URL y https

//const rutas
const cursoRoutes = require ('./routes/CursoRoutes');

const app = express();
const PORT = 3000;

//Middlewares (Son como las urls del sitio) 
app.use(cors());
app.use(bodyParser.json());

//Conexion hacia mongo
mongoose.connect('mongodb://localhost:27017/academiaM', {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then( ()=>console.log('Mongo DB Success')  )
.catch( err =>console.log('Mongo DB error: ', err )  );
//las rutas

app.use('/api/curso', cursoRoutes);

//Inciar el servidor, o como veremos el server.
app.listen(PORT, ()=>{
    console.log(`Servidor encendido http://localhost:${PORT}`);
});




// function hola (){

// }

// ()=>