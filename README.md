# User Management API

API para la gestión de usuarios.

## Requisitos

- Node.js
- Typescript
- MongoDB
- ts-node (global)
- nodemon

## Instalación

1. Clona este repositorio
2. Instala las dependencias utilizando el manejador de dependencias pnpm o npm:

```
pnpm install o npm install
```
3. Crea un archivo `.env` en la raíz del proyecto y agrega las variables de entorno necesarias

## Variables de entorno

| Variable          | Descripción                                         |
| ----------------- | --------------------------------------------------- |
| `DB_URI`          | URL de conexión a la base de datos de MongoDB.      |
| `JWT_SECRET`      | Clave secreta utilizada para firmar los tokens JWT. |
| `ROLE_DEFAULT`    | Id de el role user, crear el role user primero      |


4. Inicia el servidor:

```
npm run start o pnpm start
```