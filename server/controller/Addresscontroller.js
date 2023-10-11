const Address = require("../model/address");

const address = async (req, res) => {
  try {
    const existingAddress = await Address.findOne(req.body);

    if (existingAddress) {
      return res
        .status(200)
        .json({ address: existingAddress, status: "success" });
    } else {
      let newAddress = await Address.create(req.body);
      return res.status(201).json({ address: newAddress, status: "success" });
    }
  } catch (error) {
    console.error("Error in sending feedback:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getaddress = async (req, res) => {
  // console.log(req)
  try {
    const address = await Address.find(req.body);
    res.send(address);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  address,
  getaddress,
};
