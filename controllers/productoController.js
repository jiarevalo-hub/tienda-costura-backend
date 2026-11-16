const pool = require('../config/db');

// Obtener todos los productos y servicios del catálogo
const obtenerProductos = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM productos ORDER BY id DESC');
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener el catálogo de productos' });
    }
};

// Registrar un nuevo producto o servicio en el catálogo
const crearProducto = async (req, res) => {
    const { nombre, descripcion, precio, categoria, imagen_url } = req.body;
    try {
        const query = `
      INSERT INTO productos (nombre, descripcion, precio, categoria, imagen_url) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
        const valores = [nombre, descripcion, precio, categoria, imagen_url];
        const resultado = await pool.query(query, valores);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error al registrar el producto' });
    }
};

module.exports = {
    obtenerProductos,
    crearProducto
};