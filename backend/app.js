const express = require("express");
const app = express();
const cors = require("cors");
const API_V = "/api/v1/";
const userRoutes = require("./Router/userRoutes");
const cityRoutes = require("./Router/cityRoutes");
const stateRoutes = require("./Router/stateRoutes");
const countryRoutes = require("./Router/countryRoutes");

app.use(express.json());
app.use(cors());
app.use(`${API_V}user`, userRoutes);
app.use(`${API_V}city`, cityRoutes);
app.use(`${API_V}state`, stateRoutes);
app.use(`${API_V}country`, countryRoutes);

app.get("/", (req, res) => {
  res.send("<p>server is live<p>");
});

module.exports = app;
