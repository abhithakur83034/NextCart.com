"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Footer from "@/app/footer";
import '../../style/feedback.css'
const Showfeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const userToken = JSON.parse(localStorage.getItem("token"));

  const headers = {
    'Authorization': 'Bearer ' + userToken
  };
  useEffect(() => {
    axios.get("http://localhost:4500/fb/showfeedback",{headers:headers})
      .then((res) => {
        console.log(res.data);
        setFeedbackData(res.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  return (
    <>
    <Container fluid style={{background:""}} >
        <Row className='fb-rw'>
          {/* <Col></Col> */}
          <Col >
              <Card style={{}}>
              <Card.Title style={{textAlign:"center"}}><h1>Show User's Feedback</h1></Card.Title>
                <hr/>
                
              {feedbackData.map((feedback, index) => (
                <div key={index} className="feedback-item">
                  <Card.Body className=''>
            <strong>Name:</strong> {feedback.username}<br />
            <strong>Email:</strong> {feedback.useremail}<br />
            <strong>Feedback:</strong> {feedback.feedback}<br />
            <hr/>
            </Card.Body>
          </div>
        ))}
              </Card>
            </Col>
            {/* <Col></Col> */}
        </Row>
    </Container>
      <Footer/>
     
        </>
  );
};

export default Showfeedback;
