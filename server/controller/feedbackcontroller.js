const feedbacks = require("../model/feedbackmodel");

const usersfeedback = async (req, res) => {
  // console.log(req.body)
  try {
    let userfeedback = await feedbacks.insertMany(req.body);

    // Send a success response
    return res.status(201).json({ userfeedback });
  } catch (error) {
    console.error("Error in sending  feedback:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const showfedback = async (req, res) => {
  try {
    const show = await feedbacks.find(req.body);
    res.status(201).send(show);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  usersfeedback,
  showfedback,
};
