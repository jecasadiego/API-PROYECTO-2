const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

const rawStoragePath = process.env.SQLITE_STORAGE_PATH?.trim();
const storagePath = rawStoragePath
  ? path.isAbsolute(rawStoragePath)
    ? rawStoragePath
    : path.resolve(process.cwd(), rawStoragePath)
  : path.join(__dirname, "../../data/database.sqlite");

fs.mkdirSync(path.dirname(storagePath), { recursive: true });

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: storagePath,
  logging: false,
});

module.exports = sequelize;
