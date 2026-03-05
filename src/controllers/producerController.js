const { Producer, Media } = require("../models");
const AppError = require("../utils/AppError");

const listProducers = async (req, res) => {
  const where = {};
  if (req.query.isActive !== undefined) {
    where.isActive = req.query.isActive === "true";
  }

  const producers = await Producer.findAll({
    where,
    order: [["name", "ASC"]],
  });

  res.json({ success: true, data: producers });
};

const getProducerById = async (req, res) => {
  const producer = await Producer.findByPk(req.params.id);
  if (!producer) {
    throw new AppError("Productora no encontrada", 404);
  }

  res.json({ success: true, data: producer });
};

const createProducer = async (req, res) => {
  const { name, isActive = true, slogan = null, description = null } = req.body;
  if (!name) {
    throw new AppError("name es obligatorio", 400);
  }

  const producer = await Producer.create({
    name,
    isActive,
    slogan,
    description,
  });
  res.status(201).json({ success: true, data: producer });
};

const updateProducer = async (req, res) => {
  const producer = await Producer.findByPk(req.params.id);
  if (!producer) {
    throw new AppError("Productora no encontrada", 404);
  }

  const allowedFields = ["name", "isActive", "slogan", "description"];
  const payload = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      payload[field] = req.body[field];
    }
  }

  await producer.update(payload);
  res.json({ success: true, data: producer });
};

const deleteProducer = async (req, res) => {
  const producer = await Producer.findByPk(req.params.id);
  if (!producer) {
    throw new AppError("Productora no encontrada", 404);
  }

  const mediaCount = await Media.count({ where: { producerId: producer.id } });
  if (mediaCount > 0) {
    throw new AppError("No se puede eliminar: la productora tiene media asociada", 409);
  }

  await producer.destroy();
  res.status(204).send();
};

module.exports = {
  listProducers,
  getProducerById,
  createProducer,
  updateProducer,
  deleteProducer,
};
