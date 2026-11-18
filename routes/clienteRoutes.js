const { Router } = require('express');
const {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} = require('../controllers/clienteController');

const router = Router();

router.get('/', obtenerClientes);          // GET /api/clientes
router.get('/:id', obtenerClientePorId);   // GET /api/clientes/:id
router.post('/', crearCliente);            // POST /api/clientes
router.put('/:id', actualizarCliente);     // PUT /api/clientes/:id
router.delete('/:id', eliminarCliente);    // DELETE /api/clientes/:id

module.exports = router;