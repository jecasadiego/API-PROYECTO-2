const { Director, Media } = require("../models");
const AppError = require("../utils/AppError");

const listDirectors = async (req, res) => {
  const where = {};
  if (req.query.isActive !== undefined) {
    where.isActive = req.query.isActive === "true";
  }

  const directors = await Director.findAll({
    where,
    order: [["names", "ASC"]],
  });

  res.json({ success: true, data: directors });
};

const getDirectorById = async (req, res) => {
  const director = await Director.findByPk(req.params.id);
  if (!director) {
    throw new AppError("Director no encontrado", 404);
  }

  res.json({ success: true, data: director });
};

const createDirector = async (req, res) => {
  const { names, isActive = true } = req.body;
  if (!names) {
    throw new AppError("names es obligatorio", 400);
  }

  const director = await Director.create({ names, isActive });
  res.status(201).json({ success: true, data: director });
};

const updateDirector = async (req, res) => {
  const director = await Director.findByPk(req.params.id);
  if (!director) {
    throw new AppError("Director no encontrado", 404);
  }

  const allowedFields = ["names", "isActive"];
  const payload = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      payload[field] = req.body[field];
    }
  }

  await director.update(payload);
  res.json({ success: true, data: director });
};

const deleteDirector = async (req, res) => {
  const director = await Director.findByPk(req.params.id);
  if (!director) {
    throw new AppError("Director no encontrado", 404);
  }

  const mediaCount = await Media.count({ where: { directorId: director.id } });
  if (mediaCount > 0) {
    throw new AppError("No se puede eliminar: el director tiene media asociada", 409);
  }

  await director.destroy();
  res.status(204).send();
};

module.exports = {
  listDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
};
