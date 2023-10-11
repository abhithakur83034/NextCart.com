"use client";
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "../../style/errshow.css";
import "../../style/login.css";
import { useRouter } from "next/navigation";
import Footer from "@/app/footer";

// import { useRouter } from "next/router";
let em = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|apple\.com)$/i;

const schema = yup.object().shape({
  email: yup.string().required("email is required").matches(em, {
    message: "only accept gmail.com & yahoo.com & apple.com",
    excludeEmptyString: false,
  })
});

export default function Forgot() {
  const router = useRouter();



  const validationSchema = schema;

  const initialValues = {
    email: "",
  };

  const onSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:4500/user/resetoldpassword", values)
      .then((res) => {
        console.log(res.data.message)
        toast.success(res.data.message);
        resetForm();
        router.push("/");
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
        resetForm();
      });

    // console.log(values);
  };

  return (
    <>
      <Container fluid className="bg-img">
        <Row>
          <Col></Col>
          <Col style={{ margin: "100px " }}>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              <Card>
                <Card.Title style={{ textAlign: "center" }}>
                  <h3 className="colr">Reset your password</h3>
                  <h5>Enter your email to get reset link</h5>
                </Card.Title>
                <Card.Body>
                  <Form>
                    Email :
                    <p>
                      <Field
                        type="email"
                        name="email"
                        placeholder="enter email"
                        className="form-control"
                      />
                    </p>
                    <p className="color">
                      <ErrorMessage name="email" />
                    </p>
                      <p>
                        <Field
                          type="submit"
                          value="Request reset link"
                          className="btn btn-danger form-control"
                        />
                      </p>
                  </Form>
                </Card.Body>
                
              </Card>
            </Formik>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
}
