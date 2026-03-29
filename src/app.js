const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const apiRoutes = require("./routes");
const AppError = require("./utils/AppError");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowAllOrigins = allowedOrigins.includes("*");

const corsOptions = allowedOrigins.length && !allowAllOrigins
  ? {
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new AppError(`Origen no permitido por CORS: ${origin}`, 403));
      },
    }
  : undefined;

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", apiRoutes);

app.use((req, res, next) => {
  next(new AppError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404));
});

app.use(errorHandler);

module.exports = app;
