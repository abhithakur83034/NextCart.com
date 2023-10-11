"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";


export default function Transaction({params}){
    console.log(params.transaction)
    const id = params.transaction

    const [single, setSingle] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:4500/api/transaction`)
        .then((res)=>{
            const filterdata = res.data.transaction.filter((data) => data._id === id);
            if(filterdata.length > 0){
                setSingle(filterdata[0])
            }
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    console.log(single)
    return(
        <>
           <Container fluid>
      <Row>
        <Col></Col>
            <Col md={4}>
              <Card className="mt-5">
                <Card.Body>
                  <Card.Title>
                    <h1 style={{textAlign:"center"}}>{single.cus_name}</h1>
                  </Card.Title>
                  <hr/>
                  <Card.Text>
                    <p><span style={{fontSize:"30px"}} >_id : </span>: {single._id}</p>
                    <p><span style={{fontSize:"30px"}}>payment_method_id : </span>{single.payment_method_id}</p>
                    <p><span style={{fontSize:"30px"}}>invoice_id : </span>{single.invoice_id}</p>
                    <p><span style={{fontSize:"30px"}}>amount : </span>{single.amount}</p>
                    <p><span style={{fontSize:"30px"}}>cus_id : </span>{single.cus_id}</p>
                    <p><span style={{fontSize:"30px"}}>cus_email : </span>{single.cus_email}</p>
                    <p><span style={{fontSize:"30px"}}>cus_name : </span>{single.cus_name}</p>
                    <p><span style={{fontSize:"30px"}}>card_holder_name : </span>{single.card_holder_name}</p>
                    <p><span style={{fontSize:"30px"}}>invoice_number : </span>${single.invoice_number}</p>
                    <p><span style={{fontSize:"30px"}}>cardlast : </span>{single.cardlast}</p>
                    <p><span style={{fontSize:"30px"}}>created_at : </span>{single.created_at}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col></Col>
      </Row>
    </Container>
        </>
    )
}