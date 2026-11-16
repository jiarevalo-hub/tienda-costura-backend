const { Router } = require('express');
const { obtenerProductos, crearProducto } = require('../controllers/productoController');
const { verificarAdmin } = require('../middleware/authMiddleware');

const router = Router();

// GET /api/productos -> Público (cualquiera ve el catálogo)
router.get('/', obtenerProductos);

// POST /api/productos -> Protegido (SOLO el administrador con token puede agregar)
router.post('/', verificarAdmin, crearProducto);

module.exports = router;