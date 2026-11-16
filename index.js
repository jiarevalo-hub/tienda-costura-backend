const express = require('express');
const cors = require('cors');
require('dotenv').config({ quiet: true });

const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Usar las rutas de clientes
app.use('/api/clientes', clienteRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('API de Tienda de Costura funcionando correctamente 🚀');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});