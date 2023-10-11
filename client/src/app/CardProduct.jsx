"use client"
import { Col, Container, Row, Card } from 'react-bootstrap';
import './style/CardProduct.css'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import axios from 'axios';

const CardProduct = () => {

  const [data, setData] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:4500/topcontainer/showcontainer")
    .then((res)=>{
      console.log(res.data)
      setData(res.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  const limitedData = data.slice(0, 4);

  console.log(limitedData);
  return (
    <>
      <Container fluid>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 m-5">
        {limitedData.map((item, index) => (
          <Col key={index}>
            <Link href="/components/shoes" >
            <Card>
              <Card.Img
                variant="top"
                src={`http://localhost:4500/img/${item.image}`}
                  width= "100%"
                  height= "200px"
              />
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default CardProduct;
