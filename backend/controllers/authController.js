const home = async (req, res) => {
  try {
    res.status(200).send({ msg: "welcome to home page" });
  } catch (error) {
    console.log({ msg: "error in home page", error: error.message });
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).send({ msg: "welcome to register page", data: req.body });
  } catch (error) {
    res.status(400).send({ msg: "error in register", error: error.message });
  }
};

module.exports = { home, register };
