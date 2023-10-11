"use client";

import axios from "axios";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "../../../style/icon.css";
import Footer from "@/app/footer";

export default function itempage({ params }) {
//   console.log("params", params);
  const id = params.singleproduct;
//   console.log(id);
  const [value, setValue] = useState([]);
  let user = JSON.parse(window.localStorage.getItem("user"));

  const userToken = JSON.parse(localStorage.getItem("token"));

  const headers = {
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + userToken
  };
  


  useEffect(() => {
    axios
      .get(`http://localhost:4500/product/showproduct`)
      .then((res) => {
        // console.log(res.data);
        const filterdata = res.data.filter((data) => data._id === id);
        // Assign the first item to value
        if (filterdata.length > 0) {
          setValue(filterdata[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

//   console.log(value);

  // Check if value exists before accessing its properties
  if (value) {
    console.log(value.name);
  }

    const handleAddToCart = async (items) => {
      if (user ) {
        try {
          const userId = user._id;
          // const formData = new FormData();
          // const file = await fetch(
          //   `http://localhost:4500/img/${items.image}`
          // ).then((response) => response.blob());
          // const imageFile = new File([file], items.image, { type: "image/jpeg" });

          // const userId = userId
          const itemId = items._id
          const name = items.name
          const price = items.price
          const quality = items.quality
          const select = items.select
          const quantity = items.quantity
          const image = items.image
          const formData = {userId,itemId,name,price,quality,select,quantity,image}
          console.log("rgeh",formData)

          axios
          .post(`http://localhost:4500/cart/cartproduct`, formData)
          .then((res) => {
            console.log(res.data);
            const result = res.data;
            console.log(result.status);
            if (result.status === "warning") {
              toast.warning("items in cart");
            } else {
              toast.success("items added to cart");
            }
          })
          .catch((error) => {
            console.log(error);
          });
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      } else {
        toast.warning("please login first");
      }
    };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card style={{height:"300px",width:"300px"}}>
              <Card.Img
                variant="top"
                src={`http://localhost:4500/img/${value.image}`}
                style={{
                    height:"300px",
                    width:"300px"
                }}
              />
            </Card>
          </Col>
          <Col>
          <Card>
          <Card.Body>
            <Card.Title> <h1>{value.name}</h1> </Card.Title>
            <Card.Text>
            <p style={{ color: "green" }}>
              {((value.strike - value.price) / value.strike * 100).toFixed(2)}% off
            </p> <br/>
              <b><strike>$ {value.strike} </strike>&nbsp; $ {value.price}</b><br/>
              <b style={{fontSize:"20px"}}>Size: </b> {value.size} <br/>
              <b><span style={{ color: "green" }}>{value.about}</span>{" "}</b>
            </Card.Text>
          </Card.Body>
            <button
              onClick={() => handleAddToCart(value)}
              className="btn btn-outline-info">
              Add To Cart
            </button>
          </Card>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
}
