"use client";
import { Card, Col, Container, Row, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "@/app/footer";
import "../../style/login.css";
import { useForm } from "react-hook-form";

export default function TopContainer() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (values) => {
    console.log(values);
    try {
      const image = values.image[0];
      const role = values.role;
      const formData = { image, role };
      console.log(formData);
      axios
        .post("http://localhost:4500/topcontainer/containerupload",formData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      toast.success("product added");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error);
    }
  };

  return (
    <div>
      <Container fluid className="bg-img">
        <Row>
          <Col></Col>
          <Col style={{ margin: "100px" }}>
            <Card style={{ margin: "50px" }}>
              <i>
                <Card.Title
                  style={{
                    textAlign: "center",
                    fontSize: "40px",
                    color: "royalblue",
                  }}
                >
                  Add Image!
                </Card.Title>
              </i>
              <Card.Body>
                <Form
                  encType="multipart/form-data"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <p>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="form-control"
                      {...register("image")}
                    />
                  </p>
                  <p>
                  <select className="form-control" name="role" {...register("role")}>
                    <option value="men">Men's</option>
                    <option value="women">Women's</option>
                    <option value="baby">Baby's</option>
                  </select>
                  </p>
                  <p>
                    <button type="submit" className="btn btn-dark form-control">
                      Add Image
                    </button>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
