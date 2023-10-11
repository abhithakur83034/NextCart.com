const invoiceModal = require("../model/invoicemodel");

const invoice = async (req, res) => {
  try {
    const Invoice = await invoiceModal.insertMany(req.body);
    return res.status(201).json({ Invoice });
  } catch (error) {
    res.status(500).send("error");
  }
};

module.exports = { invoice };
