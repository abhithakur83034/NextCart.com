const contactModal = require("../model/contactmodal");

const contact = async (req, res) => {
  // console.log(req.body)
  try {
    const contact = await contactModal.insertMany(req.body);
    res.status(200).json({ contact });
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const showcontact = async (req, res) => {
  try {
    const contact = await contactModal.find(req.body);
    res.status(200).json({ contact });
  } catch (error) {
    res.status(500).send("internal server error", error);
  }
};

module.exports = {
  contact,
  showcontact,
};
