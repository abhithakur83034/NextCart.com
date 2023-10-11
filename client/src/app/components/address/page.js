"use client"
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Card, Button, FormCheck } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "../../style/address.css";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "@/app/footer";

const AddressForm = () => {
  // Step 1: Define state variables
  const [cartdata, setCartdata] = useState([]);
  const [preFill, setPreFill] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const userToken = JSON.parse(localStorage.getItem("token"));
  const [address, setAddress] = useState([]);

  // Step 2: Fetch user's address data using Axios
  useEffect(() => {
    axios
      .get("http://localhost:4500/address/getaddress")
      .then((res) => {
        console.log(res.data);
        const filterAddress = res.data.filter((item) => item.userId === user._id);
        setAddress(filterAddress);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Step 3: Fetch user's cart data using Axios
  useEffect(() => {
    axios
      .get("http://localhost:4500/cart/showcartproduct")
      .then((res) => {
        const filteredCartData = res.data.filter((item) => item.userId === user._id);
        setCartdata(filteredCartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Step 4: Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    addressLine1: Yup.string().required("Required"),
    addressLine2: Yup.string(),
    city: Yup.string().required("Required"),
    postalCode: Yup.string().required("Required"),
  });

  // Step 5: Pre-fill form fields based on the checkbox state
  const userAddress = address.length > 0 && address[0].userId === userId ? address[0] : null;
  const initialValues = {
    firstName: preFill ? (userAddress ? userAddress.firstName : "") : "",
    lastName: preFill ? (userAddress ? userAddress.lastName : "") : "",
    addressLine1: preFill ? (userAddress ? userAddress.addressLine1 : "") : "",
    addressLine2: preFill ? (userAddress ? userAddress.addressLine2 : "") : "",
    city: preFill ? (userAddress ? userAddress.city : "") : "",
    postalCode: preFill ? (userAddress ? userAddress.postalCode : "") : "",
  };

  // Step 6: Define headers for API requests
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + userToken,
  };

  // Step 7: Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    // Extract form values
    const firstName = values.firstName;
    const lastName = values.lastName;
    const addressLine1 = values.addressLine1;
    const addressLine2 = values.addressLine2;
    const city = values.city;
    const postalCode = values.postalCode;

    // Create an object with all form values
    const allValue = {
      userId,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
    };

    try {
      // Send the address data to the server
      const response = await axios.post(
        "http://localhost:4500/address/useraddress",
        allValue
      );

      if (response.data.status === "success") {
        toast.success("Address added successfully");
        resetForm();
        makePayment(); // Step 8: Initiate the payment process
      } else {
        toast.warning("Address added");
      }
    } catch (error) {
      toast.error("Error saving address");
      console.error("Error saving address:", error.response.data);
    }
  };

  // Step 9: Initiate the payment process with Stripe
  const makePayment = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );

    const body = {
      cartdata,
    };

    const response = await fetch("http://localhost:4500/api/create-checkout-session", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();
    localStorage.setItem("session", session.id);

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  // Step 10: Handle checkbox state change
  const handleCheckboxChange = () => {
    setPreFill(!preFill); // Toggle the checkbox state
  };

  // Step 11: Render the component
  return (
    <>
      <Container className="mt-5 mb-5" style={{ minHeight: "500px" }}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Card>
            <Card.Title style={{ textAlign: "center" }}>
              <h1>ADDRESS</h1>
            </Card.Title>
            <Card.Body>
              <Form>
                {/* Step 12: Add the checkbox */}
                <FormCheck
                  type="checkbox"
                  label="Pre-fill form fields"
                  checked={preFill}
                  onChange={handleCheckboxChange}
                />

                {/* Rest of the form fields */}
                <Row>
                  <Col>
                    First Name:
                    <Field
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter First Name"
                    />
                    <p className="coler">
                      <ErrorMessage name="firstName" />
                    </p>
                  </Col>

                  <Col>
                    Last Name:
                    <Field
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter Last Name"
                    />
                    <p className="coler">
                      <ErrorMessage name="lastName" />
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Address Line 1:
                    <Field
                      type="text"
                      name="addressLine1"
                      className="form-control"
                      placeholder="Enter Address Line 1"
                    />
                    <p className="coler">
                      <ErrorMessage name="addressLine1" />
                    </p>
                  </Col>
                  <Col>
                    Address Line 2:
                    <Field
                      type="text"
                      name="addressLine2"
                      className="form-control"
                      placeholder="Enter Address Line 2"
                    />
                    <p className="coler">
                      <ErrorMessage name="addressLine2" />
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    City:
                    <Field
                      type="text"
                      name="city"
                      className="form-control"
                      placeholder="Enter City"
                    />
                    <p className="coler">
                      <ErrorMessage name="city" />
                    </p>{" "}
                  </Col>
                  <Col>
                    Postal Code:
                    <Field
                      type="text"
                      name="postalCode"
                      className="form-control"
                      placeholder="Enter Postal Code"
                    />
                    <p className="coler">
                      <ErrorMessage name="postalCode" />
                    </p>
                  </Col>
                </Row>
                <Button variant="outline-info" type="submit" className="mt-2">
                  Save Address
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Formik>
      </Container>
      <Footer />
    </>
  );
};

export default AddressForm;
