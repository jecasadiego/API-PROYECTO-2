const express = require("express");
const { healthCheck } = require("../controllers/healthController");
const genreRoutes = require("./genreRoutes");
const directorRoutes = require("./directorRoutes");
const producerRoutes = require("./producerRoutes");
const typeRoutes = require("./typeRoutes");
const mediaRoutes = require("./mediaRoutes");

const router = express.Router();

router.get("/health", healthCheck);
router.use("/genres", genreRoutes);
router.use("/directors", directorRoutes);
router.use("/producers", producerRoutes);
router.use("/types", typeRoutes);
router.use("/media", mediaRoutes);

module.exports = router;
