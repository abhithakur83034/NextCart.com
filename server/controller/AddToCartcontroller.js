const addtocartmodel = require("../model/addtocartmodal");

const addToCart = async (req, res) => {
  console.log(req.body);
  try {
    const { userId, itemId, name, price, quality, select, quantity, image } =
      req.body;
    // const image = req.file.filename;

    const existingItem = await addtocartmodel.findOne({ userId, itemId });
    // console.log("fdf",existingItem)
    if (existingItem) {
      const responseData = {
        message: "Product already in cart",
        status: "warning",
      };

      res.status(201).json(responseData);
    } else {
      const cartData = {
        userId,
        itemId,
        name,
        price,
        quality,
        select,
        quantity,
        image,
      };

      // console.log("cartData",cartData);

      const cart = new addtocartmodel(cartData);
      await cart.save();

      const responseData = {
        message: "Product added to cart",
        status: "success",
      };

      res.status(201).json(responseData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const showProduct = async (req, res) => {
  try {
    const cart = await addtocartmodel.find(req.body);
    res.status(201).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const cart = await addtocartmodel.deleteOne({ _id: req.params.id });
    res.status(201).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addToCart,
  showProduct,
  deleteProduct,
};
