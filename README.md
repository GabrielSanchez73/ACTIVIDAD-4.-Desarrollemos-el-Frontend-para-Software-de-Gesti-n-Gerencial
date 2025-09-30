# Sistema de Gestión de Empleados

Sistema web desarrollado con Node.js, MySQL y React para la gestión de empleados de una empresa.

## Características

- CRUD completo de empleados
- Interfaz web moderna con Material-UI
- Base de datos MySQL
- API REST con Express.js
- Filtros y búsqueda avanzada
- Estadísticas en tiempo real

## Tecnologías

- Backend: Node.js, Express.js, MySQL
- Frontend: React, Material-UI
- Base de datos: MySQL

## Instalación

1. Clonar el repositorio
2. Instalar dependencias del servidor: `cd server && npm install`
3. Instalar dependencias del cliente: `cd client && npm install`
4. Configurar la base de datos MySQL
5. Ejecutar el servidor: `cd server && node index.js`
6. Ejecutar el cliente: `cd client && npm start`

## Estructura del Proyecto

```
├── server/          # Backend API
├── client/          # Frontend React
└── database.sql     # Script de base de datos
```

## Uso

El sistema permite gestionar empleados con operaciones de crear, leer, actualizar y eliminar. Incluye filtros por nombre, identificación y estado, además de estadísticas en tiempo real.
