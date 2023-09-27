const UserDB = require("../model/userModel");

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, country, state, city, gender, age, dob } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !country ||
    !state ||
    !city ||
    !gender ||
    !age ||
    !dob
  ) {
    return res.status(400).json({
      success: false,
      message: "add all required feilds",
      data: {},
    });
  }

  const existingUser = await UserDB.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email already exists",
      data: {},
    });
  }

  const userData = await UserDB.create({
    firstName,
    lastName,
    email,
    country,
    state,
    city,
    gender,
    age,
    dob,
  });

  if (!userData) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      data: {},
    });
  }

  res.status(201).json({
    success: true,
    message: "user created successfuly",
    data: userData,
  });
};

exports.getAllUser = async (req, res) => {
  const userData = await UserDB.find({ isDeleted: false })
    .populate({ path: "country", select: "name" })
    .populate({ path: "state", select: "name" })
    .populate({ path: "city", select: "name" });

  if (!userData.length) {
    return res.status(404).json({
      success: true,
      message: "no data found",
      data: [],
    });
  }

  res.status(200).json({
    status: "success",
    message: "data fetched successfully",
    data: userData,
  });
};
