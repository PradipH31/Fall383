import React from "react";
import "./ItemCards.css";
import { Link } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";
const ItemCards = ({ items }) => {
  return (
    <div className="card">
      <div
        className="card-header"
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
            <AiTwotoneStar size={"1em"} fill="#de2100" />
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
        <p>{items.description.substring(0, 20)}</p>
        <p style={{ color: "#e01e00" }}>$ {items.price}</p>
        <Link to={`/item/${items.id}`}>
          <button className="btn btn-outline-primary mt-2 mb-2">
            View {items.name}
          </button>
        </Link>
        <button className="btn btn-outline-secondary mt-2 mb-2">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ItemCards;
