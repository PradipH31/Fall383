import React, { useState } from "react";
import Layout from "../../core/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [succces, setSuccess] = useState(false);

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(true);
    toast.success(`Category ${name} has been created.`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const returnBack = () => (
    <>
      <button className="btn btn-danger">
        <Link
          to="/admin/dashboard"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Back
        </Link>
      </button>
    </>
  );

  const newCategoryForm = () => {
    return (
      <form onSubmit={(e) => submitForm(e)}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => handleChange(e)}
            value={name}
            autoFocus
          ></input>
        </div>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <button className="btn btn-outline-primary"> Create</button>
          </div>
          <div>{returnBack()}</div>
        </div>
      </form>
    );
  };

  return (
    <>
      <ToastContainer />
      <Layout
        title="Add a New Category"
        description={`Good Day Admin, ready to add a category?`}
      >
        <div className="row">
          <div className="col-md-8 offset-md-2">{newCategoryForm()}</div>
        </div>
      </Layout>
    </>
  );
};

export default AddCategory;
