const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Clave secreta para firmar los tokens (en producción debe ir en el archivo .env)
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro_costura';

// Registrar un nuevo cliente / usuario
const registrarUsuario = async (req, res) => {
    const { nombre, correo, password } = req.body;
    try {
        // Verificar si el correo ya existe
        const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        if (usuarioExistente.rows.length > 0) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Guardar usuario en la base de datos (por defecto rol 'cliente')
        const query = `
      INSERT INTO usuarios (nombre, correo, password, rol) 
      VALUES ($1, $2, $3, 'cliente') RETURNING id, nombre, correo, rol;
    `;
        const resultado = await pool.query(query, [nombre, correo, passwordHash]);

        res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            usuario: resultado.rows[0]
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno al registrar usuario' });
    }
};

// Iniciar sesión (para Administrador o Clientes)
const loginUsuario = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const resultado = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        if (resultado.rows.length === 0) {
            return res.status(400).json({ error: 'Credenciales inválidas (correo no encontrado).' });
        }

        const usuario = resultado.rows[0];

        // Validar contraseña
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({ error: 'Credenciales inválidas (contraseña incorrecta).' });
        }

        // Generar Token JWT
        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno al iniciar sesión' });
    }
};

module.exports = {
    registrarUsuario,
    loginUsuario
};