"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import "./style/Dash.css";
import Example from "./doughnut";
import Examplegrapg from "./filledlinechart";
import ProgressBarPage from "./MostSoldItemsChart ";
import Footer from "./footer";
import AnimatedExample from "./MostSoldItemsChart ";
const DashBoard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  // console.log(user);

  const cardStyle = {
    minHeight: "150px",
    width: "300px",
    marginLeft: "1px",
    marginTop: "50px",
    borderRadius: "15px",
   
  };
  const currentDate = new Date();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const date = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const formattedDate = `${dayOfWeek} ${date}${getOrdinalSuffix(
    date
  )} ${month} ${year}`;

  // console.log(formattedDate);

  function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  // const startDate = new Date();
  // const endDate = new Date();

  // endDate.setDate(startDate.getDate() - 6);

  // const daysOfWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // const startDayOfWeek = daysOfWeeks[startDate.getDay()];
  // const startDateNum = startDate.getDate();

  // const endDayOfWeek = daysOfWeeks[endDate.getDay()];
  // const endDateNum = endDate.getDate();

  // const formattedDateRange = `${endDayOfWeek} ${endDateNum} - ${startDayOfWeek} ${startDateNum}`;

  // console.log(formattedDateRange);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4500/user/registeruser")
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const limitData = data.slice(0, 5);

  // console.log(limitData);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4500/product/showproduct")
      .then((res) => {
        // console.log(res.data);
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(product)

  const [time, setTime] = useState("");
  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const hour = currentTime.getHours();
      const sec = String(currentTime.getSeconds()).padStart(2, '0');
      const formattedTime = `${hour} : ${sec}`;
      setTime(formattedTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);




  // Checkout Status========================================

  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/transaction")
      .then((res) => {
        setTransaction(res.data.transaction);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(transaction.length)



  //count sold products======================================================================================
  const [totalPrice, setTotalPrice] = useState(0);
const [totalSoldProducts, setTotalSoldProducts] = useState(0);

useEffect(() => {
  axios.get("http://localhost:4500/api/sold")
    .then((res) => {
      const SOLD = res.data.sold;
      const currentDay = new Date();
      const date = String(currentDay.getDate()).padStart(2, '0');
      const month = String(currentDay.getMonth() + 1).padStart(2, '0');
      const year = currentDay.getFullYear();
      const currentDate = `${date}/${month}/${year}`;

      const soldData = SOLD.filter((item) => item.date === currentDate);

      const calculatedTotalPrice = soldData.reduce((total, item) => {
        return total + parseFloat(item.price);
      }, 0);

      setTotalPrice(calculatedTotalPrice);
      setTotalSoldProducts(soldData.length);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

// console.log(totalSoldProducts);

  //total Revenue ==================================================
  const [totalrevenue, settotalrevenue] = useState(0)
  useEffect(() => {
    axios.get("http://localhost:4500/api/sold")
      .then((res) => {
        // console.log(res.data.sold);
        const SOLD = res.data.sold;

        const soldData = SOLD.map((item) => {
          if (item.price && !isNaN(item.price)) {
            return item;
          }
          return undefined;
        });

        // console.log(soldData);

        const calculatedTotalPrice = soldData.reduce((total, item) => {
          return total + parseFloat(item.price);
        }, 0);

        // console.log("Total Price:", calculatedTotalPrice);

        settotalrevenue(calculatedTotalPrice);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(totalrevenue);


  return (
    <>
      {
        admin ?
          (
            <>
              <Container fluid className="allback">
                <Row>
                  <Col>
                    <Row className="m-3" style={{ background: "#141414", textAlign: "center" }}>
                      <Col style={{ fontSize: "20px", }}>
                        <Link href="/components/addproducts" style={{ textDecoration: "none", color: "white", marginRight: "20px" }} >Add Products</Link>
                        <Link href="/components/mensproduct" style={{ textDecoration: "none", color: "white", marginRight: "20px" }}>Men's</Link>
                        <Link href="/components/womensproduct" style={{ textDecoration: "none", color: "white", marginRight: "20px" }}>Women's</Link>
                        <Link href="/components/babysproduct" style={{ textDecoration: "none", color: "white" }}>Kid's</Link>
                      </Col>
                    </Row>
                    <Row className="m-3">
                      <Col>
                        <Card className="colr-cards">
                         
                              <Card.Title>
                                <h2>
                                  Welcome
                                  <b style={{ color: "red" }}>
                                    {admin.name.toUpperCase()}
                                  </b>
                                </h2>
                                <br />
                              </Card.Title>
                              <Card.Body>
                                <h4>
                                  {formattedDate} &nbsp; {time}
                                </h4>
                              </Card.Body>
                          
                        </Card>
                      </Col>
                      <Col>
                        <Card className="colrs-card">
                          <Card.Title>
                            <h5> Recent Customers</h5>
                          </Card.Title>
                          <Card.Body>
                            <Row>
                              {limitData.map((item, index) => (
                                <Col key={index}>
                                  <img
                                    variant="top"
                                    src={`http://localhost:4500/img/${item.image}`}
                                    style={{
                                      borderRadius: "50%",
                                      width: "50px",
                                      height: "50px",
                                    }}
                                  />
                                  <br />
                                  <b style={{ textAlign: "center" }}> {item.name}</b>
                                </Col>
                              ))}
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>

                      {/* <Col> */}
                      {/* <Card>
          <Card.Title>Weekly Sale</Card.Title>
          <Card.Body>
            <b>{formattedDateRange}</b>
            <h4>$4503.45</h4>
            <p></p>
          </Card.Body>
         </Card> */}
                      {/* </Col> */}

                      <Col>
                          <Card className="colr-card">
                            <Card.Body>
                              <h3>Store Overview</h3>
                              <h4>total product in store : {product.length}</h4>
                              <Link href="/components/addproducts">
                                <Button>Add New Product</Button>
                              </Link>
                            </Card.Body>
                          </Card>
                      </Col>
                    </Row>
                    <Row
                      className="m-3 card-col"
                      style={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Card style={cardStyle} className="colr">
                        <Card.Title>
                          <p>Today's Order</p>
                        </Card.Title>
                        <Card.Body>
                          {formattedDate}
                          <h3>${totalPrice}</h3>
                          <hr />
                          <Row>
                            <Col style={{ borderRight: "1px solid black" }}>
                              <b style={{ textAlign: "center" }}>sold</b> <br />
                              <b>{totalSoldProducts}</b>
                            </Col>
                            <Col style={{ borderRight: "1px solid black" }}>
                              <b>return</b> <br />
                              <b>14</b>
                            </Col>
                            <Col>
                              <b>picked</b>
                              <br />
                              <b>2240</b>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                      <Card
                        style={{
                          minHeight: "150px",
                          marginLeft: "1px",
                          marginTop: "50px",
                          width: "300px",
                          borderRadius: "20px",
                        }}
                        className="colrs"
                      >
                        <Card.Title>
                          <h2>Total Product</h2>
                        </Card.Title>
                        <hr />
                        <Card.Body>
                          <Row>
                            <Col style={{ borderRight: "1px solid black" }}>
                              <h3>In Stock</h3>
                              <h5>{product.length}+</h5>
                            </Col>
                            <Col>
                              <h3>Added</h3>
                              <h5>30000+</h5>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                      <Card
                        style={{
                          minHeight: "150px",
                          marginLeft: "1px",
                          marginTop: "50px",
                          width: "300px",
                          borderRadius: "20px",
                        }}
                        className="colro"
                      >
                        <Card.Title>
                          
                          <h2>Checkout Status</h2>
                        </Card.Title>
                        <hr />
                        <Card.Body>
                          
                          <Row>
                            <Col style={{ borderRight: "1px solid black" }}>
                              <Link href="/components/showtransaction" style={{ textDecoration: "none", color: "white" }}>
                                <h3>Done</h3>
                                <h5>{transaction.length}</h5>
                              </Link>
                            </Col>
                            <Col>
                              <h3>Abandoned</h3>
                              <h5>300</h5>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>

                      <Card
                        style={{
                          minHeight: "150px",
                          marginLeft: "1px",
                          marginTop: "50px",
                          width: "300px",
                          borderRadius: "20px",
                        }}
                        className="colros"
                      >
                        <Card.Title>
                          <h2>Total Customers</h2>
                        </Card.Title>
                        <hr />
                        <Card.Body>
                          <h2>{data.length}</h2>
                          <span>
                            <Link href="/components/registereduser" style={{ textDecoration: "none", color: "black" }} ><h4>Show user </h4></Link>
                          </span>
                        </Card.Body>
                      </Card>
                    </Row>
                    <Row
                      className="m-3 card-col"
                      style={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Card style={{ minHeight: "150px", width: "300px", marginLeft: "1px", marginTop: "50px",  borderRadius: "15px",}}
                       className="n-ro">
                        <Card.Title>
                          <h3>Total Revenue's</h3>
                        </Card.Title>
                        <Card.Body>
                          {/* <h5> 01/01/2023 - Present Day</h5> */}
                          <h3>${totalrevenue}</h3>
                          <hr />
                          
                        </Card.Body>
                      </Card>
                     
                    </Row>
                    <Row className="m-3 mt-5" style={{ background: "#141414" }}>
                      <Col >
                        <Example />
                      </Col>
                      <Col>
                        <Examplegrapg />
                      </Col>
                    </Row>

                    <Row className="m-3 mt-5 " style={{ background: "#141414" }}>
                      <Col className="m-5">
                        <AnimatedExample />
                      </Col>
                      <Col className="m-5"></Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
              <Footer />
            </>
          )
          :
          ""
      }
    </>
  )
}
export default DashBoard;
