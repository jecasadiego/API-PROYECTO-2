const { Op } = require("sequelize");
const { Media, Genre, Director, Producer, Type } = require("../models");
const AppError = require("../utils/AppError");

const mediaInclude = [
  { model: Genre, as: "genre", attributes: ["id", "name", "isActive"] },
  { model: Director, as: "director", attributes: ["id", "names", "isActive"] },
  { model: Producer, as: "producer", attributes: ["id", "name", "isActive"] },
  { model: Type, as: "type", attributes: ["id", "name"] },
];

const pickMediaPayload = (body) => {
  const allowedFields = [
    "serial",
    "title",
    "synopsis",
    "url",
    "coverImage",
    "releaseYear",
    "genreId",
    "directorId",
    "producerId",
    "typeId",
  ];

  const payload = {};
  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  }
  return payload;
};

const validateMediaRelations = async ({
  genreId,
  directorId,
  producerId,
  typeId,
}) => {
  if (genreId !== undefined) {
    const genre = await Genre.findByPk(genreId);
    if (!genre) {
      throw new AppError("El genero seleccionado no existe", 400);
    }
    if (!genre.isActive) {
      throw new AppError("El genero seleccionado esta inactivo", 400);
    }
  }

  if (directorId !== undefined) {
    const director = await Director.findByPk(directorId);
    if (!director) {
      throw new AppError("El director seleccionado no existe", 400);
    }
    if (!director.isActive) {
      throw new AppError("El director seleccionado esta inactivo", 400);
    }
  }

  if (producerId !== undefined) {
    const producer = await Producer.findByPk(producerId);
    if (!producer) {
      throw new AppError("La productora seleccionada no existe", 400);
    }
    if (!producer.isActive) {
      throw new AppError("La productora seleccionada esta inactiva", 400);
    }
  }

  if (typeId !== undefined) {
    const type = await Type.findByPk(typeId);
    if (!type) {
      throw new AppError("El tipo seleccionado no existe", 400);
    }
  }
};

const listMedia = async (req, res) => {
  const where = {};
  const { title, genreId, directorId, producerId, typeId, releaseYear } = req.query;

  if (title) {
    where.title = { [Op.like]: `%${title}%` };
  }
  if (genreId) where.genreId = genreId;
  if (directorId) where.directorId = directorId;
  if (producerId) where.producerId = producerId;
  if (typeId) where.typeId = typeId;
  if (releaseYear) where.releaseYear = releaseYear;

  const mediaItems = await Media.findAll({
    where,
    include: mediaInclude,
    order: [["createdAt", "DESC"]],
  });

  res.json({ success: true, data: mediaItems });
};

const getMediaById = async (req, res) => {
  const media = await Media.findByPk(req.params.id, {
    include: mediaInclude,
  });
  if (!media) {
    throw new AppError("Media no encontrada", 404);
  }

  res.json({ success: true, data: media });
};

const createMedia = async (req, res) => {
  const payload = pickMediaPayload(req.body);

  const requiredFields = [
    "serial",
    "title",
    "synopsis",
    "url",
    "coverImage",
    "releaseYear",
    "genreId",
    "directorId",
    "producerId",
    "typeId",
  ];

  for (const field of requiredFields) {
    if (payload[field] === undefined || payload[field] === null || payload[field] === "") {
      throw new AppError(`El campo ${field} es obligatorio`, 400);
    }
  }

  await validateMediaRelations(payload);

  const media = await Media.create(payload);
  const mediaWithRelations = await Media.findByPk(media.id, { include: mediaInclude });

  res.status(201).json({ success: true, data: mediaWithRelations });
};

const updateMedia = async (req, res) => {
  const media = await Media.findByPk(req.params.id);
  if (!media) {
    throw new AppError("Media no encontrada", 404);
  }

  const payload = pickMediaPayload(req.body);
  if (Object.keys(payload).length === 0) {
    throw new AppError("No hay campos para actualizar", 400);
  }

  await validateMediaRelations(payload);
  await media.update(payload);

  const mediaWithRelations = await Media.findByPk(media.id, { include: mediaInclude });
  res.json({ success: true, data: mediaWithRelations });
};

const deleteMedia = async (req, res) => {
  const media = await Media.findByPk(req.params.id);
  if (!media) {
    throw new AppError("Media no encontrada", 404);
  }

  await media.destroy();
  res.status(204).send();
};

module.exports = {
  listMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
};
