"use client"
import React from 'react';
import "../../style/term.css";
import {Container,Row,Card} from 'react-bootstrap'
import Footer from '@/app/footer';
const TermsOfUse = () => {
  return (
    <>
    <Container className="container" style={{minHeight:"600px"}}>
      <Row>
        <Card>
        <h1>Terms of Use</h1>
      <p>
        Welcome to our website. By accessing and using this website, you agree to comply
        with and be bound by the following terms and conditions of use.
      </p>
      <h2>1. Use of the Website</h2>
      <p>
        The content of this website is for general information and use only. It is subject
        to change without notice.
      </p>
      <h2>2. Intellectual Property</h2>
      <p>
        This website contains material which is owned by or licensed to us. This material
        includes, but is not limited to, the design, layout, look, appearance, and
        graphics. Reproduction is prohibited without proper authorization.
      </p>
      <h2>3. User Content</h2>
      <p>
        Any content you contribute to the website, including text, images, videos, or other
        materials, is subject to our review and approval. You are responsible for ensuring
        that your contributions do not violate any laws or infringe on the rights of others.
      </p>
      <h2>4. Privacy</h2>
      <p>
        Your use of this website is also governed by our Privacy Policy. Please review our
        Privacy Policy to understand how we collect, use, and protect your personal
        information.
      </p>
      <h2>5. Links to Third-Party Websites</h2>
      <p>
        This website may contain links to external websites for your convenience. We do not
        endorse or have control over the content of these websites. Visiting third-party
        websites is at your own risk.
      </p>
      
          </Card>
        </Row>
      
    </Container>
    <Footer/>
    </>
  );
};

export default TermsOfUse;
