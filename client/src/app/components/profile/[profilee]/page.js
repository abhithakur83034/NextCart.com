"use client";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../../../style/profile.css";
import "../../../style/login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import Footer from "@/app/footer";

const Profile = () => {
  const param = useParams();
  console.log(param)
  const id = param.profilee;
  // console.log(id);
  const { register, handleSubmit } = useForm();
  let admin = JSON.parse(localStorage.getItem("admin"));
  // console.log(admin);

  let user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  let users = user;
  // console.log(users.image);

  let mailuser = JSON.parse(localStorage.getItem("mailuser"));
  // console.log(mailuser);

  const onSubmit = (data) => {
    console.log(data);
    const file = data.image[0];
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", data.name);
    formData.append("mobile", data.mobile);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("country", data.country);
    formData.append("about", data.about);

    axios
      .post(`http://localhost:4500/profile/updateprofile/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("user data updated successfully");
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response);
      });
  };

  return (
    <>
      <Container fluid className="bg-img">
        <Row>
          <Col sm={3}></Col>
          <Col sm={6} style={{ marginTop: "80px"}}>
            {admin ? (
              <>
                <Card>
                  <Card.Title style={{ textAlign: "center" }}><h3 className="head">Update your Account</h3></Card.Title>
                  <hr />
                  <Card.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row mb-3">
                        <label
                          for="profileImage"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Profile Image
                        </label>
                        <div className="col-md-8 col-lg-9">
                        <img
                    src="assets/img/abhi.jpg"
                    alt=""
                    height="50px"
                    style={{ borderRadius: "50%" }}
                  />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="fullName"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Full Name
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="name"
                            className="form-control"
                            id="fullName"
                            readOnly
                            defaultValue={admin.name}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="about"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          About
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <textarea
                            name="about"
                            className="form-control"
                            id="about"
                            readOnly
                            style={{ height: "100px", resize: "none" }}
                          >
                            {admin.about}
                          </textarea>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Country"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Country
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="country"
                            className="form-control"
                            id="Country"
                            readOnly
                            defaultValue={admin.country}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Address"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Address
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="address"
                            className="form-control"
                            id="Address"
                            readOnly
                            defaultValue={admin.address}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Phone"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Phone
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="mobile"
                            className="form-control"
                            id="mobile"
                            readOnly
                            defaultValue={admin.mobile}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Email"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Email
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="email"
                            readOnly
                            className="form-control"
                            id="Email"
                            defaultValue={admin.adminemail}
                          />
                        </div>
                      </div>
                    </form>
                  </Card.Body>
                </Card>
              </>
            ) : users ? (
              <>
                <Card>
                  <Card.Title style={{ textAlign: "center" }}><h3 className="head">Update your Account</h3></Card.Title>
                  <hr />
                  <Card.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row mb-3">
                        <label
                          for="profileImage"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Profile Image
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <img
                            src={`http://localhost:4500/img/${users.image}`}
                            style={{
                              borderRadius: "50%",
                              width: "150px",
                              height: "150px",
                            }}
                            alt=""
                          />
                          <div className="pt-2">
                            <input
                              type="file"
                              id="fileInput"
                              style={{ display: "none" }}
                              name="image"
                              {...register("image")}
                            />
                            <label
                              htmlFor="fileInput"
                              style={{ cursor: "pointer" }}
                            >
                              <span role="img" aria-label="Upload">
                                📁
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="fullName"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Full Name
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="name"
                            type="text"
                            className="form-control"
                            id="fullName"
                            defaultValue={user.name}
                            {...register("name")}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="about"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          About
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <textarea
                            name="about"
                            className="form-control"
                            id="about"
                            style={{ height: "100px", resize: "none" }}
                            {...register("about")}
                          >
                            {user.about}
                          </textarea>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Country"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Country
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="country"
                            type="text"
                            className="form-control"
                            id="Country"
                            defaultValue={user.country}
                            {...register("country")}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Address"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Address
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="address"
                            type="text"
                            className="form-control"
                            id="Address"
                            defaultValue={user.address}
                            {...register("address")}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Phone"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Phone
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="mobile"
                            type="text"
                            className="form-control"
                            id="mobile"
                            defaultValue={user.mobile}
                            {...register("mobile")}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Email"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Email
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            id="Email"
                            defaultValue={user.email}
                            {...register("email")}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </Card.Body>
                </Card>
              </>
            ) : (
              <>
                <Card>
                  <Card.Title style={{ textAlign: "center" }}><h3 className="head">Update your Account</h3></Card.Title>
                  <hr />
                  <Card.Body>
                    <center>
                      <img
                        src={mailuser.image}
                        alt=""
                        height="150px"
                        style={{ borderRadius: "100px" }}
                      />
                    </center>
                    <p>
                      <h1>UserName::</h1>
                      {mailuser.name}
                    </p>
                    <p>
                      {" "}
                      <span className="head">Useremail::</span>
                      {mailuser.email}
                    </p>
                  </Card.Body>
                </Card>
              </>
            )}
          </Col>

          <Col sm={3}></Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default Profile;
