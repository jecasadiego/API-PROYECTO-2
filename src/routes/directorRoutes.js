const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const {
  listDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
} = require("../controllers/directorController");

const router = express.Router();

router.get("/", asyncHandler(listDirectors));
router.get("/:id", asyncHandler(getDirectorById));
router.post("/", asyncHandler(createDirector));
router.put("/:id", asyncHandler(updateDirector));
router.delete("/:id", asyncHandler(deleteDirector));

module.exports = router;
