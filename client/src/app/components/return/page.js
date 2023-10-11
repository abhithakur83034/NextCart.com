"use client"
import React from 'react';
import "../../style/return.css";
import { Container, Row, Card } from 'react-bootstrap';
import Footer from "@/app/footer";

const ReturnPolicy = () => {
  return (
    <>
    <Container className="container" style={{minHeight:"600px"}}>
     <Row>
      <Card>
     <h1>Return Policy</h1>
      <p>
        We want you to be completely satisfied with your purchase. If you need to return
        an item, please review our return policy below.
      </p>
      <h2>Returns and Exchanges</h2>
      <p>
        If you are not satisfied with your purchase, you can return or exchange it within
        30 days of the purchase date. Items must be unused and in the same condition as
        when you received them.
      </p>
      <h2>Refunds</h2>
      <p>
        Once we receive your return, we will inspect it and notify you that we have
        received your returned item. We will immediately notify you on the status of your
        refund after inspecting the item.
      </p>
      <p>
        If your return is approved, we will initiate a refund to your original method of
        payment. You will receive the credit within a certain number of days, depending
        on your card issuer's policies.
      </p>
     </Card>
     </Row>

    </Container>
    <Footer/>
    </>
  );
};

export default ReturnPolicy;
