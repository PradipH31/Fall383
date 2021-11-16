import React from "react";
import "./ItemCards.css";
import { Link } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";
import { AiTwotoneStar } from "react-icons/ai";
const ItemCards = ({ items }) => {
  return (
    <div className="col-4 mb-3">
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
              margin: "auto",
              maxHeight: "auto",
              maxWidth: "100%",
            }}
          />
        </div>
        <div className="card-body px-4">
          <p>{items.description}</p>
          <p style={{ color: "#e01e00" }}>$ {items.price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary mt-2 mb-2">
              View {items.name}
            </button>
            <button className="btn btn-outline-secondary mt-2 mb-2">
              <BsFillCartPlusFill fill="#152b01" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCards;
