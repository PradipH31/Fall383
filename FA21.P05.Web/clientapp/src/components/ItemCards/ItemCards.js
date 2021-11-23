import React, { useState } from "react";
import "./ItemCards.css";
import { Link, Redirect } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";
import moment from "moment";
import { addItem, updateItem, removeItem } from "../../core/helpers/cartHelper";

const ItemCards = ({
  items,
  showViewItemButton = true,
  showCartButton = true,
  cartUpdate = false,
  showRemoveButton = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(items.count);

  const showItemButton = (showViewItemButton) => {
    return (
      showViewItemButton && (
        <Link to={`/item/${items.id}`}>
          <button className="btn btn-danger mt-2 mb-2">View Item</button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(items, () => {
      setRedirect(true);
    });
  };

  const redirectToCart = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartButton = (showCartButton) => {
    return (
      showCartButton && (
        <button onClick={addToCart} className="btn btn-warning mt-2 mb-2">
          Add To Cart
        </button>
      )
    );
  };

  const showRemoveCartButton = (showRemoveButton) => {
    return (
      showRemoveButton && (
        <button
          onClick={() => removeItem(items.id)}
          className="btn btn-danger mt-2 mb-2"
        >
          Remove
        </button>
      )
    );
  };

  const handleChange = (itemId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(itemId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className="input-group mt-2 mb-2" style={{ width: "30%" }}>
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleChange(items.id)}
          />
        </div>
      )
    );
  };

  return (
    <div className="card">
      <div
        className="card-header name"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>{items.name}</div>
        <div>
          {" "}
          {items.isSpecial ? (
            <AiTwotoneStar size={"1em"} fill="#ffffff" />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="card-body px-4">
        {redirectToCart(redirect)}
        <div className="product-img">
          <img
            src={items.imageLink}
            alt={items.name}
            className="mb-3"
            style={{
              display: "block",
              width: "100%",
              height: "300px",
            }}
          />
          <p className="lead mt-2">{items.description.substring(0, 100)}</p>
          <p style={{ color: "#e01e00" }} className="black-8">
            $ {items.price}
          </p>
          {showCartButton ? (
            <p className="black-9">{moment(items.createdAt).fromNow()}</p>
          ) : (
            <></>
          )}
        </div>

        <div className="d-flex justify-content-between">
          {showItemButton(showViewItemButton)}
          {showAddToCartButton(showCartButton)}
          {showRemoveCartButton(showRemoveButton)}
          {showCartUpdateOptions(cartUpdate)}
        </div>
      </div>
    </div>
  );
};

export default ItemCards;
