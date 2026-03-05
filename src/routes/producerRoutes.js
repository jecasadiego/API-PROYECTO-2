const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const {
  listProducers,
  getProducerById,
  createProducer,
  updateProducer,
  deleteProducer,
} = require("../controllers/producerController");

const router = express.Router();

router.get("/", asyncHandler(listProducers));
router.get("/:id", asyncHandler(getProducerById));
router.post("/", asyncHandler(createProducer));
router.put("/:id", asyncHandler(updateProducer));
router.delete("/:id", asyncHandler(deleteProducer));

module.exports = router;
