"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from "react-toastify";
import "../../style/transaction.css";
import Footer from "@/app/footer";
import { Card, Container, Row,Col } from 'react-bootstrap';
const admintable = () => {
//   const navigate = useNavigate()
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:4500/user/registeruser")
      .then((res) => {
        setData(res.data)
      }).catch((error) => {
        console.log(error)
      })
  }, [])

  console.log(data)
  const handleDelete = (_id) => {
    axios.delete('http://localhost:4500/user/delete/' + _id)
      .then((res) => {
        toast.success('delete')
        setTimeout(() => {
          navigate(0)
        }, 3000)
      }).catch((error) => {
        toast.error(error)
      })
  }
  return (
    <>
      <Container fluid>
        <Row>
        <Col className="table-container">
           <h1 style={{textAlign:"center"}} >  Registered User's  </h1> 
       
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Index</th>
                    <th scope="col">Image</th>
                    <th scope="col">User_Id</th>
                    <th scope="col">User_Name</th>
                    <th scope="col">User_Number</th>
                    <th scope="col">User_Email</th>
                    <th scope="col">User_Address</th>
                    <th scope="col">User_Country</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item, index) => (
                      <tr key={index}>
                        <td> {index + 1} </td>
                        <td>
                          <img src={`http://localhost:4500/img/${item.image}`} height="100px" width="100px" alt="" />
                        </td>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td> {item.mobile}</td>
                        <td> {item.email}</td>
                        <td> {item.address}</td>
                        <td> {item.country}</td>
                        <td>
                          <button className='btn btn-danger' onClick={() => { handleDelete(item._id) }}>Delete</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
          </Col>
        </Row>
</Container>
      <Footer />

    </>
  )
}

export default admintable