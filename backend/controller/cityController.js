const CityDB = require("../model/cityModel");

exports.createCity = async (req, res) => {
  const { name, state } = req.body;
  const addCityData = await CityDB.create({ name, state });

  if (!addCityData) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      data: {},
    });
  }

  res.status(200).json({
    success: true,
    message: "city data added successfuly",
    data: addCityData,
  });
};

exports.getAllCity = async (req, res) => {
  const stateId = req.query.id;
  const cityAllData = await CityDB.find({ state: stateId });

  if (!cityAllData.length) {
    return res.status(404).json({
      success: false,
      message: "no data found",
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    message: "data fetched successfuly",
    data: cityAllData,
  });
};
