const likemodel = require("../model/like&share");

// const likeApi = async (req, res) => {
//     console.log(req.query)
//   try {
//     const userId = req.query.userId;
//     const item = req.query.item;

//     const existingLike = await likemodel.findOne({ userId, product: item });

//     if (existingLike) {
//         await likemodel.findOneAndRemove({ userId, product: item });
//         res.json({ success: true, message: `Disliked item with ID ${userId}` });
//     } else {
//       const newLike = new likemodel({ userId, product: item });
//       await newLike.save();
//       res.json({ success: true, message: `Liked item with ID ${userId}` });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// module.exports = {
//   likeApi
// };
const likeApi = async (req, res) => {
  console.log(req.query);
  // console.log(req.file);
  try {
    const { userId, itemId, name, price, quality, select, quantity, image } =
      req.query;
    // const image = req.file.filename;

    const existingLike = await likemodel.findOne({ userId, itemId });

    if (existingLike) {
      await likemodel.findOneAndRemove({ userId, itemId });
      res.json({ success: true, message: `Disliked item with ID ${userId}` });
    } else {
      const likeData = {
        userId,
        itemId,
        name,
        price,
        quality,
        select,
        quantity,
        image,
      };

      // console.log(likeData);

      const like = new likemodel(likeData);
      const result = await like.save();

      const responseData = {
        message: `Liked item with ID ${itemId}`,
        status: "success",
      };

      res.status(201).json(responseData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const showlikeProduct = async (req, res) => {
  try {
    const like = await likemodel.find(req.body);
    res.status(201).send(like);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  likeApi,
  showlikeProduct,
};
