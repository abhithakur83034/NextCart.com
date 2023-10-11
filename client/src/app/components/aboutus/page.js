"use client"
import React from "react";
import "../../style/aboutus.css";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "@/app/footer";
const Page = () => {
  return (
    <>
      <Container fluid className="about-container" style={{minHeight:"600px"}}>
        <Row>
          <Col>
          <h1>About Us</h1>
        <p>
          Welcome to our e-commerce store! At [Your Store Name], we are more
          than just a store – we're a community that's passionate about
          providing you with exceptional products and outstanding customer
          service.
        </p>
        <p>
          Our journey began [X years ago/year of foundation] with a small team
          of individuals who shared a vision: to create a curated marketplace
          where customers could explore a wide range of handpicked products,
          each chosen for its quality, uniqueness, and value.
        </p>
        <p>
          Our commitment to quality is unwavering. We work closely with
          artisans, designers, and manufacturers who take pride in their
          craftsmanship. Every product you find on our platform undergoes a
          rigorous selection process to ensure that it meets our high standards.
        </p>
        <p>
          What sets us apart is our dedication to our customers. We believe that
          every interaction should be personal and meaningful. Our customer
          support team is always here to assist you, whether you have questions
          about a product, need help with your order, or simply want to share
          feedback.
        </p>
        <p>
          Sustainability is also a core value of ours. We are committed to
          minimizing our environmental footprint and contributing positively to
          the communities we serve. We're continually exploring ways to make our
          operations more eco-friendly and socially responsible.
        </p>
        <p>
          As we continue to grow, our focus remains on you – our valued
          customer. Thank you for being a part of our journey. We look forward
          to exceeding your expectations and providing you with an unforgettable
          shopping experience.
        </p>
        <div className="map-container">
          <iframe
            title="Google Map"
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.1234567890123!2d80.9494112!3d26.8468914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39998062a748fc8b%3A0xef2c40a411dca754!2sTedhi%20Pulia%2C%20LDA%20Colony%2C%20Lucknow%2C%20Uttar%20Pradesh%20360026!5e0!3m2!1sen!2sin!4v1629955265052!5m2!1sen!2sin"
          ></iframe>
        </div>
          </Col>
        </Row>
        
      </Container><Footer/>
    </>
  );
};

export default Page;
