const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const {
  listMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
} = require("../controllers/mediaController");

const router = express.Router();

router.get("/", asyncHandler(listMedia));
router.get("/:id", asyncHandler(getMediaById));
router.post("/", asyncHandler(createMedia));
router.put("/:id", asyncHandler(updateMedia));
router.delete("/:id", asyncHandler(deleteMedia));

module.exports = router;
