const CountryDB = require("../model/countryModel");

exports.createCountry = async (req, res) => {
  const { name } = req.body;
  const addCountryData = await CountryDB.create({ name });

  if (!addCountryData) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      data: {},
    });
  }

  res.status(200).json({
    success: true,
    message: "country data added successfuly",
    data: addCountryData,
  });
};

exports.getAllCountry = async (req, res) => {
  const countryAllData = await CountryDB.find();

  if (!countryAllData.length) {
    return res.status(404).json({
      success: false,
      message: "no data found",
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    message: "data fetched successfuly",
    data: countryAllData,
  });
};
