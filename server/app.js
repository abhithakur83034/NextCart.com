require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/img", express.static("./uploads"));

const userRoute = require("./route/userRoute");
const adminRoute = require("./route/adminroute");
const productRoute = require("./route/productRoute");
const contactRoute = require("./route/contactRouter");
const feedbackRoute = require("./route/fedbackRoute");
const addressRouter = require("./route/addressRouter");
const addtocartRouter = require("./route/addtocartRouter");
const profileRouter = require("./route/profileRouter");
const likeshareRouter = require("./route/likeshareRouter");
const topcontainierRouter = require("./route/topcontainerRoute");
const stripeRouter = require("./route/stripe")

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/product", productRoute);
app.use("/api",contactRoute)
app.use("/fb", feedbackRoute);
app.use("/address", addressRouter);
app.use("/cart", addtocartRouter);
app.use("/profile", profileRouter);
app.use("/like", likeshareRouter);
app.use("/topcontainer", topcontainierRouter);
app.use("/api",stripeRouter)



module.exports = app;
