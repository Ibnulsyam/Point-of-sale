import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddProduct from "../AddProduct";
import "../../style/style.css";
import Login from "../login/Login";

const Navigasi = (props) => {
  const [addItem, setAddItem] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <AddProduct
          onSubmit={props.add}
          show={addItem}
          onHide={() => setAddItem(false)}
        />
        <Login
          show={login}
          onHide={() => setLogin(false)}
          login={props.login}
        />
        <Navbar.Brand className="link">
          <Link to="/">Point Of Sale</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto link ">
            <button className="btn-modal" onClick={() => setAddItem(true)}>
              Add Product
            </button>
            {props.isLogin ? (
              <button className="btn-modal" onClick={() => props.logout()}>
                Logout
              </button>
            ) : (
              <button className="btn-modal" onClick={() => setLogin(true)}>
                Login
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
        <input
          className="search"
          type="text"
          name="search"
          placeholder="search..."
          onChange={props.search}
        />
      </Container>
    </Navbar>
  );
};

export default Navigasi;
