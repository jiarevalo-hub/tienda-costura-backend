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

// Obtener un producto por ID (GET /api/productos/:id)
const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// Registrar un nuevo producto o servicio en el catálogo (POST /api/productos)
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

// Actualizar un producto (PUT /api/productos/:id)
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria, imagen_url } = req.body;
    try {
        const query = `
      UPDATE productos 
      SET nombre = $1, descripcion = $2, precio = $3, categoria = $4, imagen_url = $5 
      WHERE id = $6 RETURNING *;
    `;
        const valores = [nombre, descripcion, precio, categoria, imagen_url, id];
        const resultado = await pool.query(query, valores);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// Eliminar un producto (DELETE /api/productos/:id)
const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto eliminado correctamente', producto: resultado.rows[0] });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};