const pool = require('../config/db');

// Obtener todos los clientes
const obtenerClientes = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM clientes ORDER BY id DESC');
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

// Registrar un nuevo cliente
const crearCliente = async (req, res) => {
    const { nombre, telefono, correo } = req.body;
    try {
        const query = `
      INSERT INTO clientes (nombre, telefono, correo) 
      VALUES ($1, $2, $3) RETURNING *;
    `;
        const valores = [nombre, telefono, correo];
        const resultado = await pool.query(query, valores);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el cliente' });
    }
};

module.exports = {
    obtenerClientes,
    crearCliente
};