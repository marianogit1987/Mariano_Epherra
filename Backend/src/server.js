// ==========================================================================
// SECCIÓN B: Servidor Node.js y Express para la Gestión de Proyectos (CRUD)
// ==========================================================================

const express = require('express');
const cors = require('cors');

// Importamos la conexión independiente a MySQL desde config/db.js
const db = require('./config/db');

const app = express();
const PORT = 3000;

// --------------------------------------------------------------------------
// RUTAS DE LA API REST (CRUD DE PROYECTOS)
// --------------------------------------------------------------------------

// 1. CONSULTAR (GET) - Obtener todos los proyectos
app.get('/api/proyectos', (req, res) => {
    const query = 'SELECT * FROM proyectos ORDER BY id DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ Error al obtener proyectos:', err);
            return res.status(500).json({ error: 'Error al consultar la base de datos.' });
        }
        res.json(results);
    });
});

// 2. CREAR (POST) - Registrar un nuevo proyecto
app.post('/api/proyectos', (req, res) => {
    const { nombre, descripcion, tecnologias, imagen, estado } = req.body;

    // Validación básica de campos requeridos
    if (!nombre || !descripcion || !tecnologias) {
        return res.status(400).json({ error: 'Nombre, descripción y tecnologías son obligatorios.' });
    }

    const query = 'INSERT INTO proyectos (nombre, descripcion, tecnologias, imagen, estado) VALUES (?, ?, ?, ?, ?)';
    const valores = [
        nombre, 
        descripcion, 
        tecnologias, 
        imagen || 'img/proyecto1.png', 
        estado || 'Publicado'
    ];

    db.query(query, valores, (err, result) => {
        if (err) {
            console.error('❌ Error al insertar proyecto:', err);
            return res.status(500).json({ error: 'Error al registrar el proyecto.' });
        }
        res.status(201).json({
            mensaje: '✅ Proyecto creado exitosamente.',
            id: result.insertId
        });
    });
});

// 3. MODIFICAR (PUT) - Actualizar un proyecto existente por ID
app.put('/api/proyectos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, tecnologias, imagen, estado } = req.body;

    const query = 'UPDATE proyectos SET nombre = ?, descripcion = ?, tecnologias = ?, imagen = ?, estado = ? WHERE id = ?';
    const valores = [nombre, descripcion, tecnologias, imagen, estado, id];

    db.query(query, valores, (err, result) => {
        if (err) {
            console.error('❌ Error al actualizar proyecto:', err);
            return res.status(500).json({ error: 'Error al actualizar el proyecto.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Proyecto no encontrado.' });
        }
        res.json({ mensaje: '✅ Proyecto actualizado correctamente.' });
    });
});

// 4. ELIMINAR (DELETE) - Quitar un proyecto por ID
app.delete('/api/proyectos/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM proyectos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('❌ Error al eliminar proyecto:', err);
            return res.status(500).json({ error: 'Error al borrar el proyecto.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Proyecto no encontrado.' });
        }
        res.json({ mensaje: '🗑️ Proyecto eliminado correctamente.' });
    });
});

// Iniciar servidor Express
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});