-- Crear la base de datos de nómina
CREATE DATABASE IF NOT EXISTS sistema_nomina;
USE sistema_nomina;

-- Tabla de empleados
CREATE TABLE IF NOT EXISTS empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    identificacion VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(150) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telefono VARCHAR(30),
    fecha_ingreso DATE NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    salario_base DECIMAL(12,2) NOT NULL,
    tipo_contrato ENUM('Fijo','Indefinido','Temporal') DEFAULT 'Indefinido',
    estado ENUM('Activo','Inactivo') DEFAULT 'Activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de productos (compatibilidad con App.js)
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    proveedor VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo para empleados
INSERT INTO empleados (identificacion, nombres, apellidos, email, telefono, fecha_ingreso, cargo, salario_base, tipo_contrato, estado) VALUES
('12345678', 'Juan Carlos', 'García López', 'juan.garcia@empresa.com', '555-0101', '2023-01-15', 'Desarrollador Senior', 75000.00, 'Indefinido', 'Activo'),
('23456789', 'María Elena', 'Rodríguez Pérez', 'maria.rodriguez@empresa.com', '555-0102', '2023-02-20', 'Diseñadora UX/UI', 65000.00, 'Indefinido', 'Activo'),
('34567890', 'Carlos Alberto', 'Martínez Silva', 'carlos.martinez@empresa.com', '555-0103', '2023-03-10', 'Gerente de Proyectos', 85000.00, 'Indefinido', 'Activo'),
('45678901', 'Ana Sofía', 'Hernández Torres', 'ana.hernandez@empresa.com', '555-0104', '2023-04-05', 'Analista de Sistemas', 60000.00, 'Indefinido', 'Activo'),
('56789012', 'Luis Miguel', 'González Ruiz', 'luis.gonzalez@empresa.com', '555-0105', '2023-05-12', 'Desarrollador Full Stack', 70000.00, 'Indefinido', 'Activo'),
('67890123', 'Patricia', 'Morales Castro', 'patricia.morales@empresa.com', '555-0106', '2023-06-18', 'Especialista en Marketing', 55000.00, 'Indefinido', 'Activo'),
('78901234', 'Roberto', 'Jiménez Vargas', 'roberto.jimenez@empresa.com', '555-0107', '2023-07-22', 'Administrador de Base de Datos', 68000.00, 'Indefinido', 'Activo'),
('89012345', 'Carmen', 'López Díaz', 'carmen.lopez@empresa.com', '555-0108', '2023-08-30', 'Recursos Humanos', 58000.00, 'Indefinido', 'Activo'),
('90123456', 'Fernando', 'Sánchez Moreno', 'fernando.sanchez@empresa.com', '555-0109', '2023-09-14', 'Desarrollador Frontend', 62000.00, 'Indefinido', 'Activo'),
('01234567', 'Isabel', 'Ramírez Flores', 'isabel.ramirez@empresa.com', '555-0110', '2023-10-08', 'Contadora', 60000.00, 'Indefinido', 'Activo'),
('11223344', 'Diego', 'Vargas Mendoza', 'diego.vargas@empresa.com', '555-0111', '2023-11-05', 'Desarrollador Backend', 68000.00, 'Indefinido', 'Activo'),
('22334455', 'Valentina', 'Cruz Reyes', 'valentina.cruz@empresa.com', '555-0112', '2023-12-10', 'QA Tester', 52000.00, 'Indefinido', 'Activo'),
('33445566', 'Andrés', 'Navarro Soto', 'andres.navarro@empresa.com', '555-0113', '2024-01-15', 'DevOps Engineer', 72000.00, 'Indefinido', 'Activo'),
('44556677', 'Camila', 'Ortiz Peña', 'camila.ortiz@empresa.com', '555-0114', '2024-02-20', 'Scrum Master', 70000.00, 'Indefinido', 'Activo'),
('55667788', 'Sebastián', 'Rojas Campos', 'sebastian.rojas@empresa.com', '555-0115', '2024-03-12', 'Arquitecto de Software', 90000.00, 'Indefinido', 'Activo');

-- Insertar datos de ejemplo para productos
INSERT INTO productos (nombre, descripcion, precio, categoria, stock, proveedor) VALUES
('Laptop HP Pavilion', 'Laptop HP Pavilion 15" con procesador Intel i5', 899.99, 'Electronicos', 10, 'HP Inc.'),
('Mouse Inalambrico Logitech', 'Mouse optico inalambrico con sensor de alta precision', 25.50, 'Accesorios', 50, 'Logitech'),
('Teclado Mecanico Corsair', 'Teclado mecanico RGB con switches Cherry MX', 89.99, 'Accesorios', 15, 'Corsair'),
('Monitor Samsung 24"', 'Monitor LED Full HD 1920x1080', 199.99, 'Monitores', 8, 'Samsung'),
('Disco Duro SSD 500GB', 'Disco de estado solido de alta velocidad', 79.99, 'Almacenamiento', 25, 'Western Digital'),
('Memoria RAM 16GB', 'Modulo de memoria DDR4 3200MHz', 89.99, 'Componentes', 12, 'Kingston'),
('Tarjeta Grafica RTX 3060', 'Tarjeta grafica NVIDIA RTX 3060 12GB', 399.99, 'Componentes', 5, 'NVIDIA'),
('Auriculares Gaming', 'Auriculares con microfono y sonido envolvente', 59.99, 'Accesorios', 30, 'HyperX');

-- Índices básicos
CREATE INDEX idx_empleado_identificacion ON empleados(identificacion);
CREATE INDEX idx_empleado_estado ON empleados(estado);
CREATE INDEX idx_producto_categoria ON productos(categoria);
CREATE INDEX idx_producto_nombre ON productos(nombre);