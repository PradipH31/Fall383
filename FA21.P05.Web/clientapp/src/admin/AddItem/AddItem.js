import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createProduct,
  getCategories,
  getAddOnCategory,
} from "../../core/apiCore";

import { Avatar, CircularProgress } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { CloudUpload } from "@material-ui/icons";

import "./AddItem.css";

const AddItem = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    addon: "",
    addOnCategories: [],
    isSpecial: false,
    imageLink: "",
    loading: false,
    error: "",
  });
  const {
    name,
    description,
    price,
    categories,
    category,
    addon,
    isSpecial,
    imageLink,
    addOnCategories,
    loading,
    error,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (error) {
        setValues({ ...values, error: data.error });
        toast.error("Categories has not been fetched!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setValues({
          ...values,
          error: "",
          categories: data,
        });
      }
    });
  };

  const init2 = () => {
    getAddOnCategory().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        alert("Error fetching add on category");
      } else {
        setValues({ ...values, error: "", addOnCategories: data });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init2();
  }, []);

  const handleChange = (name) => (event) => {
    const value =
      name === "imageLink" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct({ name, description, imageLink, price, isSpecial }).then(
      (data) => {
        if (error) {
          setValues({ ...values, error: data.error });
          toast.error(`${name} could not created!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            imageLink: "",
            price: "",
            loading: false,
          });
        }
      }
    );
  };

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <CircularProgress color="secondary" />
      </div>
    );

  const newItemForm = () => {
    return (
      <form className="mb-2" onSubmit={onSubmit}>
        <div className="form-group d-flex justify-content-center">
          <Avatar className="avatar">
            <FontAwesomeIcon style={{ color: "#ab2402" }} icon={faUserCheck} />
          </Avatar>
        </div>
        <div className="form-group">
          <label className="btn btn-secondary d-flex p-2">
            <CloudUpload />
            <input
              onChange={handleChange("imageLink")}
              type="file"
              name="imageLink"
              accept="image/*"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            onChange={handleChange("description")}
            className="form-control"
            value={description}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            value={price}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Category</label>
          <select onChange={handleChange("category")} className="form-control">
            <option>Please Select One</option>
            {categories &&
              categories.map((c, i) => (
                <option key={i} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Add On</label>
          <select onChange={handleChange("addon")} className="form-control">
            <option>Please Select One</option>
            {addOnCategories &&
              addOnCategories.map((c, i) => (
                <option key={i} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">Special</label>
          <select onChange={handleChange("isSpecial")} className="form-control">
            <option>Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <button className="btn btn-outline-primary">Create Item</button>
      </form>
    );
  };

  return (
    <div className="AddItem">
      <ToastContainer />
      <Layout
        title="Add New Food Item"
        description={`Good Day Admin, ready to add an Item?`}
      >
        <div className="row">
          <div className="container d-flex justify-content-center">
            {newItemForm()}
            {showLoading()}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AddItem;
