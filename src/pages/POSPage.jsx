//Libraries
import { useRef } from "react";
import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";

//Styling
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Circles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Col, Row, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../style/style.css";

//Components
import { ComponentToPrint } from "../components/ComponentToPrint";
import swal from "sweetalert";
import axios from "axios";

const POSPage = (props) => {
  //For Collecting in cart
  const [cart, setCart] = useState([]);
  //Total Price
  const [totalPrice, setTotalPrice] = useState(0);

  const toastOption = {
    autoClose: 400,
    pauseOnHover: true,
    draggable: true,
  };

  const style = {
    margin: "100px ",
    marginLeft: "400px",
  };

  //Jika menambahkan product
  const addProductToCart = async (product) => {
    //Check jika product ditambahkan
    let ifProductInCart = await cart.find((i) => {
      return i.id === product.id;
    });

    if (ifProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Added ${newItem.name} to Cart`, toastOption);
    } else {
      //item tidak dalam cart
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to Cart`, toastOption);
    }
  };

  //Remove product/item from cart
  const removeProduct = async (product) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(newCart);
  };

  const componentRef = useRef();
  //Handle print
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  //Menjumlah total
  useEffect(() => {
    let newTotalPrice = 0;
    cart.forEach((icart) => {
      newTotalPrice = newTotalPrice + parseInt(icart.totalAmount);
    });
    setTotalPrice(newTotalPrice);
  }, [cart]);

  return (
    <div className="container-fluid">
      <Row>
        <Col xs={7} style={{ marginLeft: "100px" }}>
          {props.isLoading ? (
            <div style={style}>
              <Circles
                height="100"
                width="100"
                color="grey"
                ariaLabel="loading"
              />
            </div>
          ) : (
            <Row>
              {/*Card Product  */}
              {props.notFound ? (
                <p style={{ textAlign: "center" }}>RESULT NOT FOUND</p>
              ) : (
                props.list.map((product, key) => (
                  <Card
                    key={key}
                    style={{ width: "12rem", margin: "15px", padding: 0 }}
                  >
                    <Card.Img src={product.image_url} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text
                        style={{
                          color: "grey",
                          fontStyle: "italic",
                          fontSize: "13px",
                        }}
                      >
                        {product.description}
                      </Card.Text>
                      <Card.Text>Rp.{product.price}</Card.Text>
                      <Button
                        onClick={() => addProductToCart(product)}
                        variant="dark"
                      >
                        Buy
                      </Button>
                      {props.login ? (
                        <Button
                          style={{ marginLeft: "10px" }}
                          onClick={() => props.remove(product)}
                          variant="danger"
                        >
                          Remove
                        </Button>
                      ) : (
                        ""
                      )}
                    </Card.Body>
                  </Card>
                ))
              )}
            </Row>
          )}
        </Col>

        <Col xs={4} style={{ marginLeft: "-50px" }}>
          <div style={{ display: "none" }}>
            <ComponentToPrint
              cart={cart}
              totalPrice={totalPrice}
              ref={componentRef}
            />
          </div>

          {totalPrice !== 0 ? (
            <div className="table-responsive bg-dark table-sale">
              <Table className="table table-responsive table-dark table-hover ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart
                    ? cart.map((cartProduct, key) => (
                        <tr key={key}>
                          <td>{cartProduct.id}</td>
                          <td>{cartProduct.name}</td>
                          <td>{cartProduct.price}</td>
                          <td>{cartProduct.quantity}</td>
                          <td>{cartProduct.totalAmount}</td>
                          <td>
                            <Button
                              className="btn-sm"
                              variant="danger"
                              onClick={() => removeProduct(cartProduct)}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))
                    : "No Cart in Item"}
                </tbody>
              </Table>
              <h2 className="px-2 text-white">Total Price : Rp.{totalPrice}</h2>
            </div>
          ) : (
            <div className="cartEmpty">
              <img src={process.env.PUBLIC_URL + "/cart.png"} />
            </div>
          )}

          <div className="mt-3 mb-4 ">
            {totalPrice !== 0 ? (
              <div>
                <div className="d-grid gap-2">
                  <Button
                    className="button-payment"
                    variant="dark"
                    onClick={handlePrint}
                    size="lg"
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            ) : (
              " "
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default POSPage;
