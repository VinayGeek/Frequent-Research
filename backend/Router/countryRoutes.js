const express = require("express");
const router = express.Router();
const {
  createCountry,
  getAllCountry,
} = require("../controller/countryController");

router.post("/add-country", createCountry);
router.get("/get-all-country", getAllCountry);

module.exports = router;
