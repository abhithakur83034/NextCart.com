"use client"
import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "@/app/footer";
import "../../../style/login.css";
import { useForm } from "react-hook-form";

const Updatepage = ({ params }) => {
  const id = params.update;
console.log(id)
  const { register, handleSubmit, setValue } = useForm();
  const [proData, setProData] = useState({}); // Initialize proData as an empty object

  useEffect(() => {
    axios
      .get(`http://localhost:4500/product/update/${id}`)
      .then((res) => {
        console.log(res.data);
        const proData = res.data;
        setProData(proData); 
        setValue("image", proData.image);
        setValue("name", proData.name);
        setValue("price", proData.price);
        setValue("strike", proData.strike);
        setValue("quality", proData.quality);
        setValue("role", proData.role);
        setValue("subcategory", proData.subcategory);
        setValue("size", proData.size);
        setValue("color", proData.color);
        setValue("brand", proData.brand);
        setValue("about", proData.about);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (values) => {
    console.log(values);
    try {
        const allSizes = values.size
    //   const formData = new FormData();
      const image = values.image[0];
      console.log(image)
     const  name= values.name;
     const  price= values.price;
     const  strike= values.strike;
     const  quality=values.quality;
     const  role= values.role;
     const  subcategory=values.subcategory;
     const  size= allSizes;
     const  color= values.color;
     const  about= values.about;
     const  brand=values.brand;

     const formData = {image,name,price,strike,quality,role,subcategory,size,color,about,brand}
       axios.put(
        `http://localhost:4500/product/updateproduct/${id}`, formData)
        .then((res)=>{
            console.log(res.data)
        }).catch((error)=>{
            console.log(error)
        })
      // resetForm({});
      toast.success("Product updated successfully");
      
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Container fluid className="bgs-img">
        <Row>
          <Col sm={3}></Col>
          <Col>
            <Card>
              <Card.Title>
                <h1 style={{ textAlign: "center" }}>Update Product</h1>
                <br />
              </Card.Title>
              <Card.Body >
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
                        src={`http://localhost:4500/img/${proData.image}`}
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
                       <b>Name</b>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        id="fullName"
                        // defaultValue={}
                        {...register("name")}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    
                      <b>Price</b>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="price"
                        className="form-control"
                        id="price"
                        {...register("price")}
                      >
                        {}
                      </input>
                    </div>
                  </div>

                  <div className="row mb-3">
                     <b>Strike</b>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="strike"
                        type="text"
                        className="form-control"
                        id="strike"
                        // defaultValue={}
                        {...register("strike")}
                      />
                    </div>
                  </div>

              

                  <div className="row mb-3">
                      <b>quality:</b>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="quality"
                        type="text"
                        className="form-control"
                        id="quality"
                        // defaultValue={}
                        {...register("quality")}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                      <b>role:</b>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="role"
                        type="text"
                        className="form-control"
                        id="role"
                        // defaultValue={}
                        {...register("role")}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                      <b>subcategory</b>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="subcategory"
                        type="text"
                        className="form-control"
                        id="subcategory"
                        // defaultValue={}
                        {...register("subcategory")}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                      <b>size</b>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="size"
                        type="text"
                        className="form-control"
                        id="size"
                        // defaultValue={}
                        {...register("size")}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                      <b>about:</b>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="about"
                        type="text"
                        className="form-control"
                        id="about"
                        // defaultValue={}
                        {...register("about")}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                      <b>brand:</b>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="brand"
                        type="text"
                        className="form-control"
                        id="brand"
                        // defaultValue={}
                        {...register("brand")}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                      <b>color :</b>  
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="color"
                        type="text"
                        className="form-control"
                        id="color"
                        // defaultValue={}
                        {...register("color")}
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
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Updatepage;
