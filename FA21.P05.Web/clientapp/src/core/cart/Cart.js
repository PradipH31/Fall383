import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { getCartItems } from "../helpers/cartHelper";
import ItemCards from "../../components/ItemCards/ItemCards";
import { Link } from "react-router-dom";

import Checkout from "../checkout/Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  useEffect(() => {
    console.log("MAX DEPTH...");
    setItems(getCartItems());
  }, [run]);

  const showCartItems = (items) => {
    return (
      <div>
        <h2>
          Your cart has{" "}
          <i style={{ color: "#c92800" }}>' {`${items.length}`} '</i> &nbsp;
          items
        </h2>
        <hr className="center-star" data-content="★" />
        {items.map((item, i) => (
          <ItemCards
            key={i}
            items={item}
            showCartButton={false}
            cartUpdate={true}
            showRemoveButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };
  const emptyCart = () => {
    return (
      <>
        <h4>Your cart is empty.</h4>
        <br />
        <div className={"col float-right"}>
          <img
            src={
              "https://i1.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?ssl=1"
            }
            width={520}
            height={350}
            alt="empty cart"
          />
          <Link to={"/menu"}>
            <button
              style={{ letterSpacing: "2px" }}
              className="btn btn-primary pull-right mt-3 mb-3 float-right"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      </>
    );
  };

  return (
    <Layout
      title="Menu Item Cart"
      description={`Manage your cart items. Add, Remove, Checkout, or Continue Shopping.`}
    >
      <div className="container">
        <div className={"row"}>
          <div className={"col-md-offset-2 col-md-6"}>
            {items.length > 0 ? showCartItems(items) : emptyCart()}
          </div>
          <div className={"col-md-6"}>
            <h3
              style={{ letterSpacing: "0.2em", fontWeight: "bold" }}
              className="mb-3"
            >
              Your Checkout Summary
            </h3>
            <p style={{ letterSpacing: "2px" }}>
              Checkout options/shipping address/total/update quantity.
            </p>
            <hr className="center-star" data-content="★" />
            <Checkout items={items} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
