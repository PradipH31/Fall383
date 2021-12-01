import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../core/Layout/Layout";

const AdminDashBoard = () => {
  const [orderTotal, setOrderTotal] = useState(0)
  useEffect(() => {
    fetch('/api/orders/total')
      .then(res => res.json())
      .then((result) => {
        setOrderTotal(result.total)
      })
    console.log(orderTotal)
  }, [orderTotal])
  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header"> Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/menu-item">
              Create Item
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header"> Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item">Admin</li>
          <li className="list-group-item">admin@selu.edu</li>
          <li className="list-group-item">Role = "Admin"</li>
          <li className="list-group-item">Total Revenue: ${orderTotal}</li>
        </ul>
      </div>
    );
  };
  return (
    <Layout
      title="Dashboard"
      description={`Good Day Admin`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashBoard;
