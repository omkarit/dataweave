import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineMenu } from "react-icons/ai";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import FiLogOut from "react-icons/fi";
import "./Sidebar.css";
const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#">
            {" "}
            <AiOutlineMenu
              onClick={handleShow}
              className="sidebar-button"
              style={{ marginLeft: "-80px" }}
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <Offcanvas.Title>Dashboard</Offcanvas.Title>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Sidebar;
