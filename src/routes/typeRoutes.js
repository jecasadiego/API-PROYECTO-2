const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const {
  listTypes,
  getTypeById,
  createType,
  updateType,
  deleteType,
} = require("../controllers/typeController");

const router = express.Router();

router.get("/", asyncHandler(listTypes));
router.get("/:id", asyncHandler(getTypeById));
router.post("/", asyncHandler(createType));
router.put("/:id", asyncHandler(updateType));
router.delete("/:id", asyncHandler(deleteType));

module.exports = router;
