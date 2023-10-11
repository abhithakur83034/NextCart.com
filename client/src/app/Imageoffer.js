"use client"
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import  Image  from "next/image";

const user = JSON.parse(localStorage.getItem("user"))
const admin = JSON.parse(localStorage.getItem("admin"))
const Imageoffer = () => {
  return (
   <>
{
  user ?
  (
    <>
 <Container>
    <Row className="m-5">
      <Col sm={5}>
        <Image
        src='https://media3.giphy.com/media/R7ifMrDG24Uc89TpZH/200w.webp?cid=ecf05e471p8yxzwq6jnj4oirty7zhptaf2gh1pljnrnry139&ep=v1_gifs_search&rid=200w.webp&ct=g'
        alt='image'
        // layout="intrinsic"
        width={500}
        height={300}
        style={{
          borderRadius:"1rem",
          borderColor:'#fff',
          borderWidth :' 6px',
          width: "100%",
          height: "300px"
        }}
        />
      </Col>
      <Col sm={5}>
        <Image  
        src='https://media0.giphy.com/media/YT0wjTXiuhxGhMg77u/200w.webp?cid=ecf05e47rj9sw8l4z44xbg3zshf86nutos1fyof2z0j0j2np&ep=v1_gifs_search&rid=200w.webp&ct=g'
        alt='image'
        // layout="intrinsic"
        width={500}
        height={300}
        style={{
          borderRadius:"1rem",
          borderColor:'#fff',
          borderWidth :' 6px',
          width: "100%",
          height: "300px"
        }}
        />
      </Col>
    </Row>
  </Container>
    </>
  )
  :
   admin ?  ("")
  :
  (<>
  <Container>
  <Row className="m-5">
    <Col sm={5}>
      <Image
      src='https://media3.giphy.com/media/R7ifMrDG24Uc89TpZH/200w.webp?cid=ecf05e471p8yxzwq6jnj4oirty7zhptaf2gh1pljnrnry139&ep=v1_gifs_search&rid=200w.webp&ct=g'
      alt='image'
      // layout="intrinsic"
      width={500}
      height={300}
      style={{
        borderRadius:"1rem",
        borderColor:'#fff',
        borderWidth :' 6px',
        width: "100%",
        height: "300px"
      }}
      />
    </Col>
    <Col sm={5}>
      <Image  
      src='https://media0.giphy.com/media/YT0wjTXiuhxGhMg77u/200w.webp?cid=ecf05e47rj9sw8l4z44xbg3zshf86nutos1fyof2z0j0j2np&ep=v1_gifs_search&rid=200w.webp&ct=g'
      alt='image'
      // layout="intrinsic"
      width={500}
      height={300}
      style={{
        borderRadius:"1rem",
        borderColor:'#fff',
        borderWidth :' 6px',
        width: "100%",
        height: "300px"
      }}
      />
    </Col>
  </Row>
</Container>
</>)
}
   </>
  )
}

export default Imageoffer