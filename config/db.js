const { Pool } = require('pg');
require('dotenv').config({ quiet: true });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error al conectar a la base de datos de Neon:', err.stack);
    }
    console.log('¡Conectado exitosamente a la base de datos en Neon!');
    release();
});

module.exports = pool;