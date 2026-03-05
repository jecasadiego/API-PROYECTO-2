const { Genre, Media } = require("../models");
const AppError = require("../utils/AppError");

const listGenres = async (req, res) => {
  const where = {};
  if (req.query.isActive !== undefined) {
    where.isActive = req.query.isActive === "true";
  }

  const genres = await Genre.findAll({
    where,
    order: [["name", "ASC"]],
  });

  res.json({ success: true, data: genres });
};

const getGenreById = async (req, res) => {
  const genre = await Genre.findByPk(req.params.id);
  if (!genre) {
    throw new AppError("Genero no encontrado", 404);
  }

  res.json({ success: true, data: genre });
};

const createGenre = async (req, res) => {
  const { name, isActive = true, description = null } = req.body;
  if (!name) {
    throw new AppError("name es obligatorio", 400);
  }

  const genre = await Genre.create({ name, isActive, description });
  res.status(201).json({ success: true, data: genre });
};

const updateGenre = async (req, res) => {
  const genre = await Genre.findByPk(req.params.id);
  if (!genre) {
    throw new AppError("Genero no encontrado", 404);
  }

  const allowedFields = ["name", "isActive", "description"];
  const payload = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      payload[field] = req.body[field];
    }
  }

  await genre.update(payload);
  res.json({ success: true, data: genre });
};

const deleteGenre = async (req, res) => {
  const genre = await Genre.findByPk(req.params.id);
  if (!genre) {
    throw new AppError("Genero no encontrado", 404);
  }

  const mediaCount = await Media.count({ where: { genreId: genre.id } });
  if (mediaCount > 0) {
    throw new AppError("No se puede eliminar: el genero tiene media asociada", 409);
  }

  await genre.destroy();
  res.status(204).send();
};

module.exports = {
  listGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
};
