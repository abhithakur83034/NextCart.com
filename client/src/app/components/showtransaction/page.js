"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import "../../style/transaction.css";
import Link from "next/link";

export default function Showtransaction() {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/transaction")
      .then((res) => {
        setTransaction(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col className="table-container">
        
            <Table striped bordered hover className="table-responsive">
              <thead>
                <tr>
                  <th style={{ fontSize: "20px" }}>Index</th>
                  <th style={{ fontSize: "20px" }}>_id</th>
                  <th style={{ fontSize: "20px" }}>payment_method_id</th>
                  <th style={{ fontSize: "20px" }}>invoice_id</th>
                  <th style={{ fontSize: "20px" }}>amount</th>
                  <th style={{ fontSize: "20px" }}>cus_id</th>
                  <th style={{ fontSize: "20px" }}>cus_email</th>
                  <th style={{ fontSize: "20px" }}>cus_name</th>
                  <th style={{ fontSize: "20px" }}>card_holder_name</th>
                  <th style={{ fontSize: "20px" }}>invoice_number</th>
                  <th style={{ fontSize: "20px" }}>cardlast</th>
                  <th style={{ fontSize: "20px" }}>created_at</th>
                  <th style={{ fontSize: "20px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {transaction.transaction &&
                  transaction.transaction.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item._id}</td>
                      <td>{item.payment_method_id}</td>
                      <td>{item.invoice_id}</td>
                      <td>{item.amount}</td>
                      <td>{item.cus_id}</td>
                      <td>{item.cus_email}</td>
                      <td>{item.cus_name}</td>
                      <td>{item.card_holder_name}</td>
                      <td>${item.invoice_number}</td>
                      <td>{item.cardlast}</td>
                      <td>{item.created_at}</td>
                      <td>
                        <Link
                          href={`/components/showtransaction/${item._id}`}
                          style={{ textDecoration: "none", color:"red" }}
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          
        </Col>
      </Row>
    </Container>
  );
}
