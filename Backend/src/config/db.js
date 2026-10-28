// ==========================================================================
// CONFIGURACIÓN DE CONEXIÓN A MYSQL (backend/src/config/db.js)
// ==========================================================================

const mysql = require('mysql2');

// Crear la conexión con la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Tu usuario de MySQL
    password: '',      // Tu contraseña de MySQL
    database: 'portfolio_db'
});

// Conectar y verificar errores
db.connect((err) => {
    if (err) {
        console.error('❌ Error de conexión a la base de datos MySQL:', err.message);
        return;
    }
    console.log('⚡ Conectado exitosamente a la base de datos MySQL (portfolio_db)');
});

// Exportar el objeto de conexión para utilizarlo en los controladores o servidor
module.exports = db;