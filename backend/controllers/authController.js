const home = async (req, res) => {
  try {
    res.status(200).send("welcome to Home page");
  } catch (error) {
    console.log(error.message);
  }
};

const register = async (req, res) => {
  try {
    res.status(200).send("hello register");
  } catch (error) {
    res.status(400).send({ msg: "error whene register", error: error.message });
  }
};

module.exports = { home, register };
