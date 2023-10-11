const productmodel = require("../model/productmodel");

const addProduct = async (req, res) => {
  // console.log("req.file:", req.file);
  console.log("req.body:", req.body);
  try {
    const image = req.file.filename;
    const {
      name,
      price,
      strike,
      quality,
      role,
      quantity,
      subcategory,
      size,
      color,
      brand,
      about,
    } = req.body;

    const productData = {
      image,
      name,
      price,
      strike,
      quality,
      role,
      quantity,
      subcategory,
      size,
      color,
      brand,
      about,
    };

    const product = await productmodel.insertMany(productData);
    // const result = await product.save();

    res.status(201).json({product});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const showProduct = async (req, res) => {
  try {
    const product = await productmodel.find(req.body);
    res.status(201).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const findForUpdateProduct = async (req, res) => {
  try {
    const product = await productmodel.findOne({ _id: req.params.id });
    res.status(201).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const UpdateProduct = async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  try {
    // Find the product by their unique identifier (e.g., user ID)
    const productId = req.params.id;
    // console.log(productId)

    const updateFields = {};

    if (req.file && req.file.filename !== undefined) {
      updateFields.image = req.file.filename;
    }

    if (req.body.name !== undefined) {
      updateFields.name = req.body.name;
    }

    if (req.body.price !== undefined) {
      updateFields.price = req.body.price;
    }

    if (req.body.strike !== undefined) {
      updateFields.strike = req.body.strike;
    }

    if (req.body.quality !== undefined) {
      updateFields.quality = req.body.quality;
    }

    if (req.body.role !== undefined) {
      updateFields.role = req.body.role;
    }

    if (req.body.subcategory !== undefined) {
      updateFields.subcategory = req.body.subcategory;
    }

    if (req.body.size !== undefined) {
      updateFields.size = req.body.size;
    }

    if (req.body.color !== undefined) {
      updateFields.color = req.body.color;
    }

    if (req.body.about !== undefined) {
      updateFields.about = req.body.about;
    }

    if (req.body.brand !== undefined) {
      updateFields.brand = req.body.brand;
    }

    const updatedProduct = await productmodel.findByIdAndUpdate(
      productId,
      {
        $set: updateFields,
      },
      {
        new: true, // Return the updated product data
        runValidators: true, // Apply model's validation rules to the update
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productmodel.deleteOne({ _id: req.params.id });
    res.status(201).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addProduct,
  showProduct,
  findForUpdateProduct,
  UpdateProduct,
  deleteProduct,
};
