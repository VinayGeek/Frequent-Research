const express = require("express");
const router = express.Router();
const { createState, getAllState } = require("../controller/stateController");

router.post("/add-state", createState);
router.get("/get-all-state", getAllState);

module.exports = router;
