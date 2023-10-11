"use client";
import React from "react";
import "../../style/faq.css";
import Link from "next/link";
import {Card, Container, Row} from 'react-bootstrap';
import Footer from "@/app/footer";
// import "../../style/login.css";
const FAQ = () => {
  return (
    <>
    <Container className="container">
     {/* <Card>
      <Card.Title> */}
      <h1>Frequently Asked Questions</h1>
      <p>
        Have a question? Check out our frequently asked questions below. If you
        don't find the answer you're looking for, feel free to contact us.
      </p>
        {/* </Card.Title>
      <Card.Body> */}
      <Row className="question">
        <h2>Q: How do I place an order?</h2>
        <p>
          A: To place an order, simply browse our products, add items to your
          cart, and proceed to checkout. Follow the prompts to enter your
          shipping and payment information.
        </p>
      </Row>
      <Row className="question">
        <h2>Q: What payment methods do you accept?</h2>
        <p>
          A: We accept major credit cards (Visa, MasterCard, American Express)
          and PayPal for online payments.
        </p>
      </Row>
      <Row className="question">
        <h2>Q: How can I track my order?</h2>
        <p>
          A: Once your order is shipped, you will receive a tracking number via
          email. You can use this number to track the status of your package.
        </p>
      </Row>
      <Row className="question">
        <h2>Q: What is your return policy?</h2>
        <p>
          A: Our return policy allows you to return products within 30 days of
          purchase for a full refund. Please refer to our{" "}
          <Link href="/components/return">Returns Policy</Link> for more
          details.
        </p>
      </Row>
      <Row className="question">
        <h2>Q: How can I contact customer support?</h2>
        <p>
          A: You can reach our customer support team by emailing{" "}
          <a href="mailto:support@example.com">support@example.com</a> or
          calling our toll-free number at{" "}
          <a href="tel:+1234567890">123-456-7890</a>.
        </p>
      </Row>
      {/* </Card.Body>
      </Card> */}
    </Container>
    <Footer/>
    </>
  );
};

export default FAQ;
