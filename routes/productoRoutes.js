const { Router } = require('express');
const { obtenerProductos, crearProducto } = require('../controllers/productoController');

const router = Router();

// Ruta para consultar el catálogo: GET /api/productos
router.get('/', obtenerProductos);

// Ruta para agregar un producto: POST /api/productos
router.post('/', crearProducto);

module.exports = router;