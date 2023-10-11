"use client"
import axios from "axios";
import React, { useEffect } from "react";
import {Container, Row} from "react-bootstrap";
import { useRouter } from "next/navigation";
const Success = () => {
  const sessionId = localStorage.getItem("session")
  console.log("sessionId",sessionId)

  const router = useRouter()

  const userToken = JSON.parse(localStorage.getItem('token'));

  const headers = {
    'Authorization': 'Bearer ' + userToken
  };
  useEffect(()=>{
    if(sessionId){
        axios.get(`http://localhost:4500/api/retrive-checkout-session?sessionId=${sessionId}`,{headers:headers})
        .then((res)=>{
          console.log(res.data)
          localStorage.removeItem("sessionId")
          router.push("/")
        }).catch((error)=>{
          console.log(error)
        })
    }
  },[])
  return (
   <Container style={{minHeight:"600px"}}>
    <Row>
      <h1>success</h1>
    </Row>
   </Container>
  );
};

export default Success;
