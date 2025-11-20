// Server principal

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Rutas

const abrigoRoutes = require('./routes/abrigoRoutes');
const ninosRoutes = require('./routes/ninosRoutes');


const adopcionesRoutes = require('./routes/adopcionesRoutes');
const alertasRoutes = require('./routes/alertasRoutes');
const educacionRoutes = require('./routes/educacionRoutes');
const familiaresRoutes = require('./routes/familiaresRoutes');
const hermanosRoutes = require('./routes/hermanosRoutes');
const ongRoutes = require('./routes/ongRoutes');
const reportesRoutes = require('./routes/reportesRoutes');
const responsablesRoutes = require('./routes/responsablesRoutes');
const saludRoutes = require('./routes/saludRoutes');
const ubicacionesRoutes = require('./routes/ubicacionesRoutes');
const visitasRoutes = require('./routes/visitasRoutes');

const app = express();
const PORT = 3000;



// Middlewares
app.use(cors());
app.use(bodyParser.json());



// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/PANI_DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado correctamente'))
.catch(err => console.log('Error de conexión a MongoDB:', err));



// Rutas principales
app.use('/api/abrigo', abrigoRoutes);
app.use('/api/ninos', ninosRoutes);




app.use('/api/adopciones', adopcionesRoutes);
app.use('/api/alertas', alertasRoutes);
app.use('/api/educacion', educacionRoutes);
app.use('/api/familiares', familiaresRoutes);
app.use('/api/hermanos', hermanosRoutes);
app.use('/api/ong', ongRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/responsables', responsablesRoutes);
app.use('/api/salud', saludRoutes);
app.use('/api/ubicaciones', ubicacionesRoutes);
app.use('/api/visitas', visitasRoutes);


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor encendido en http://localhost:${PORT}`);
});
