# API PROYECTO

API REST para gestion de peliculas y series usando Node.js, Express, Sequelize y SQLite.

## Caracteristicas

- CRUD completo para `genres`, `directors`, `producers`, `types` y `media`.
- Base de datos SQLite local (`data/database.sqlite`).
- Validaciones de negocio en controladores y modelos.
- Manejo centralizado de errores HTTP.
- Seed inicial automatico para generos y tipos.
- Coleccion de Postman lista para pruebas manuales.
- Script de smoke test para validar endpoints principales.

## Stack

- Node.js
- Express
- Sequelize
- SQLite3
- Morgan
- CORS

## Requisitos

- Node.js 18 o superior
- npm 9 o superior
- Git (opcional, para clonar y versionar)

## Instalacion

1. Clona el repositorio:

```bash
git clone https://github.com/jecasadiego/API-PROYECTO-2.git
cd API-PROYECTO-2
```

2. Instala dependencias:

```bash
npm install
```

3. (Opcional) Define el puerto por variable de entorno:

```bash
# Windows PowerShell
$env:PORT=3000

# Linux/macOS
export PORT=3000
```

Si no defines `PORT`, la API inicia en `3000`.

## Ejecucion

Modo normal:

```bash
npm start
```

Modo desarrollo (reinicio automatico por cambios):

```bash
npm run dev
```

Base URL local:

```txt
http://localhost:3000/api/v1
```

## Pruebas

### Smoke test automatizado

Ejecuta una prueba basica de endpoints:

```bash
npm run test:smoke
```

### Postman

Importa el archivo:

```txt
postman/API-PROYECTO-2.postman_collection.json
```

Configura la variable `baseUrl` en Postman, por ejemplo:

```txt
http://localhost:3000
```

## Seed inicial

Al iniciar la aplicacion por primera vez, se crean automaticamente:

- Generos base: Accion, Aventura, Ciencia ficcion, Drama, Terror
- Tipos base: Pelicula, Serie

## Estructura del proyecto

```txt
src/
  app.js
  server.js
  config/
    database.js
  controllers/
  middlewares/
  models/
  routes/
  utils/
postman/
scripts/
data/
```

## Endpoints

### Health

- `GET /health`

### Generos

- `GET /genres`
- `GET /genres/:id`
- `POST /genres`
- `PUT /genres/:id`
- `DELETE /genres/:id`

Filtro disponible:

- `GET /genres?isActive=true`

### Directores

- `GET /directors`
- `GET /directors/:id`
- `POST /directors`
- `PUT /directors/:id`
- `DELETE /directors/:id`

Filtro disponible:

- `GET /directors?isActive=true`

### Productoras

- `GET /producers`
- `GET /producers/:id`
- `POST /producers`
- `PUT /producers/:id`
- `DELETE /producers/:id`

Filtro disponible:

- `GET /producers?isActive=true`

### Tipos

- `GET /types`
- `GET /types/:id`
- `POST /types`
- `PUT /types/:id`
- `DELETE /types/:id`

### Media

- `GET /media`
- `GET /media/:id`
- `POST /media`
- `PUT /media/:id`
- `DELETE /media/:id`

Filtros disponibles:

- `GET /media?title=...`
- `GET /media?genreId=...`
- `GET /media?directorId=...`
- `GET /media?producerId=...`
- `GET /media?typeId=...`
- `GET /media?releaseYear=...`

## Payloads de ejemplo

### Crear genero

```json
{
  "name": "Comedia",
  "isActive": true,
  "description": "Genero para contenido humoristico"
}
```

### Crear director

```json
{
  "names": "Christopher Nolan",
  "isActive": true
}
```

### Crear productora

```json
{
  "name": "Syncopy",
  "isActive": true,
  "slogan": "Story first",
  "description": "Productora cinematografica"
}
```

### Crear tipo

```json
{
  "name": "Documental",
  "description": "Contenido documental"
}
```

### Crear media

```json
{
  "serial": "SER-1001",
  "title": "Titulo de ejemplo",
  "synopsis": "Sinopsis de ejemplo",
  "url": "https://stream.example.com/titulo",
  "coverImage": "https://img.example.com/titulo.jpg",
  "releaseYear": 2024,
  "genreId": 1,
  "directorId": 1,
  "producerId": 1,
  "typeId": 1
}
```

## Notas

- `data/*.sqlite` esta ignorado por Git para no versionar datos locales.
- Si cambia el esquema, elimina `data/database.sqlite` y reinicia para regenerarlo.

## Licencia

ISC
