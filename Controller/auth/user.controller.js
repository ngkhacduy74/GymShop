const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const User = require("../../Model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.createUser = async (data) => {
  const { fullname, username, email, phone, address, password, gender } = data;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("KAHSDkajsd", data);
    const createUser = new User({
      id: uuidv1(),
      fullname: fullname,
      phone: phone,
      address: address,
      username: username,
      password: hashedPassword,
      gender: gender,
      role: "User",
      email: email,
    });
    await createUser.save();
  } catch (err) {
    console.error("This err was threw in createUser func");
  }
};
