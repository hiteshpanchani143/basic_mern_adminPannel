const User = require("../models/userModel");
const Service = require("../models/serviceModel");
const Contact = require("../models/contactModel");

// for user
const getAllUser = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User Not Found." });
    }

    return res.status(200).json({ message: "User found successfully.", user });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const singleUser = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(singleUser);
  } catch (error) {
    next(error);
  }
};
const getUserAndUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body
    console.log(id)
    console.log(updateData)
    const updatedData = await User.findOneAndUpdate({ _id: id }, {
      $set: updateData
    },{
      new:true
    });
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: "User Delete Successfully." });
  } catch (error) {
    next(error);
  }
};
// for services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    if (!services || services.length === 0) {
      return res.status(404).json({ message: "Services Not Found." });
    }

    return res
      .status(200)
      .json({ message: "Services found successfully.", services });
  } catch (error) {
    next(error);
  }
};

//   for contact
const getAllContact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "Contacts Not Found." });
    }

    return res
      .status(200)
      .json({ message: "Contacts found successfully.", contacts });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUser,
  getSingleUser,
  getUserAndUpdate,
  deleteUser,
  getAllServices,
  getAllContact,
};
