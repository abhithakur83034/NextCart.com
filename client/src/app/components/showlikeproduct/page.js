"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import Link from "next/link";
import { toast } from "react-toastify";
import { RWebShare } from "react-web-share";
import { Container, Row, Col } from "react-bootstrap";
import "../../style/icon.css";
import Footer from "@/app/footer";
const Showlike = () => {
  const [like, setLike] = useState([]);
  const userdata = JSON.parse(localStorage.getItem("user"));
  // console.log(userdata)
  useEffect(() => {
    axios
      .get("http://localhost:4500/like/showlikeproduct")
      .then((res) => {
        // console.log(res.data)
        const likedata = res.data;
        // const filterLike = likedata.filter((likes) => likes.userId === userdata._id)
        setLike(likedata);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  // console.log(like)

  const handleAddToCart = async (item) => {
    try {
      const userId = userdata._id;
      const formData = new FormData();

      const file = await fetch(`http://localhost:4500/img/${item.image}`).then(
        (response) => response.blob()
      );
      const imageFile = new File([file], item.image, { type: "image/jpeg" });

      formData.append("userId", userId);
      formData.append("itemId", item._id);
      formData.append("name", item.name);
      formData.append("price", item.price);
      formData.append("quality", item.quality);
      formData.append("select", item.select);
      formData.append("quantity", item.quantity);
      formData.append("image", imageFile);

      axios
        .post(`http://localhost:4500/cart/cartproduct`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          const result = res.data;
          console.log(result.status);
          if (result.status === "warning") {
            toast.warning("Item in cart");
          } else {
            toast.success("Item added to cart");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col style={{ marginTop: "20px" }}>
            <div className="row row-cols-1 row-cols-md-3 ">
              {like.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="col">
                      <div className="card">
                        <span>
                          <div className="image-container">
                            <img
                              src={`http://localhost:4500/img/${item.image}`}
                              height="300px"
                              className="card-img-top"
                              alt="..."
                            />
                            <i className="bi bi-heart like-icon"></i>
                            <RWebShare
                              data={{
                                text: `Check out this product: ${item.name}`,
                                url: `http://localhost:4500/product/showproduct/${item._id}`,
                              }}
                              onClick={() =>
                                console.log("shared successfully!")
                              }
                            >
                              <i className="bi bi-share share-icon share-link"></i>
                            </RWebShare>
                          </div>
                        </span>
                        <div className="card-body">
                          <h5 className="card-title"> {item.name} </h5>
                          <p className="card-text">Price :: {item.price} </p>
                          <p className="card-text">
                            quality :: {item.quality}{" "}
                          </p>
                        </div>
                        <div className="card-footer">
                          <button
                            type="submit"
                            onClick={() => handleAddToCart(item)}
                            className="btn btn-success form-control"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Showlike;
