"use client";
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import Link from "next/link";
import "../../style/errshow.css";
import "../../style/login.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Footer from "@/app/footer";


export default function Register() {
  const { register, handleSubmit } = useForm();


  const onSubmit = (data) => {
    // console.log(data);
    // const file = data.image[0];
    // console.log(file);
    
      console.log(data)
        const file = data.image[0];
        console.log(file)
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', data.name);
        formData.append('mobile', data.mobile);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('address', data.address);
        formData.append('country', data.country);
        formData.append('about', data.about);
        console.log(formData)
      axios
      .post("http://localhost:4500/user/register", formData)
        // .post(
        //   `http://localhost:4500/user/register?&name=${name}&mobile=${mobile}&email=${email}&password=${password}&address=${address}&country=${country}&about=${about}&image=${image}`
        // )
        .then((res) => {
          console.log(res.data);
          const result = res.data;
          toast.success("You registered successfully.");
        })
        .catch((error) => {
          console.log(error.response.data);
          toast.error("Error during registration.");
        });
    
  };

  return (
    <>
      <Container fluid className="bg-img">
        <Row>
          <Col sm={2}></Col>
          <Col className="m-5">
            <Card>
              <Card.Title style={{ textAlign: "center" }}>
                <h3 className="colr">Create an Account</h3>
                <h5>Enter your personal details to create account</h5>
              </Card.Title>
              <Card.Body>
                <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col>
                      Image :
                      <p>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          className="form-control"
                          {...register('image',{required:true})}
                          
                        />
                      </p>
                      {/* <p className='color'> <ErrorMessage name='name'/> </p> */}
                    </Col>
                    <Col>
                      Username :
                      <p>
                        <input
                          type="text"
                          name="name"
                          placeholder="enter username"
                          className="form-control"
                          {...register('name',{required:true})}
                        />
                      </p>
                      
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Mobile :
                      <p>
                        <input
                          type="number"
                          name="mobile"
                          placeholder="enter mobile"
                          className="form-control"
                          {...register('mobile',{required:true})}
                        />
                      </p>
                    
                    </Col>
                    <Col>
                      Emaill :
                      <p>
                        <input
                          type="email"
                          name="email"
                          placeholder="enter email"
                          className="form-control"
                          {...register('email',{required:true})}
                        />
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Password :
                      <p>
                        <input
                          type="password"
                          name="password"
                          placeholder="enter password"
                          className="form-control"
                          {...register('password',{required:true})}
                        />
                      </p>
                    </Col>
                    <Col>
                      Address :
                      <p>
                        <input
                          type="text"
                          name="address"
                          placeholder="enter address"
                          className="form-control"
                          {...register('address',{required:true})}
                        />
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Country :
                      <p>
                        <input
                          type="text"
                          name="country"
                          placeholder="enter password"
                          className="form-control"
                          {...register('country',{required:true})}
                        />
                      </p>
                    </Col>
                    <Col>
                      About Yourself :
                      <p>
                        <input
                          type="text"
                          name="about"
                          placeholder="enter your about yourself"
                          className="form-control"
                          {...register('about',{required:true})}
                        />
                      </p>
                    </Col>
                  </Row>
                  <p>
                    <input
                      className=""
                      name="terms"
                      type="checkbox"
                      value=""
                      id="acceptTerms"
                      required
                    />
                    I agree and accept the
                    <Link href="/components/termofuse" className="deco">
                      terms and conditions
                    </Link>
                  </p>
                  <center>
                    <p>
                      <input
                        type="submit"
                        value="Register"
                        className="btn btn-info form-control"
                      />
                    </p>
                    <Link className="deco" href="/components/login">
                      <p>I have an account</p>
                    </Link>
                  </center>
                </form>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
}
