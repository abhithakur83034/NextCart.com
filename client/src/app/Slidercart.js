"use client";
import "./style/Dash.css";
import { Carousel } from "react-bootstrap";
import React from "react";
const user = JSON.parse(localStorage.getItem("user"))
const admin = JSON.parse(localStorage.getItem("admin"))
const Page = (props) => {
  // console.log(props.product);
  let products = props.product;
  // console.log(products);
  return (
    <>
    {
      user ?
      (
        <>
      <Carousel fade className="mt-5" >
        {products?.length !== 0 &&
          products?.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                {/* <Image
             alt="Picture of the author"
             src={`http://localhost:4500/img/${item.image}`}
             width={1500}
             height={500}
             objectFit="cover"
             quality={80}
              /> */}
                <img
                  className="d-block w-100"
                  src={`http://localhost:4500/img/${item.image}`}
                  alt=" slide"
                  height="500px"
                  />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
        </>
      )  :
      admin ? (
        ""
      )
      :
      (
        <>
       <Carousel fade style={{ margin: "50px" }} className="allback">
        {products?.length !== 0 &&
          products?.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                {/* <Image
             alt="Picture of the author"
             src={`http://localhost:4500/img/${item.image}`}
             width={1500}
             height={500}
             objectFit="cover"
             quality={80}
              /> */}
                <img
                  className="d-block w-100"
                  src={`http://localhost:4500/img/${item.image}`}
                  alt=" slide"
                  height="500px"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
        </>
      )
    }
    </>
  );
};

export default Page;
