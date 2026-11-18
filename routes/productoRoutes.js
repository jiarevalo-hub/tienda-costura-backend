const { Router } = require('express');
const {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productoController');
const { verificarAdmin } = require('../middleware/authMiddleware');

const router = Router();

// GET /api/productos -> Público (cualquiera ve el catálogo)
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);

// POST, PUT, DELETE /api/productos -> Protegidos (SOLO el administrador con token)
router.post('/', verificarAdmin, crearProducto);
router.put('/:id', verificarAdmin, actualizarProducto);
router.delete('/:id', verificarAdmin, eliminarProducto);

module.exports = router;