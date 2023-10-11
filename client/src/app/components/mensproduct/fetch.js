"use client";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Link from "next/link";
import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
import "../../style/footer.css";
import "../../style/nav.css";
import "../../style/icon.css";
import "../../style/Dash.css";
import Footer from "@/app/footer";
import { RWebShare } from "react-web-share";
import axios from "axios";
import CardProduct from "@/app/CardProduct";
// import Icon from '../../Icon'

const Menfetch = (props) => {
  const [men, setMen] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4500/topcontainer/showcontainer")
      .then((res) => {
        console.log(res.data);
        const filterdata = res.data.filter((item) => item.role === "men");
        setData(filterdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data);

  useEffect(() => {
    axios
      .get("http://localhost:4500/product/showproduct")
      .then((res) => {
        console.log(res.data);
        const filteredMen = res.data.filter((item) => item.role === "men");
        setMen(filteredMen);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("men", men);

  const admin = JSON.parse(window.localStorage.getItem("admin"));
  let user = JSON.parse(window.localStorage.getItem("user"));

  const Deleteuser = (_id) => {
    if (window.confirm("are you sure want to delete this product")) {
      axios
        .delete(`http://localhost:4500/product/delete/${_id}`, {
          cache: "no-store",
        })
        .then((res) => {
          console.log(res.data);
          toast.success("product deleted");
        })
        .catch((error) => {
          console.log(error);
          toast.error("something went wrong");
        });
    }
  };

 

  const handleLike = async (item) => {
    console.log(item);

    try {
      const userId = user._id;
      const itemId = item._id;
      const name = item.name;
      const price = item.price;
      const quality = item.quality;
      const select = item.select;
      const quantity = item.quantity;
      const image = item.image;

      axios
        .post(
          `http://localhost:4500/liKE/like?userId=${userId}&itemId=${itemId}&name=${name}&price=${price}&quality=${quality}&select=${select}&quantity=${quantity}&image=${image}`,
          null,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          const result = res.data;
          console.log(result.status);
          if (result.status === "success") {
            toast.success("you like this product");
            setMen((prevBaby) =>
              prevBaby.map((prevItem) =>
                prevItem._id === item._id
                  ? { ...prevItem, liked: true }
                  : prevItem
              )
            );
          } else {
            toast.warning("you dislike this product");
            setMen((prevBaby) =>
              prevBaby.map((prevItem) =>
                prevItem._id === item._id
                  ? { ...prevItem, liked: false }
                  : prevItem
              )
            );
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user || !admin ? (
        <>
          <Container fluid className="allback">
            <h1
              style={{
                background: "#141414",
                textAlign: "center",
                color: "white",
              }}
            >
              Men's Product's
            </h1>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4 m-5">
              {men.map((item, index) => (
                <Col key={index}>
                  <Card style={{ background: "#141414", color: "white" }}>
                    <Link
                      href={`/components/singleproducts/${item._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card.Img
                        variant="top"
                        src={`http://localhost:4500/img/${item.image}`}
                        height="300px"
                      />
                    </Link>
                    <i
                      className={
                        item.liked
                          ? "bi bi-heart-fill like-icon"
                          : "bi bi-heart like-icon"
                      }
                      onClick={() => handleLike(item)}
                    ></i>
                    <RWebShare
                      data={{
                        text: `Check out this product: ${item.name}`,
                        url: `http://localhost:3000/sharemodal/${item._id}`,
                      }}
                    >
                      <i className="bi bi-share share-icon share-link"></i>
                    </RWebShare>
                    <Link
                      href={`/components/singleproducts/${item._id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                        <p style={{ color: "green" }}>
              {((item.strike - item.price) / item.strike * 100).toFixed(2)}% off
            </p>
                          <strike> ${item.strike} </strike>&nbsp; $ {item.price}
                          {/* <p>{item.about}</p> */}
                          <br />
                        </Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
          <Footer />
        </>
      ) : (
        <div style={{ overflowY: 'auto' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ fontSize: "20px", color: "red" }}>Sr No</th>
              <th style={{ fontSize: "20px", color: "red" }}>Image</th>
              <th style={{ fontSize: "20px", color: "red" }}>Name</th>
              <th style={{ fontSize: "20px", color: "red" }}>Strike</th>
              <th style={{ fontSize: "20px", color: "red" }}>Price</th>
              <th style={{ fontSize: "20px", color: "red" }}>Off</th>
              <th style={{ fontSize: "20px", color: "red" }}>Quality</th>
              <th style={{ fontSize: "20px", color: "red" }}>Category</th>
              <th style={{ fontSize: "20px", color: "red" }}>Sub-Category</th>
              <th style={{ fontSize: "20px", color: "red" }}>Size</th>
              <th style={{ fontSize: "20px", color: "red" }}>Color</th>
              <th style={{ fontSize: "20px", color: "red" }}>About</th>
              <th style={{ fontSize: "20px", color: "red" }}>Brand</th>
              <th style={{ fontSize: "20px", color: "red" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {men.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:4500/img/${item.image}`}
                    alt={item.name}
                    height="100px"
                    width="100px"
                  />
                </td>
                <td>{item.name}</td>
                <td>
                  <strike>{item.strike}</strike>
                </td>
                <td>{item.price}</td>
                <td>
                <p style={{ color: "green" }}>
              {((item.strike - item.price) / item.strike * 100).toFixed(2)}% off
            </p>
                </td>
                <td>{item.quality}</td>
                <td>{item.role}</td>
                <td>{item.subcategory}</td>
                <td>{item.size}</td>
                <td>{item.color}</td>
                <td>{item.about}</td>
                <td>{item.brand}</td>
                <td
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link style={{textDecoration:"none", border:"1px solid grey", width:"60px",textAlign:"center",lineHeight:"50px",borderRadius:"7px", color:"white", background:"green"}}
                    href={"/components/editproduct/" + item._id}
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => Deleteuser(item._id)}
                    className="ml-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      )}
    </>
  );
};

export default Menfetch;
