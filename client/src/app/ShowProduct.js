"use client";
import React, { useEffect,      useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionitem } from "./redux/action/action";
import { RWebShare } from "react-web-share";
import { useRouter } from "next/navigation";
import "./style/footer.css";
import "./style/nav.css";
import "./style/icon.css";
import "./style/Dash.css";

const ShowProduct = (props) => {
  let product = props.product;

  const headers = {
    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
  };

  const productData = useSelector((state) => state.productData);
  // console.log(productData);

  // const addtocartData = useSelector((state) => state.cartData);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch({ payload: actionitem(product), type: "PRODUCT" });
  }, []);

  // Update the local state 'data' when 'productData' changes
  useEffect(() => {
    if (productData && productData.data && Array.isArray(productData.data.payload)) {
      const updatedData = productData.data.payload.map((item) => {
        return { ...item, liked: false };
      });
      setData(updatedData);
    }
  }, [productData]);
  

  console.log(data)


  let admin = JSON.parse(window.localStorage.getItem("admin"));
  // console.log(admin)
  let user = JSON.parse(window.localStorage.getItem("user"));
  // console.log(user)



  const handleLike = async (item) => {
    // console.log(item);
    if (user) {
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
            // console.log(res.data);
            const result = res.data;
            // console.log(result.status);
            if (result.status === "success") {
              toast.success("you like this product");
              setData((prevData) =>
                prevData.map((prevItem) =>
                  prevItem._id === item._id
                    ? { ...prevItem, liked: true }
                    : prevItem
                )
              );
            } else {
              toast.warning("you dislike this product");
              setData((prevData) =>
                prevData.map((prevItem) =>
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
    } else {
      toast.warning("please login first");
    }
  };

  // console.log(data);

 
  return (
    <>
      {user ? (
        <>
          <Container fluid className="allback">
            <Row xs={1} sm={2} md={3} lg={4} className="g-4 m-5">
              {data.map((item, index) => (
                <Col key={index}>
                  {/* <span onClick={()=>handleItem(item._id)}> */}
                  <Card style={{ background: "#141414", color: "white" }}>
                    <Link
                      href={`/components/singleproducts/${item._id}`}
                      style={{ textDecoration: "none", color:"white" }}
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
                      style={{ textDecoration: "none" }}
                    >
                      <Card.Body>
                      <Card.Title ><span style={{color:"#ffffff"}}>{item.name}</span></Card.Title>
                        <Card.Text>
                        <b> 
                        <p style={{ color: "green" }}>
              {((item.strike - item.price) / item.strike * 100).toFixed(2)}% off
            </p>
                          </b>
                       <p style={{ color: "white" }}> 
                       <strike>
                         ${item.strike} 
                      </strike>&nbsp; $ {item.price}</p>
                        {/* <p style={{ color: "white" }}>{item.about}</p> */}
                          <br />
                        </Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                  {/* //  </span> */}
                </Col>
              ))}
            </Row>
          </Container>
        </>
      ) : admin ? (
        ""
      ) : (
        <>
          <Container fluid className="allback">
            <Row xs={1} sm={2} md={3} lg={4} className="g-4 m-5">
              {data.map((item, index) => (
                <Col key={index}>
                  <Card style={{ background: "#141414", color: "white" }}>
                  <Link
                      href={`/components/singleproducts/${item._id}`}
                      style={{ textDecoration: "none", color:"white" }}
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
                      style={{ textDecoration: "none", color:"white" }}
                    >
                    <Card.Body>
                      <Card.Title ><span style={{color:"#ffffff"}}>{item.name}</span></Card.Title>
                      <Card.Text>
                       <b> <p style={{ color: "green" }}>
              {((item.strike - item.price) / item.strike * 100).toFixed(2)}% off
            </p></b>
                       <p style={{ color: "#ffffff" }}> <strike> ${item.strike} </strike>&nbsp; $ {item.price}</p>
                        {/* <p style={{ color: "#ffffff" }}>{item.about}</p> */}
                        <br />
                      </Card.Text>
                    </Card.Body></Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default ShowProduct;
