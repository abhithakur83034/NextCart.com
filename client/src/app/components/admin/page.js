"use client";
import React from "react";
import { Container, Row,  Col, Card } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "../../style/errshow.css";
import "../../style/login.css";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import Footer from "@/app/footer";

let em = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|apple\.com)$/i;

const schema = yup.object().shape({
  email: yup.string().required("email is required").matches(em, {
    message: "only accept gmail.com & yahoo.com & apple.com",
    excludeEmptyString: false,
  }),
  password: yup
    .string()
    .required("password is required")
    .min(4, "password must be 4 char long")
    .max(6, "password can't be more long then 6 char"),
});

export default function Admin() {
  const router = useRouter();

  const validationSchema = schema;

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:4500/admin/adminlogin", values)
      .then((res) => {
        console.log(res.data);
        const result = res.data
        const admin = result.ADMIN
        const token = result.token
        localStorage.setItem("admin", JSON.stringify(admin));
        localStorage.setItem("token", JSON.stringify(token));
        setCookie("logged", "true");
        toast.success("Welcome Admin");
        resetForm();
        router.push("/");
        router.refresh()
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error("pllease check email and password");
        resetForm();
      });

    console.log(values);
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
                <h3 className="colr">Login to Your Account</h3>
                <h5>Enter your email & password to login</h5>
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
                  Password :
                  <p>
                    <Field
                      type="password"
                      name="password"
                      placeholder="enter password"
                      className="form-control"
                    />
                  </p>
                  <p className="color">
                    <ErrorMessage name="password" />
                  </p>
                  <center>
                    <p>
                      <Field
                        type="submit"
                        value="Login"
                        className="btn btn-danger form-control"
                      />
                    </p>
                   
                  </center>
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
