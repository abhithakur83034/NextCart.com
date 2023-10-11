const usermodel = require("../model/usermodel");
const cartModal = require("../model/addtocartmodal");
const stripemodal = require("../model/stripe");
const invoicemodal = require("../model/invoicemodel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const middleware = require("../middleware/middleware");
const nodemailer = require("nodemailer");
const moment = require("moment");

const checkout = async (req, res) => {
  const user = req.user;
  // console.log("user", user._id);
  // console.log("stripe", req.body);
  const products = req.body.cartdata;
  const lineItem = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
        // images:[product.image]
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));
  let customerId = user.customer_id;
  if (customerId == null) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
    });
    customerId = customer.id;
    await usermodel.updateOne(
      { _id: user._id },
      { $set: { customer_id: customer.id } }
    );
  }

  const session = await stripe.checkout.sessions.create({
    invoice_creation: {
      enabled: true,
    },
    payment_method_types: ["card"],
    line_items: lineItem,
    mode: "payment",
    customer: customerId,
    success_url: "http://localhost:3000/components/success",
    cancel_url: "http://localhost:3000/components/cancel",
  });
  res.json({ id: session.id });
};

const invoice = async (req, res) => {
  try {
    const sessionId = req.query.sessionId;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const invoice = await stripe.invoices.retrieve(session.invoice);
    // console.log("invoice", invoice);

    const paymentIntent = await stripe.paymentIntents.retrieve(
      invoice.payment_intent
    );
    const paymentMethod = await stripe.paymentMethods.retrieve(
      paymentIntent.payment_method
    );
    // console.log("sess", paymentMethod);
    // console.log(req.user)

    const allinvoice = new invoicemodal({
      user_id: req.user._id,
      payment_method_id: paymentMethod.id,
      invoice_id: invoice.id,
      amount: invoice.amount_paid / 100,
      cus_id: invoice.customer,
      cus_email: invoice.customer_email,
      cus_name: invoice.customer_name,
      card_holder_name: paymentMethod.billing_details.name,
      invoice_pdf: invoice.invoice_pdf,
      invoice_number: invoice.number,
      cardlast: paymentMethod.card.last4,
      created_at: moment.unix(invoice.created).format("MMM DD YYYY"),
    });
    await allinvoice.save(allinvoice);

    //clear cart after successful payment=====================================================================
    const userId = req.user._id;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if needed
    const formattedDate = `${day}/${month}/${year}`;
    
    const deletedProducts = await cartModal.find({ userId });
    
    // Add 'formattedDate' to each product before insertion
    const productsToInsert = deletedProducts.map((product) => ({
      ...product.toObject(),
      date: formattedDate,
    }));
    
    await stripemodal.insertMany(productsToInsert);
    ;

    await cartModal.deleteMany({ userId, _id: { $in: deletedProducts.map(product => product._id) } });

    res.status(201).send("Payment successful");


    //send email to download invoice=============================================================================
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_SMTP,
        pass: process.env.PASSWORD_SMTP,
      },
    });

    try {
      const mailOptions = {
        from: process.env.EMAIL_SMTP,
        to: req.user.email,
        subject: "Sending Email For invoice",
        html: `<p>Hii, please click here to <a href="${invoice.hosted_invoice_url}">Invoice</a> download</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent Succsfully" });
        }
      });
      // }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

const transaction = async (req, res) => {
    try {
      const transaction = await invoicemodal.find(req.body);
      return res.status(200).json({ transaction });
    } catch (error) {
      console.log(error);
    }
  }


  const soldproduct=async(req,res)=>{
    try {
        const sold = await stripemodal.find(req.body)
        return res.status(200).json({sold})
    } catch (error) {
        console.log(error)
    }
  }


module.exports = { checkout, invoice,transaction,soldproduct };
