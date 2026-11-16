const express = require('express');
const cors = require('cors');
require('dotenv').config({ quiet: true });

const clienteRoutes = require('./routes/clienteRoutes');
const productoRoutes = require('./routes/productoRoutes'); // <-- Importar rutas de productos

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Registrar Rutas de la API
app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes); // <-- Registrar endpoint de productos

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('API de Tienda de Costura funcionando correctamente 🚀');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});