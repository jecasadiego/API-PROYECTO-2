const { Type, Media } = require("../models");
const AppError = require("../utils/AppError");

const listTypes = async (req, res) => {
  const types = await Type.findAll({
    order: [["name", "ASC"]],
  });

  res.json({ success: true, data: types });
};

const getTypeById = async (req, res) => {
  const type = await Type.findByPk(req.params.id);
  if (!type) {
    throw new AppError("Tipo no encontrado", 404);
  }

  res.json({ success: true, data: type });
};

const createType = async (req, res) => {
  const { name, description = null } = req.body;
  if (!name) {
    throw new AppError("name es obligatorio", 400);
  }

  const type = await Type.create({ name, description });
  res.status(201).json({ success: true, data: type });
};

const updateType = async (req, res) => {
  const type = await Type.findByPk(req.params.id);
  if (!type) {
    throw new AppError("Tipo no encontrado", 404);
  }

  const allowedFields = ["name", "description"];
  const payload = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      payload[field] = req.body[field];
    }
  }

  await type.update(payload);
  res.json({ success: true, data: type });
};

const deleteType = async (req, res) => {
  const type = await Type.findByPk(req.params.id);
  if (!type) {
    throw new AppError("Tipo no encontrado", 404);
  }

  const mediaCount = await Media.count({ where: { typeId: type.id } });
  if (mediaCount > 0) {
    throw new AppError("No se puede eliminar: el tipo tiene media asociada", 409);
  }

  await type.destroy();
  res.status(204).send();
};

module.exports = {
  listTypes,
  getTypeById,
  createType,
  updateType,
  deleteType,
};
