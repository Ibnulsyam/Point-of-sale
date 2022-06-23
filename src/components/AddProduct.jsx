import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import swal from "sweetalert";

const AddProduct = (props) => {
  const [productControl, setProductControl] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    image_url: "",
  });

  const [empty, setEmpty] = useState("");

  const handleChange = (e) => {
    let newPoductControl = { ...productControl };
    newPoductControl[e.target.name] = e.target.value;
    setProductControl(newPoductControl);
  };

  const handleSubmit = () => {
    if (productControl.name.length === 0) {
      setEmpty("Product Name can't be Empty!");
    } else if (productControl.description.length === 0) {
      setEmpty("Description Can't be Empty!");
    } else if (productControl.price < 5) {
      setEmpty("Price Can't be Empty!");
    } else if (productControl.image_url.length === 0) {
      setEmpty("Image Can't be Empty!");
    } else if (
      productControl.name.length > 0 &&
      productControl.description.length > 0 &&
      productControl.price >= 5 &&
      productControl.image_url.length > 0
    ) {
      setEmpty("");
      props.onSubmit(productControl);
      props.onHide();
      setProductControl({
        name: "",
        description: "",
        price: 0,
        image_url: "",
      });
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {empty ? (
          <p style={{ color: "red", fontStyle: "italic" }}>*{empty}</p>
        ) : (
          ""
        )}
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Product Name :</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="input.."
              autoFocus
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description :</Form.Label>
            <Form.Control
              name="description"
              type="text"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price :</Form.Label>
            <Form.Control name="price" type="number" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image_url :</Form.Label>
            <Form.Control
              name="image_url"
              type="text"
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
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProduct;
