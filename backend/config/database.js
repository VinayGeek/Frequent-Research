const mongoose = require("mongoose");

const mongoOpt = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_DB_URI, mongoOpt)
    .then((res) => console.log("✅ Database Connected"))
    .catch((err) => {
      console.log("Database Connection Error! >>", err.message);
    });
};

module.exports = connectDB;
