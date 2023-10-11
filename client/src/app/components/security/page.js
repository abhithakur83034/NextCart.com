"use client"
import React from 'react';
import "../../style/security.css";
import { Container, Row, Card } from 'react-bootstrap';
import Footer from "@/app/footer";

const Security = () => {
  return (
    <>
    <Container className="container" style={{minHeight:"600px"}}>
        <Row>
          <Card>
        <h1>Security</h1>
      <p>
        Ensuring the security of your data and information is of utmost importance to us.
        Here's how we protect your information and maintain a secure environment.
      </p>
      <h2>1. Secure Data Transmission</h2>
      <p>
        We use encryption protocols to ensure that data transmitted between your browser
        and our servers remains confidential and secure.
      </p>
      <h2>2. Account Security</h2>
      <p>
        Protecting your account is a top priority. We encourage you to use strong,
        unique passwords and enable two-factor authentication (2FA) for added security.
      </p>
      <h2>3. Regular Security Audits</h2>
      <p>
        We conduct regular security audits and vulnerability assessments to identify and
        address potential security risks.
      </p>
      <h2>4. Data Access Controls</h2>
      <p>
        Access to your data is limited to authorized personnel only. We employ strict
        access controls and authentication mechanisms to prevent unauthorized access.
      </p>
      <h2>5. Secure Payment Processing</h2>
      <p>
        When you make payments on our website, we ensure that your payment information is
        handled securely and in compliance with industry standards.
      </p>
      <h2>6. Keeping You Informed</h2>
      <p>
        We keep you informed about security updates and best practices through regular
        notifications and updates on our website.
      </p>
      </Card>
        </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default Security;
