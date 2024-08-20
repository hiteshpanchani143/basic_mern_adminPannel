const Service = require("../models/serviceModel");

const getServices = async (req, res) => {
  try {
    const response = await Service.find();
    console.log(response);
    if (!response) {
      return res.status(404).json({ message: "No Service found" });
    }
    res.status(200).json({ message: response });
  } catch (error) {
    console.log(`error in get services: ${error}`);
  }
};

module.exports = { getServices };
