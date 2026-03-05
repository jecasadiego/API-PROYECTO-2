const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const {
  listGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genreController");

const router = express.Router();

router.get("/", asyncHandler(listGenres));
router.get("/:id", asyncHandler(getGenreById));
router.post("/", asyncHandler(createGenre));
router.put("/:id", asyncHandler(updateGenre));
router.delete("/:id", asyncHandler(deleteGenre));

module.exports = router;
