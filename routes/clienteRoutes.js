const { Router } = require('express');
const { obtenerClientes, crearCliente } = require('../controllers/clienteController');

const router = Router();

router.get('/', obtenerClientes);
router.post('/', crearCliente);

module.exports = router;