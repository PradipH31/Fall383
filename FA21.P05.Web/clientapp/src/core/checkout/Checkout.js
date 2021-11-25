import React, { useState } from "react";
import "braintree-web";
import BraintreeDropIn from "../BrainTreeDropIn/BrainTreeDropIn";
import { createOrder } from "../../components/actions/orders"

const Checkout = ({ items }) => {
  const [showBrainTreeDropIn, setShowBrainTreeDropIn] = useState(false);
  const getTotal = () => {
    return items.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  var cart = JSON.parse(localStorage.getItem("cart"))
  var orderItems = null
  if (cart !== null) {
    orderItems = cart.map(orderItem => ({
      "menuItemId": orderItem.id,
      "menuItemQuantity": orderItem.count
    }))
  }

  return (
    <div>
      <h4>
        SubTotal: &nbsp;{" "}
        <span style={{ color: "#e32200", fontWeight: "bold" }}>
          ${getTotal()}
        </span>
      </h4>
      <div>
        {items.length > 0 ? (
          <button
            className="btn btn-success mt-2 mb-2"
            style={{ letterSpacing: "2px" }}
            onClick={() => {
              setShowBrainTreeDropIn(true);
            }}
            disabled={showBrainTreeDropIn}
          >
            Go to Checkout
          </button>
        ) : (
          <div
            style={{ letterSpacing: "2px" }}
            className="alert alert-warning mt-2 mb-2"
          >
            Add Something to Cart...
          </div>
        )}
      </div>
      <BraintreeDropIn
        show={showBrainTreeDropIn}
        onPaymentCompleted={() => {
          setShowBrainTreeDropIn(false);
          createOrder(orderItems)
        }}
      />
    </div >
  );
};

export default Checkout;
