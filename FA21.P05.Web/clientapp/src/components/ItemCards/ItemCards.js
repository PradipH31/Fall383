import React from "react";
import "./ItemCards.css";
import { Link } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";
const ItemCards = ({ items, showViewItemButton = true }) => {
  const showItemButton = (showViewItemButton) => {
    return (
      showViewItemButton && (
        <Link to={`/item/${items.id}`}>
          <button className="btn btn-danger mt-2 mb-2">View Item</button>
        </Link>
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
      </div>
      <div className="card-body px-4">
        <p className="lead mt-2">{items.description.substring(0, 100)}</p>
        <p style={{ color: "#e01e00" }}>$ {items.price}</p>
        <div className="d-flex justify-content-between">
          {showItemButton(showViewItemButton)}

          <button className="btn btn-warning mt-2 mb-2">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCards;
