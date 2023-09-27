const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "a user's should have a first name!"],
      minlength: [3, "first name should have a minimum of 5 characters!"],
      maxlength: [12, "first name should have a maximum of 12 characters!"],
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "a user's should have a last name!"],
      minlength: [3, "last name should have a minimum of 5 characters!"],
      maxlength: [12, "last name should have a maximum of 12 characters!"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "a user's should have an email!"],
      unique: [true, "a user's should have a unique email!"],
      lowercase: true,
      trim: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "state",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "city",
    },
    gender: {
      type: String,
      required: [true, "a user's should provide a gender!"],
      enum: ["male", "female", "other"],
      lowercase: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: [true, "a user's should provide a date of birth!"],
    },
    age: {
      type: Number,
      required: [true, "a user's should provide an age!"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
