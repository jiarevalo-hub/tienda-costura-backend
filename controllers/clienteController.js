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

// Obtener un cliente por ID (GET /api/clientes/:id)
const obtenerClientePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
};

// Registrar un nuevo cliente (POST /api/clientes)
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

// Actualizar un cliente (PUT /api/clientes/:id)
const actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, correo } = req.body;
    try {
        const query = `
      UPDATE clientes 
      SET nombre = $1, telefono = $2, correo = $3 
      WHERE id = $4 RETURNING *;
    `;
        const resultado = await pool.query(query, [nombre, telefono, correo, id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// Eliminar un cliente (DELETE /api/clientes/:id)
const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ mensaje: 'Cliente eliminado correctamente', cliente: resultado.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};

module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};