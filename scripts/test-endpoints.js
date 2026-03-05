const app = require("../src/app");
const { initializeDatabase } = require("../src/models");

const TEST_PORT = process.env.TEST_PORT || 3105;
const BASE_URL = `http://localhost:${TEST_PORT}/api/v1`;

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const request = async (method, path, body) => {
  const options = { method, headers: {} };

  if (body !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, options);
  const rawText = await response.text();
  const data = rawText ? JSON.parse(rawText) : null;

  return {
    status: response.status,
    data,
  };
};

const expectStatus = (result, expectedStatus, label) => {
  if (result.status !== expectedStatus) {
    throw new Error(
      `${label} -> esperado ${expectedStatus}, recibido ${result.status}. Respuesta: ${JSON.stringify(result.data)}`
    );
  }
};

const run = async () => {
  await initializeDatabase();

  const server = app.listen(TEST_PORT);
  console.log(`Probando endpoints en ${BASE_URL}`);

  try {
    const unique = Date.now();

    // Health
    const health = await request("GET", "/health");
    expectStatus(health, 200, "GET /health");
    assert(health.data.success === true, "GET /health debe retornar success=true");

    // Genre
    const genres = await request("GET", "/genres");
    expectStatus(genres, 200, "GET /genres");

    const createdGenre = await request("POST", "/genres", {
      name: `Genero-${unique}`,
      isActive: true,
      description: "Genero de prueba",
    });
    expectStatus(createdGenre, 201, "POST /genres");
    const genreId = createdGenre.data.data.id;

    const genreById = await request("GET", `/genres/${genreId}`);
    expectStatus(genreById, 200, "GET /genres/:id");

    const updatedGenre = await request("PUT", `/genres/${genreId}`, {
      description: "Genero actualizado",
    });
    expectStatus(updatedGenre, 200, "PUT /genres/:id");

    // Director
    const directors = await request("GET", "/directors");
    expectStatus(directors, 200, "GET /directors");

    const createdDirector = await request("POST", "/directors", {
      names: `Director-${unique}`,
      isActive: true,
    });
    expectStatus(createdDirector, 201, "POST /directors");
    const directorId = createdDirector.data.data.id;

    const directorById = await request("GET", `/directors/${directorId}`);
    expectStatus(directorById, 200, "GET /directors/:id");

    const updatedDirector = await request("PUT", `/directors/${directorId}`, {
      isActive: true,
    });
    expectStatus(updatedDirector, 200, "PUT /directors/:id");

    // Producer
    const producers = await request("GET", "/producers");
    expectStatus(producers, 200, "GET /producers");

    const createdProducer = await request("POST", "/producers", {
      name: `Productora-${unique}`,
      isActive: true,
      slogan: "Slogan test",
      description: "Productora de prueba",
    });
    expectStatus(createdProducer, 201, "POST /producers");
    const producerId = createdProducer.data.data.id;

    const producerById = await request("GET", `/producers/${producerId}`);
    expectStatus(producerById, 200, "GET /producers/:id");

    const updatedProducer = await request("PUT", `/producers/${producerId}`, {
      slogan: "Slogan actualizado",
    });
    expectStatus(updatedProducer, 200, "PUT /producers/:id");

    // Type
    const types = await request("GET", "/types");
    expectStatus(types, 200, "GET /types");

    const createdType = await request("POST", "/types", {
      name: `Tipo-${unique}`,
      description: "Tipo de prueba",
    });
    expectStatus(createdType, 201, "POST /types");
    const typeId = createdType.data.data.id;

    const typeById = await request("GET", `/types/${typeId}`);
    expectStatus(typeById, 200, "GET /types/:id");

    const updatedType = await request("PUT", `/types/${typeId}`, {
      description: "Tipo actualizado",
    });
    expectStatus(updatedType, 200, "PUT /types/:id");

    // Media
    const mediaList = await request("GET", "/media");
    expectStatus(mediaList, 200, "GET /media");

    const createdMedia = await request("POST", "/media", {
      serial: `SER-${unique}`,
      title: `Pelicula-${unique}`,
      synopsis: "Sinopsis de prueba",
      url: `https://stream.example.com/${unique}`,
      coverImage: `https://img.example.com/${unique}.jpg`,
      releaseYear: 2024,
      genreId,
      directorId,
      producerId,
      typeId,
    });
    expectStatus(createdMedia, 201, "POST /media");
    const mediaId = createdMedia.data.data.id;

    const mediaById = await request("GET", `/media/${mediaId}`);
    expectStatus(mediaById, 200, "GET /media/:id");

    const filteredMedia = await request("GET", `/media?title=Pelicula-${unique}`);
    expectStatus(filteredMedia, 200, "GET /media?title=");

    const updatedMedia = await request("PUT", `/media/${mediaId}`, {
      title: `Pelicula-${unique}-editada`,
    });
    expectStatus(updatedMedia, 200, "PUT /media/:id");

    // Delete flow
    const deletedMedia = await request("DELETE", `/media/${mediaId}`);
    expectStatus(deletedMedia, 204, "DELETE /media/:id");

    const deletedType = await request("DELETE", `/types/${typeId}`);
    expectStatus(deletedType, 204, "DELETE /types/:id");

    const deletedGenre = await request("DELETE", `/genres/${genreId}`);
    expectStatus(deletedGenre, 204, "DELETE /genres/:id");

    const deletedDirector = await request("DELETE", `/directors/${directorId}`);
    expectStatus(deletedDirector, 204, "DELETE /directors/:id");

    const deletedProducer = await request("DELETE", `/producers/${producerId}`);
    expectStatus(deletedProducer, 204, "DELETE /producers/:id");

    console.log("Todos los endpoints pasaron correctamente.");
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error ejecutando pruebas de endpoints:");
    console.error(error.message);
    process.exit(1);
  });
