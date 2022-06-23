import React from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const Login = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [validasi, setValidasi] = useState("");

  const handleChange = (e) => {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  };

  const handleSubmit = () => {
    if (user.username.length === 0) {
      setValidasi("Username Can't be Empty!");
    } else if (user.username !== "Ibnulsyam") {
      setValidasi("Username Isn't Correct!");
    } else if (user.password.length === 0) {
      setValidasi("Password Can't be Empty!");
    } else if (user.password !== "Ibnul1996") {
      setValidasi("Password Isn't Correct!");
    } else {
      props.onHide();
      setValidasi("");
      props.login();
      setUser({ username: "", password: "" });
    }
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {validasi ? (
          <p style={{ color: "red", fontStyle: "italic" }}>*{validasi}</p>
        ) : (
          ""
        )}
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Username :</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="input.."
              autoFocus
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              name="password"
              type="password"
              required
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="dark" onClick={handleSubmit}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
