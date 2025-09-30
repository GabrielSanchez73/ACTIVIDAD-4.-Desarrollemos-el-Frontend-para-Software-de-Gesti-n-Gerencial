// Configuración del sistema
export const CONFIG = {
  // URLs de la API
  API_BASE_URL: 'http://localhost:5000',
  
  // Endpoints
  ENDPOINTS: {
    EMPLEADOS: '/empleados',
    NOMINAS: '/nominas',
    BENEFICIOS: '/beneficios',
    DEDUCCIONES: '/deducciones',
    REPORTES: '/reportes',
    ESTADISTICAS: '/estadisticas',
    PRODUCTOS: '/productos',
    CATEGORIAS: '/categorias'
  },
  
  // Configuración de la aplicación
  APP: {
    NOMBRE: 'Sistema de Nómina Empresarial',
    DESCRIPCION: 'Gestión de empleados, salarios, beneficios, deducciones y reportes',
    VERSION: '1.0.0'
  },
  
  // Configuración de la base de datos (referencial)
  DB: {
    NOMBRE: 'sistema_nomina',
  }
};

// Función helper para construir URLs completas
export const buildApiUrl = (endpoint) => `${CONFIG.API_BASE_URL}${endpoint}`;

// Función helper para obtener la URL completa de un endpoint
export const getApiUrl = (endpointName) => buildApiUrl(CONFIG.ENDPOINTS[endpointName]);

