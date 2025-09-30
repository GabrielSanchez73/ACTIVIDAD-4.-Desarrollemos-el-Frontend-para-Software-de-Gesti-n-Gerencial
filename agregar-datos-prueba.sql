-- Script para agregar datos de prueba para empleados y productos
USE sistema_nomina;

-- Limpiar datos existentes (opcional - comentar si no quieres borrar)
-- DELETE FROM empleados WHERE identificacion IN ('12345678', '23456789', '34567890', '45678901', '56789012', '67890123', '78901234', '89012345', '90123456', '01234567');

-- Insertar datos de ejemplo para empleados
INSERT IGNORE INTO empleados (identificacion, nombres, apellidos, email, telefono, fecha_ingreso, cargo, salario_base, tipo_contrato, estado) VALUES
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

-- Verificar que se insertaron correctamente
SELECT COUNT(*) AS 'Total Empleados Insertados' FROM empleados WHERE identificacion IN 
('12345678', '23456789', '34567890', '45678901', '56789012', '67890123', '78901234', '89012345', '90123456', '01234567', '11223344', '22334455', '33445566', '44556677', '55667788');

-- Mostrar los empleados insertados
SELECT identificacion, CONCAT(nombres, ' ', apellidos) AS nombre_completo, cargo, salario_base, estado 
FROM empleados 
WHERE identificacion IN ('12345678', '23456789', '34567890', '45678901', '56789012', '67890123', '78901234', '89012345', '90123456', '01234567', '11223344', '22334455', '33445566', '44556677', '55667788')
ORDER BY fecha_ingreso;
