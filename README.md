# Altos Senderos - Proyecto de Reservas de Viajes

Este proyecto de reservas de viajes, llamado **Altos Senderos**, es una aplicación web que permite a los usuarios explorar paquetes de viajes, realizar reservas y gestionar sus pagos. El proyecto se divide en dos partes principales: una **API** desarrollada con **Node.js** y **Express** y un **frontend** implementado con **React**.

## Tabla de Contenidos

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [API con Node.js](#api-con-nodejs)
  - [Estructura de la API](#estructura-de-la-api)
  - [Rutas de la API](#rutas-de-la-api)
- [Frontend con React](#frontend-con-react)
  - [Componentes Principales](#componentes-principales)
  - [Funcionalidades](#funcionalidades)
- [Ejecutar la Aplicación](#ejecutar-la-aplicación)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## Características

- **Backend con Node.js y Express**: API RESTful que maneja los datos de usuarios, paquetes y reservas.
- **Frontend con React**: Interfaz de usuario para navegar, reservar y gestionar paquetes de viaje.
- **Autenticación de Usuarios**: Registro y login de usuarios con gestión de roles.
- **Gestión de Reservas**: Creación, visualización y eliminación de reservas.
- **Redirección de Usuarios**: Protección de rutas para redirigir a los usuarios no autenticados al login.

---

## Requisitos

- **Node.js**: versión 14 o superior
- **NPM** o **Yarn** para gestionar dependencias
- **MySQL**: base de datos para almacenar la información
- **React**: versión 17 o superior para el frontend

---

## Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/altos-senderos.git
   cd altos-senderos
   ```

2. **Instalar dependencias** para el backend y el frontend:
   ```bash
   # En la carpeta del backend
   cd api
   npm install

   # En la carpeta del frontend
   cd ../frontend
   npm install
   ```

3. **Configurar la base de datos**:
   - Crea una base de datos en MySQL.
   - Configura las credenciales en un archivo `.env` en la carpeta `api`, incluyendo el nombre de la base de datos, usuario, contraseña, y host.

4. **Variables de entorno**:
   - Crea un archivo `.env` en ambas carpetas (`api` y `frontend`) con las variables de entorno necesarias.

---

## API con Node.js

### Estructura de la API

```
api/
├── src/
│   ├── config/
│   │   └── config.js       # Configuración de la base de datos y variables de entorno
│   ├── controllers/
│   │   └── bookingController.js  # Controlador para las reservas
│   ├── models/
│   │   └── Booking.js      # Modelo de base de datos para reservas
│   ├── routes/
│   │   └── bookingRoutes.js # Rutas para el manejo de reservas
│   └── server.js           # Configuración y inicio del servidor
└── package.json
```

### Rutas de la API

- **POST /api/bookings**: Crear una nueva reserva
- **GET /api/bookings**: Obtener todas las reservas
- **DELETE /api/bookings/:id**: Eliminar una reserva por ID
- **GET /api/packages/:id**: Obtener detalles de un paquete específico

### Ejemplo de Rutas y Controladores

- `POST /api/bookings`: Para crear una reserva, se espera un cuerpo JSON que incluya `id_usuario`, `id_paquete`, `booking_date`, y `status`.
- `GET /api/bookings`: Devuelve todas las reservas, filtrando por usuario si es necesario.
- `DELETE /api/bookings/:id`: Elimina la reserva especificada por `id`.

---

## Frontend con React

### Estructura de Carpetas del Frontend

```
frontend/
├── src/
│   ├── assets/             # Imágenes y recursos
│   ├── components/
│   │   ├── Navbar.js       # Componente de navegación
│   │   └── Reservas.js     # Componente principal de reservas
│   ├── context/
│   │   └── AuthProvider.js # Proveedor de autenticación de contexto
│   ├── pages/
│   │   └── Home.js         # Página de inicio
│   └── App.js              # Configuración principal de rutas
└── package.json
```

### Componentes Principales

- **Navbar**: Barra de navegación con links a destinos, paquetes, y login/registro.
- **Reservas**: Página principal para ver paquetes, crear reservas, y gestionar las reservas existentes.
- **AuthProvider**: Contexto de autenticación para gestionar el estado de usuario logueado.

### Funcionalidades

1. **Protección de Rutas**: Usuarios no autenticados son redirigidos a la página de login.
2. **Interacción con la API**: La página de reservas permite agregar y eliminar reservas.
3. **Interfaz de Usuario Dinámica**: Botones y formularios ajustados según el rol del usuario.

---

## Ejecutar la Aplicación

1. **Iniciar el backend** (API en Node.js):
   ```bash
   cd api
   npm start
   ```

2. **Iniciar el frontend** (Aplicación React):
   ```bash
   cd frontend
   npm start
   ```

3. La aplicación debería estar accesible en `http://localhost:3000` y la API en `http://localhost:8082`.

---



