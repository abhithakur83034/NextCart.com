"use client";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "@/app/footer";
import "../../style/login.css";

const AddProduct = () => {
  const schema = yup.object().shape({
    image: yup.mixed().required("A file is required"),
    name: yup.string().required(),
    price: yup
      .number()
      .required()
      .min(5, "minimum price is 5")
      .max(100000, "maximum price is 10"),
    strike: yup
      .number()
      .required()
      .min(5, "minimum price is 5")
      .max(10000000000, "maximum price can't be more than actual price"),
    quality: yup.string().required(),
    role: yup.string().required("Please select a role"),
    subcategory: yup.string().required("Please select a subcategory"),
    size: yup
      .string()
      .required(),
    color: yup
      .string()
      .required(),
    about: yup
      .string()
      .required()
      .min(5, "minimum about is 5")
      .max(90, "maximum aout is 90"),
    brand: yup.string().required("Brand is required"),
  });

  const initialValues = {
    image: null,
    name: "",
    price: "",
    strike: "",
    quality: "",
    role: "",
    subcategory: "",
    size:"",
    color:"",
    about:"",
    brand: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    console.log(values);
    const allSizes = values.size.split(",")
    try {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("strike", values.strike);
      formData.append("quality", values.quality);
      formData.append("role", values.role);
      formData.append("subcategory", values.subcategory);
      formData.append("size", allSizes);
      formData.append("color", values.color);
      formData.append("about", values.about);
      formData.append("brand", values.brand);

      const response = await axios.post(
        "http://localhost:4500/product/addproduct",
        formData
      );
      console.log(response.data);
      resetForm({});
      toast.success("Product added");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error);
    }
  };

  return (
    <div>
      <Container fluid className="bg-img">
        <Row>
          <Col sm={2}></Col>
          <Col>
            <Formik
              validationSchema={schema}
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              {({ handleSubmit, setFieldValue}) => (
                <Card style={{ margin: "50px" }}>
                  <i>
                    <Card.Title
                      style={{
                        textAlign: "center",
                        fontSize: "40px",
                        color: "royalblue",
                      }}
                    >
                      Add Product!
                    </Card.Title>
                  </i>
                  <Card.Body>
                    <Form encType="multipart/form-data" onSubmit={handleSubmit}>
                      <Row>
                        <Col>
                          <i className="bi bi-name"></i>
                          <p>
                            <input
                              type="file"
                              name="image"
                              accept="image/*"
                              className="form-control"
                              onChange={(event) => {
                                setFieldValue(
                                  "image",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                          </p>
                          <p className="invalid">
                            <ErrorMessage name="image" />
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <Field
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Product name"
                            />
                          </p>
                          <p className="invalid">
                            <ErrorMessage name="name" />
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            <Field
                              type="number"
                              name="price"
                              className="form-control"
                              placeholder="Product price"
                            />
                          </p>
                          <p className="invalid">
                            <ErrorMessage name="price" />
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <Field
                              type="number"
                              name="strike"
                              className="form-control"
                              placeholder="Product strike amount"
                            />
                          </p>
                          <p className="invalid">
                            <ErrorMessage name="strike" />
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            <Field
                              type="text"
                              name="quality"
                              className="form-control"
                              placeholder="Product quality"
                            />
                          </p>
                          <p className="invalid">
                            <ErrorMessage name="quality" />
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            <Field
                              type="text"
                              name="role"
                              className="form-control"
                              placeholder="Product Category"
                            />
                          </p>
                          <p className="invalid">
                            <ErrorMessage name="role" />
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <Field
                              type="text"
                              name="subcategory"
                              className="form-control"
                              placeholder="Product Subcategory"
                            />
                          </p>
                          <p className="invalid">
                            <ErrorMessage name="subcategory" />
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            <Field
                              type="text"
                              name="size"
                              className="form-control"
                              placeholder="Product size (comma-separated)"
                            />
                          </p>
                          <p className="invalid">
                            <ErrorMessage name="size" />
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <Field
                              type="text"
                              name="color"
                              className="form-control"
                              placeholder="Product color"
                            />
                          </p>
                          <p className="invalid">
                            <ErrorMessage name="color" />
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            <Field
                              type="text"
                              name="about"
                              className="form-control"
                              placeholder="About Product"
                            />
                          </p>
                          <p className="invalid">
                            <ErrorMessage name="about" />
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <Field
                              type="text"
                              name="brand"
                              className="form-control"
                              placeholder="Product brand"
                            />
                          </p>
                          <p className="invalid">
                            <ErrorMessage name="brand" />
                          </p>
                        </Col>
                      </Row>
                      <p>
                        <button
                          type="submit"
                          className="btn btn-dark form-control"
                        >
                          Add Product
                        </button>
                      </p>
                    </Form>
                  </Card.Body>
                </Card>
              )}
            </Formik>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default AddProduct;
