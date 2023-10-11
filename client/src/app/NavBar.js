"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  Offcanvas,
  NavDropdown,
} from "react-bootstrap";
import "./style/nav.css";
import "./style/toggle.css";
import { deleteCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import "./style/footer.css";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Parse user and mailuser from localStorage
  let user = JSON.parse(window.localStorage.getItem("user"));
  let mailuser = JSON.parse(window.localStorage.getItem("mailuser"));
  let admin = JSON.parse(window.localStorage.getItem("admin"));

  const router = useRouter();

  const handelprofile = (id) => {
    router.push(`/components/profile/${id}`);
  };

  const Logout = () => {
    window.localStorage.clear();
    deleteCookie("logged");
    router.push("/");
    router.refresh();
  };

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.clear();
      deleteCookie("logged");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <Navbar className="nav bar " expand="md">
        <Container
          fluid
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
          }}
        >
          <Navbar.Brand style={{ color: "white", fontSize: "xx-large" }}>
            Next Cart.com
          </Navbar.Brand>
          <i
            className="bi bi-list toggle-sidebar-btn clr"
            style={{ fontSize: "xx-large" }}
            onClick={handleShow}
          ></i>

          <Navbar.Collapse
            className="justify-content-end"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {/* Render user dropdown if user is authenticated */}
            {user ? (
              <>
                <Dropdown align={{ lg: "start" }}>
                  <Dropdown.Toggle
                    style={{
                      display: "contents",
                      background: "rgba(0,212,255,1)",
                      border: "rgba(0,212,255,1)",
                    }}
                    id="dropdown-basic"
                  >
                    <img
                      src={`http://localhost:4500/img/${user.image}`}
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                      alt=""
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item>
                      <i className="bi bi-person"></i>
                      {user.name}
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <i className="bi bi-phone"></i>
                      {user.mobile}
                    </Dropdown.Item>
                    <NavDropdown.Divider />
                    <Dropdown.Item
                      onClick={() => {
                        handelprofile(user._id);
                      }}
                    >
                      <i className="bi bi-gear"></i>Account Setting
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        Logout();
                      }}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      LogOut
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : mailuser ? (
              <>
                <Dropdown align={{ lg: "start" }}>
                  <Dropdown.Toggle
                    style={{
                      display: "contents",
                      background: "rgba(0,212,255,1)",
                      border: "rgba(0,212,255,1)",
                    }}
                    id="dropdown-basic"
                  >
                    <img
                      src={`http://localhost:4500/img/${mailuser.image}`}
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                      alt=""
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Item>
                      <i className="bi bi-person"></i>
                      {mailuser.name}
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <i className="bi bi-phone"></i>
                      {mailuser.mobile}
                    </Dropdown.Item>
                    <NavDropdown.Divider />
                    <Dropdown.Item
                      onClick={() => {
                        handelprofile(mailuser._id);
                      }}
                    >
                      <i className="bi bi-gear"></i>Account Setting
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      LogOut
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : admin ? (
              <>
                <Dropdown align={{ lg: "start" }}>
                  <Dropdown.Toggle
                    style={{
                      display: "contents",
                      background: "rgba(0,212,255,1)",
                      border: "rgba(0,212,255,1)",
                    }}
                    id="dropdown-basic"
                  >
                    <img
                      src="assets/img/abhi.jpg"
                      alt=""
                      height="50px"
                      style={{ borderRadius: "50%" }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Item>
                      <i className="bi bi-person"></i>
                      {admin.name}
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <i className="bi bi-phone"></i>
                      {admin.mobile}
                    </Dropdown.Item>
                    <NavDropdown.Divider />
                    <Dropdown.Item
                      onClick={() => {
                        handelprofile(admin.id);
                      }}
                    >
                      <i className="bi bi-gear"></i>Account Setting
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        Logout();
                      }}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      LogOut
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              ""
            )}
          </Navbar.Collapse>
          <Offcanvas
            className="navs"
            style={{ display: "block", width: "250px" }}
            show={show}
            backdrop={true}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <h3 className="clr"> NextCart Pages</h3>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {admin ? (
                <>
                  <b>
                    <Nav className="mb-2">
                      <Link href="/" className="decoration">
                        <i className="bi bi-card-list"></i> &nbsp;Dashboard
                      </Link>
                    </Nav>
                  </b>
                  <b>
                    <Nav className="mb-3">
                      <Link
                        href="/components/showtransaction"
                        className="decoration"
                      >
                        <i className="bi bi-card-list"></i>{" "}
                        &nbsp;ShowTransaction
                      </Link>
                    </Nav>
                  </b>
                  <b>
                    <Nav className="mb-3">
                      <Link
                        href="/components/showfeedback"
                        className="decoration"
                      >
                        <i className="bi bi-card-list"></i> &nbsp;ShowFeedback
                      </Link>
                    </Nav>
                  </b>
                </>
              ) : (
                <b>
                  <Nav className="mb-2">
                    <Link href="/" className="decoration">
                      <i className="bi bi-card-list"></i> &nbsp;Home
                    </Link>
                  </Nav>
                </b>
              )}
              {admin || user || mailuser ? (
                <>
                  <b>
                    <Nav className="mb-3">
                      <Link
                        href="/components/babysproduct"
                        className="decoration"
                      >
                        <i className="bi bi-card-list"></i> &nbsp;child Section
                      </Link>
                    </Nav>
                  </b>
                  <b>
                    <Nav className="mb-3">
                      <Link
                        href="/components/mensproduct"
                        className="decoration"
                      >
                        <i className="bi bi-card-list"></i> &nbsp;Men's Section
                      </Link>
                    </Nav>
                  </b>
                  <b>
                    <Nav className="mb-3">
                      <Link
                        href="/components/womensproduct"
                        className="decoration"
                      >
                        <i className="bi bi-card-list"></i> &nbsp;Women's
                        Section
                      </Link>
                    </Nav>
                  </b>
                  <b>
                    <Nav className="mb-3">
                      <Link href="/components/addtocart" className="decoration">
                        <i className="bi bi-card-list"></i> &nbsp;My Cart
                      </Link>
                    </Nav>
                  </b>
                  <b>
                    <Nav className="mb-3">
                      <Link
                        href="/components/showlikeproduct"
                        className="decoration"
                      >
                        <i className="bi bi-card-list"></i> &nbsp;Like Product's
                      </Link>
                    </Nav>
                  </b>
                </>
              ) : (
                <>
                  <Nav className="mb-3">
                    <Link href="/components/login" className="decoration">
                      <i className="bi bi-card-list"></i> &nbsp;User Login
                    </Link>
                  </Nav>

                  <Nav className="mb-3">
                    <Link href="/components/register" className="decoration">
                      <i className="bi bi-card-list"></i> &nbsp;Register User
                    </Link>
                  </Nav>
                  <Nav className="mb-3">
                    <Link href="/components/admin" className="decoration">
                      <i className="bi bi-card-list"></i> &nbsp;Admin Login
                    </Link>
                  </Nav>
                </>
              )}
              <b>
                <Nav className="mb-3">
                  <Link href="/components/contactus" className="decoration">
                    <i className="bi bi-card-list"></i> &nbsp;Contact us
                  </Link>
                </Nav>
              </b>
              <b>
                <Nav className="mb-3">
                  <Link href="/components/aboutus" className="decoration">
                    <i className="bi bi-card-list"></i> &nbsp;About us
                  </Link>
                </Nav>
              </b>
              <b>
                <Nav className="mb-3">
                  <Link href="/components/return" className="decoration">
                    <i className="bi bi-card-list"></i> &nbsp;Return Policy
                  </Link>
                </Nav>
              </b>
              <b>
                <Nav className="mb-3">
                  <Link href="/components/feedback" className="decoration">
                    <i className="bi bi-card-list"></i> &nbsp;Feedback
                  </Link>
                </Nav>
              </b>
              <b>
                <Nav className="mb-3">
                  <Link href="/components/termofuse" className="decoration">
                    <i className="bi bi-card-list"></i> &nbsp;Terms of Use
                  </Link>
                </Nav>
              </b>
              <b>
                <Nav className="mb-3">
                  <Link href="/components/security" className="decoration">
                    <i className="bi bi-card-list"></i> &nbsp;Security
                  </Link>{" "}
                </Nav>
              </b>

              <b>
                <Nav className="mb-3">
                  <Link href="/components/faq" className="decoration">
                    <i className="bi bi-card-list"></i> &nbsp;FAQ
                  </Link>
                </Nav>
              </b>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
