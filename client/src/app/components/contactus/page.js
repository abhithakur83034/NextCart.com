"use client";
import React from "react";
import "../../style/contactus.css";
import Footer from "@/app/footer";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";


const Page = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    subject: Yup.string().required("Required"),
    message: Yup.string(),
  });

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const handleSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:4500/api/contact",data)
      .then((res) => {
        console.log(res.data);
        toast.success("contact has been added");
      })
      .catch((error) => {
        console.log(error);
        toast.error("unable to add contact");
      });
  };
  return (
    <>
      <Container>
        <Card.Title style={{ textAlign: "center" }}>
          <h1>Contact Us</h1>
        </Card.Title>
        <Row>
          <Col>
            <Row>
              <Col lg={6}>
                <Card>
                  <i className="bi bi-geo-alt"></i>
                  <h3>Address</h3>
                  <p>
                    A108 Adam Street,
                    <br />
                    New York, NY 535022
                  </p>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <i className="bi bi-telephone"></i>
                  <h3>Call Us</h3>
                  <p>
                    +1 5589 55488 55
                    <br />
                    +1 6678 254445 41
                  </p>
                </Card>
                </Col>
                </Row>
                <Row className="mt-5">
              <Col lg={6}>
                <Card>
                  <i className="bi bi-envelope"></i>
                  <h3>Email Us</h3>
                  <p>
                    <Link href="#">
                      nextcart.com
                      <br />
                      nextcart.com
                    </Link>
                  </p>
                </Card>
                </Col>
              <Col lg={6}>
                <Card>
                  <i className="bi bi-clock"></i>
                  <h3>Open Hours</h3>
                  <p>
                    Monday - Friday
                    <br />
                    9:00AM - 05:00PM
                  </p>
                </Card>
                </Col>
            </Row>
          </Col>
          <Col>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Card>
                <Card.Body>
                  <Form>
                    <div className="row gy-4">
                      <div className="col-md-6">
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Your Name"
                        />
                        <p>
                          <ErrorMessage name="name" />
                        </p>
                      </div>
                      <div className="col-md-6 ">
                        <Field
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Your Email"
                        />
                        <p>
                          <ErrorMessage name="email" />
                        </p>
                      </div>
                      <div className="col-md-12">
                        <Field
                          type="text"
                          className="form-control"
                          name="subject"
                          placeholder="Subject"
                        />
                        <p>
                          <ErrorMessage name="subject" />
                        </p>
                      </div>
                      <div className="col-md-12">
                        <Field
                          type="text"
                          className="form-control"
                          name="message"
                          rows="6"
                          placeholder="Message"
                        />
                        <p>      
                          <ErrorMessage name="message" />
                        </p>
                      </div>
                      <div className="col-md-12 text-center">
                        <button type="submit" className="btn btn-info">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Formik>
          </Col>
        </Row>
      </Container>

     <Footer/>
    </>
  );
};

export default Page;
