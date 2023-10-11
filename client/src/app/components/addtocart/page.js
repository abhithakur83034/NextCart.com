"use client";
import React, { useState, useEffect } from "react";
import {  Col, Container, Row, Button,Table } from "react-bootstrap";
import Footer from "@/app/footer";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
const Page = () => {
  const [cartdata, setCartdata] = useState([]);
  const [quantityMap, setQuantityMap] = useState({}); 

  const user = JSON.parse(localStorage.getItem("user"));
  const userToken = JSON.parse(localStorage.getItem("token"));

  const headers = {
    'Authorization': 'Bearer ' + userToken
  };
  
  useEffect(() => {
    axios
      .get("http://localhost:4500/cart/showcartproduct")
      .then((res) => {
        const filteredCartData = res.data.filter(
          (item) => item.userId === user._id
        );
        setCartdata(filteredCartData);
        const initialQuantityMap = {};
        filteredCartData.forEach((item) => {
          initialQuantityMap[item._id] = item.quantity;
        });
        setQuantityMap(initialQuantityMap);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleIncrement = (id) => {
    setQuantityMap((prevQuantityMap) => {
      if (typeof prevQuantityMap[id] === "number") {
        return {
          ...prevQuantityMap,
          [id]: prevQuantityMap[id] + 1,
        };
      }
      return {
        ...prevQuantityMap,
        [id]: 1,
      };
    });
  };

  const handleDecrement = (id) => {
    setQuantityMap((prevQuantityMap) => {
      if (typeof prevQuantityMap[id] === "number" && prevQuantityMap[id] > 1) {
        return {
          ...prevQuantityMap,
          [id]: prevQuantityMap[id] - 1,
        };
      }
      return prevQuantityMap;
    });
  };

  const getTotalQuantity = () => {
    return Object.values(quantityMap).reduce(
      (total, quantity) => total + parseInt(quantity),
      0
    );
  };

  const getTotalPrice = () => {
    return cartdata
      .reduce((totalPrice, item) => {
        const quantity = quantityMap[item._id] || 0;
        return totalPrice + parseFloat(item.price) * quantity;
      }, 0)
      .toFixed(2);
  };

  const handelRemove = (id) => {
    if (window.confirm("are you sure want to remove this product")) {
      axios
        .delete(`http://localhost:4500/cart/delete/${id}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.deletedCount === 1) {
            toast.success("Product deleted");
          }
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        });
    }
  };


  
  return (
    <>
      {cartdata.length === 0 ? (
        <Container fluid>
          <Row>
            <Col>
            <h1>Cart is empty</h1>
            <i>
              <h2>Please add some products</h2>
            </i>
            <Link href="/" className="btn">
              Back to home
            </Link>
            <img
              src="assets/img/not-found.svg"
              className="img-fluid py-5"
              alt="Page Not Found"
            />
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Container fluid>
      <h1 className="text-center">Cart Products</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartdata.map((item, index) => (
            <tr key={index}>
              <td>
                <img
                  src={`http://localhost:4500/img/${item.image}`}
                  height="100px"
                  width="100px"
                  alt=""
                />
              </td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <div className="">
                  <Button variant="danger" onClick={() => handleDecrement(item._id)}>-</Button>
                  <span className="mx-2">{quantityMap[item._id]}</span>
                  <Button variant="success" onClick={() => handleIncrement(item._id)}>+</Button>
                </div>
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => handelRemove(item._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <p>Total Quantity: {getTotalQuantity()}</p>
        <p>Total Price: {getTotalPrice()}</p>
        <Button variant="outline-info" href="/components/address">
          Buy Now
        </Button>
      </div>
    </Container>
        </>
      )}
      <Footer />
    </>
  );
};
export default Page;
