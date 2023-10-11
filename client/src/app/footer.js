"use client";
import React from "react";
import "./style/footer.css";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
const Footer = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <>
    {
      user ?
      (
        <>
<hr/>
      <Container fluid style={{textAlign:"center", color:"black"}}>
        <Row className="back row">
          <Col>
         <h3> &copy; Copyright <strong><span>Next Cart.Com</span></strong>. All Rights Reserved</h3>
          </Col>
        </Row>
        <Row className="back row" >
          <Col> Designed by 
          {/* <Link href="/adminprofile" style={{textDecoration:"none", color:"peach"}}> */}
            &nbsp; <span style={{color:"red"}} >Abhishek Kumar Sharma</span>
            {/* </Link> */}
          </Col>
        </Row>
      </Container>
        </>
      )
      :
      ""
    }
    
    </>
  );
};

export default Footer;


