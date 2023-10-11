"use client"

import axios from "axios";
import { Field, Formik,Form, ErrorMessage } from "formik"
import { useParams, useRouter } from "next/navigation";
import { Card, Col, Container, Row } from "react-bootstrap"
import { toast } from "react-toastify";
import * as yup from "yup";
import Footer from "@/app/footer";


const schema = yup.object().shape({
    password: yup
      .string()
      .required("password is required")
      .min(4, "password must be 4 char long")
      .max(6, "password can't be more long then 6 char"),
  });


export default function Resetpassword(){
    const params = useParams()
    const router = useRouter();

    const id = params.resetpassword[1]
    const token = params.resetpassword[2]
    // 
    // 

    const validationSchema = schema;

  const initialValues = {
    password: "",
  };

  const onSubmit = (data) => {
    console.log(data)
    axios
      .post(`http://localhost:4500/user/resetpassword/${id}/${token}`, data)
      .then((res) => {
        console.log(res.data)
        const result = res.data
        if (result.status === "success") {
          toast.success('reset password successfully');
          router.push("/");
        }

      }).catch((error) => {
        console.log(error)
        toast.error(error)
      })
  }


    return(
        <>
        <Container>
            <Row>
                <Col></Col>
                <Col className="mt-5">
                    <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}>
                  <Card>
                    <Card.Title><h1>Reset Your Password</h1></Card.Title>
                    <h3>Please Enter New Password</h3>
                    <Form>
                    <Card.Body>
                    Password :
                    <p>
                      <Field
                        type="password"
                        name="password"
                        placeholder="enter password"
                        className="form-control"
                      />
                    </p>
                    <p className="color">
                      <ErrorMessage name="password" />
                    </p> 
                    </Card.Body>
                    <Card.Footer>
                    <p>
                        <Field
                          type="submit"
                          value="Change Password"
                          className="btn btn-info form-control"
                        />
                      </p>
                    </Card.Footer>
                    </Form>
                  </Card>
                    </Formik>
                </Col>
                <Col></Col>
            </Row>
        </Container>
        <Footer/>
        </>
    )
}