const express = require("express");
const router = express.Router();
const { createCity, getAllCity } = require("../controller/cityController");

router.post("/add-city", createCity);
router.get("/get-all-city", getAllCity);

module.exports = router;
