const StateDB = require("../model/stateModel");

exports.createState = async (req, res) => {
  const { name, country } = req.body;
  const addStateData = await StateDB.create({ name, country });

  if (!addStateData) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      data: {},
    });
  }

  res.status(200).json({
    success: true,
    message: "state data added successfuly",
    data: addStateData,
  });
};

exports.getAllState = async (req, res) => {
  const countryId = req.query.id;
  const stateAllData = await StateDB.find({ country: countryId });

  if (!stateAllData.length) {
    return res.status(404).json({
      success: false,
      message: "no data found",
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    message: "data fetched successfuly",
    data: stateAllData,
  });
};
