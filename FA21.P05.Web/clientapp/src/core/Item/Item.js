import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import ItemCards from "../../components/ItemCards/ItemCards";
import { readProduct } from "../apiCore";
import { Link } from "react-router-dom";

const Item = (props) => {
  const [item, setItem] = useState({});
  const [error, setError] = useState("");

  const loadSingleItem = (itemId) => {
    readProduct(itemId).then((data) => {
      if (error) setError(data.error);
      else setItem(data);
    });
  };

  useEffect(() => {
    const itemId = props.match.params.itemId;
    loadSingleItem(itemId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const returnBack = () => (
    <>
      <Link to="/menu" style={{ color: "#fff", textDecoration: "none" }}>
        <button className="btn btn-info">Back</button>
      </Link>
    </>
  );

  return (
    <Layout
      title={item && item.name}
      description={item && item.description}
      className="container-fluid"
    >
      <div className="d-flex justify-content-md-center align-items-center vh-100">
        {item && item.description && (
          <div>
            <ItemCards items={item} showViewItemButton={false} />
            <div className="float-right mt-2 mb-2">{returnBack()}</div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Item;
