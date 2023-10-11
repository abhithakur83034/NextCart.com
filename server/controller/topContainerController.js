const topcontainerModel = require("../model/topcontainer");

const topContainer = async (req, res) => {
  // console.log(req.query)
  // console.log(req.body.role)
  // console.log(req.file.filename)
  try {
    const role = req.body.role;
    const image = req.file.filename;
    const containerdata = { role, image };
    // console.log(containerdata,"uygh");
    const top = new topcontainerModel(containerdata);
    const result = await top.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const showContainer = async (req, res) => {
  try {
    const showcontainer = await topcontainerModel.find(req.body);
    res.status(201).send(showcontainer);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  topContainer,
  showContainer,
};
