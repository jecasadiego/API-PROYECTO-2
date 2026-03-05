const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      success: false,
      message: "Ya existe un registro con ese valor unico",
      details: err.errors.map((item) => item.message),
    });
  }

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      message: "Error de validacion",
      details: err.errors.map((item) => item.message),
    });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      success: false,
      message: "Error de llave foranea en la relacion",
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
};

module.exports = errorHandler;
