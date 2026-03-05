const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Genre = require("./Genre")(sequelize, DataTypes);
const Director = require("./Director")(sequelize, DataTypes);
const Producer = require("./Producer")(sequelize, DataTypes);
const Type = require("./Type")(sequelize, DataTypes);
const Media = require("./Media")(sequelize, DataTypes);

Genre.hasMany(Media, { foreignKey: "genreId", as: "mediaItems" });
Media.belongsTo(Genre, { foreignKey: "genreId", as: "genre" });

Director.hasMany(Media, { foreignKey: "directorId", as: "mediaItems" });
Media.belongsTo(Director, { foreignKey: "directorId", as: "director" });

Producer.hasMany(Media, { foreignKey: "producerId", as: "mediaItems" });
Media.belongsTo(Producer, { foreignKey: "producerId", as: "producer" });

Type.hasMany(Media, { foreignKey: "typeId", as: "mediaItems" });
Media.belongsTo(Type, { foreignKey: "typeId", as: "type" });

const seedInitialData = async () => {
  const baseGenres = [
    { name: "Accion", description: "Peliculas de accion" },
    { name: "Aventura", description: "Peliculas de aventura" },
    { name: "Ciencia ficcion", description: "Peliculas de ciencia ficcion" },
    { name: "Drama", description: "Peliculas dramaticas" },
    { name: "Terror", description: "Peliculas de terror" },
  ];

  const baseTypes = [
    { name: "Pelicula", description: "Contenido tipo pelicula" },
    { name: "Serie", description: "Contenido tipo serie" },
  ];

  for (const item of baseGenres) {
    // findOrCreate evita duplicados al reiniciar el servidor.
    await Genre.findOrCreate({
      where: { name: item.name },
      defaults: item,
    });
  }

  for (const item of baseTypes) {
    await Type.findOrCreate({
      where: { name: item.name },
      defaults: item,
    });
  }
};

const initializeDatabase = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  await seedInitialData();
};

module.exports = {
  sequelize,
  initializeDatabase,
  Genre,
  Director,
  Producer,
  Type,
  Media,
};
