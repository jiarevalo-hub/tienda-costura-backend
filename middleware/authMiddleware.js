const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro_costura';

const verificarAdmin = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        return res.status(403).json({ error: 'Acceso denegado. No se proporcionó token de autenticación.' });
    }

    const token = tokenHeader.split(' ')[1]; // Formato: Bearer <token>
    if (!token) {
        return res.status(403).json({ error: 'Token mal formado.' });
    }

    try {
        const cifrado = jwt.verify(token, JWT_SECRET);
        req.usuario = cifrado;

        // Verificar si es administrador
        if (cifrado.rol !== 'admin') {
            return res.status(401).json({ error: 'Acceso no autorizado. Se requieren privilegios de administrador.' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
};

module.exports = { verificarAdmin };