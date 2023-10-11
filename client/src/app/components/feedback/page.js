"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../style/feedback.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Col, Container, Row, Card } from "react-bootstrap";
import Image from 'next/image'
import Footer from "@/app/footer";
const FeedbackSchema = Yup.object().shape({


  feedback: Yup.string()
    .required("Feedback is required")
    .min(10, "Feedback should be at least 10 characters"),
});

const Page = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  const userToken = JSON.parse(localStorage.getItem("token"));

  const headers = {
    'Authorization': 'Bearer ' + userToken
  };


  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log(values)
    const formData = {
      feedback: values.feedback,
      userId:  user._id, 
      username:  user.name, 
      useremail:  user.email, 
    };
    axios.post("http://localhost:4500/fb/feedback", formData,{headers:headers});
    setTimeout(() => {
      toast.success("Feedback submitted: ");
      setSubmitting(false);
    }, 1000);
    resetForm();
  };

  return (
    <>

    <Container className="feedback-container">
      <Row style={{ margin: "auto" }}>
        <Col>
        <Image
         src="https://media4.giphy.com/media/R59Hhh3cnfuffSSAxP/200w.webp?cid=ecf05e473o95ap5ic6sjeeebkapopqye6srh1hyxk2ceag0d&ep=v1_gifs_search&rid=200w.webp&ct=g"
         alt='image'
         width={1500}
         height={300}
         style={{
           borderRadius:"1rem",
           borderColor:'#fff',
           borderWidth :' 6px',
           width: "100%",
           height: "300px"
         }}
        />
        </Col>
        <Col>
        <Card>
            <Card.Title> <h1>Feedback</h1></Card.Title>
            <Card.Body>
              <Formik
                initialValues={{ feedback: "" }}
                validationSchema={FeedbackSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div>
                    <label htmlFor="feedback">Your Feedback:</label>
                    <Field
                      className="feedback-field"
                      component="textarea" 
                      name="feedback" 
                      placeholder="Your feedback..."
                    />
                    <p className="error-message">
                      <ErrorMessage name="feedback" />
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-info"
                    type="submit"
                  >
                    Submit feedback
                  </button>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default Page;
