import React from "react";
import { Table } from "react-bootstrap";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalPrice } = props;
  return (
    <div ref={ref}>
      <Table className="table ">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
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
                </tr>
              ))
            : " "}
        </tbody>
      </Table>
      <h2 className="px-2 ">Total Price : Rp.{totalPrice}</h2>
    </div>
  );
});
