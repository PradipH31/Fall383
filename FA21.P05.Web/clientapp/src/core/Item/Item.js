import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import ItemCards from "../../components/ItemCards/ItemCards";
import { readProduct } from "../apiCore";

const Item = (props) => {
  const [item, setItem] = useState({});
  const [error, setError] = useState(false);

  const loadSingleItem = (itemId) => {
    readProduct(itemId).then((data) => {
      if (data.error) setError(data.error);
      else setItem(data);
    });
  };

  useEffect(() => {
    const itemId = props.match.params.itemId;
    loadSingleItem(itemId);
  }, []);

  return (
    <Layout
      title={item && item.name}
      description={
        item && item.description && item.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="d-flex justify-content-md-center align-items-center vh-100">
        {item && item.description && (
          <div>
            <ItemCards items={item} />
          </div>
        )}
      </div>{" "}
    </Layout>
  );
};

export default Item;
