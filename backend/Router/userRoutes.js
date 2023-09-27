const express = require("express");
const router = express.Router();
const { registerUser, getAllUser } = require("../controller/userController");

router.post("/register-user", registerUser);
router.get("/get-all-user", getAllUser);

module.exports = router;
