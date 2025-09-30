const express = require('express')
const cors = require('cors')
const db = require('./db')
const app = express();

app.use(cors())//solicitudes desde otro origenes
app.use(express.json());

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.json({ 
        message: '¡Backend funcionando correctamente!',
        status: 'OK',
        puerto: 5000,
        rutas_disponibles: [
            'GET /empleados',
            'POST /empleados', 
            'PUT /empleados/:id',
            'DELETE /empleados/:id',
            'GET /estadisticas'
        ]
    });
});

// Rutas: Empleados (CRUD + filtros básicos)
app.get('/empleados', (req, res) => {
    const { nombre, identificacion, estado } = req.query;
    let sql = 'SELECT * FROM empleados WHERE 1=1';
    const params = [];
    if (nombre) {
        sql += ' AND (nombres LIKE ? OR apellidos LIKE ?)';
        params.push(`%${nombre}%`, `%${nombre}%`);
    }
    if (identificacion) {
        sql += ' AND identificacion LIKE ?';
        params.push(`%${identificacion}%`);
    }
    if (estado) {
        sql += ' AND estado = ?';
        params.push(estado);
    }
    sql += ' ORDER BY apellidos, nombres ASC';
    db.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener empleados' });
        }
        res.json(results);
    });
});

app.post('/empleados', (req, res) => {
    const { identificacion, nombres, apellidos, email, telefono, fecha_ingreso, cargo, salario_base, tipo_contrato, estado } = req.body;
    if (!identificacion || !nombres || !apellidos || !fecha_ingreso || !cargo || !salario_base) {
        return res.status(400).json({ error: 'identificacion, nombres, apellidos, fecha_ingreso, cargo y salario_base son requeridos' });
    }
    if (isNaN(salario_base) || Number(salario_base) <= 0) {
        return res.status(400).json({ error: 'salario_base debe ser un número positivo' });
    }
    const sql = `INSERT INTO empleados (identificacion, nombres, apellidos, email, telefono, fecha_ingreso, cargo, salario_base, tipo_contrato, estado)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [identificacion, nombres, apellidos, email || null, telefono || null, fecha_ingreso, cargo, salario_base, tipo_contrato || 'Indefinido', estado || 'Activo'];
    db.query(sql, params, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'La identificación o email ya existe' });
            }
            return res.status(500).json({ error: 'Error al crear empleado' });
        }
        res.json({ id: result.insertId, ...req.body });
    });
});

app.put('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const { identificacion, nombres, apellidos, email, telefono, fecha_ingreso, cargo, salario_base, tipo_contrato, estado } = req.body;
    if (!identificacion || !nombres || !apellidos || !fecha_ingreso || !cargo || !salario_base) {
        return res.status(400).json({ error: 'identificacion, nombres, apellidos, fecha_ingreso, cargo y salario_base son requeridos' });
    }
    if (isNaN(salario_base) || Number(salario_base) <= 0) {
        return res.status(400).json({ error: 'salario_base debe ser un número positivo' });
    }
    const sql = `UPDATE empleados SET identificacion=?, nombres=?, apellidos=?, email=?, telefono=?, fecha_ingreso=?, cargo=?, salario_base=?, tipo_contrato=?, estado=?, fecha_actualizacion=NOW() WHERE id=?`;
    const params = [identificacion, nombres, apellidos, email || null, telefono || null, fecha_ingreso, cargo, salario_base, tipo_contrato || 'Indefinido', estado || 'Activo', id];
    db.query(sql, params, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar empleado' });
        }
        res.json({ message: 'Empleado actualizado' });
    });
});

app.delete('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM empleados WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar empleado' });
        }
        res.json({ message: 'Empleado eliminado' });
    });
});

// Ruta para obtener estadísticas básicas
app.get('/estadisticas', (req, res) => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM empleados) AS total_empleados,
            (SELECT AVG(salario_base) FROM empleados) AS salario_promedio,
            (SELECT COUNT(*) FROM empleados WHERE estado = 'Activo') AS empleados_activos
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener estadísticas' });
        }
        res.json(results[0]);
    });
});

// Rutas para productos (compatibilidad con App.js)
app.get('/productos', (req, res) => {
    const { nombre, categoria, precio_min, precio_max } = req.query;
    let sql = 'SELECT * FROM productos WHERE 1=1';
    const params = [];
    
    if (nombre) {
        sql += ' AND nombre LIKE ?';
        params.push(`%${nombre}%`);
    }
    if (categoria) {
        sql += ' AND categoria = ?';
        params.push(categoria);
    }
    if (precio_min) {
        sql += ' AND precio >= ?';
        params.push(precio_min);
    }
    if (precio_max) {
        sql += ' AND precio <= ?';
        params.push(precio_max);
    }
    
    sql += ' ORDER BY nombre ASC';
    
    db.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(results);
    });
});

app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio, categoria, stock, proveedor } = req.body;
    
    if (!nombre || !precio || !categoria || !stock) {
        return res.status(400).json({ error: 'Los campos nombre, precio, categoria y stock son requeridos' });
    }
    
    const sql = `INSERT INTO productos (nombre, descripcion, precio, categoria, stock, proveedor)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [nombre, descripcion, precio, categoria, stock, proveedor];
    
    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear producto' });
        }
        res.json({ id: result.insertId, ...req.body });
    });
});

app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria, stock, proveedor } = req.body;
    
    if (!nombre || !precio || !categoria || !stock) {
        return res.status(400).json({ error: 'Los campos nombre, precio, categoria y stock son requeridos' });
    }
    
    const sql = `UPDATE productos SET nombre=?, descripcion=?, precio=?, categoria=?, stock=?, proveedor=?, fecha_actualizacion=NOW() WHERE id=?`;
    const params = [nombre, descripcion, precio, categoria, stock, proveedor, id];
    
    db.query(sql, params, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar producto' });
        }
        res.json({ message: 'Producto actualizado' });
    });
});

app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM productos WHERE id = ?';
    
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar producto' });
        }
        res.json({ message: 'Producto eliminado' });
    });
});

app.get('/categorias', (req, res) => {
    const sql = 'SELECT DISTINCT categoria FROM productos ORDER BY categoria ASC';
    
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener categorías' });
        }
        const categorias = results.map(row => row.categoria);
        res.json(categorias);
    });
});

app.listen(5000, () => {
    console.log('Servidor del backend corriendo desde el puerto 5000');
    console.log('Sistema de Nómina - Backend');
})