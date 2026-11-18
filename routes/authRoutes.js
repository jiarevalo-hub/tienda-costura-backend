const { Router } = require('express');
const {
    registrarUsuario,
    loginUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/authController');

const router = Router();

router.post('/registro', registrarUsuario);       // POST /api/auth/registro
router.post('/login', loginUsuario);              // POST /api/auth/login
router.get('/usuarios', obtenerUsuarios);         // GET /api/auth/usuarios
router.get('/usuarios/:id', obtenerUsuarioPorId); // GET /api/auth/usuarios/:id
router.put('/usuarios/:id', actualizarUsuario);   // PUT /api/auth/usuarios/:id
router.delete('/usuarios/:id', eliminarUsuario);  // DELETE /api/auth/usuarios/:id

module.exports = router;