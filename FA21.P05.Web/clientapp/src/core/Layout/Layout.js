import React from "react";
import "./Layout.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  return (
    <div>
      <div className="jumbotron">
        <h2 style={{ letterSpacing: "0.8em", marginTop: "50px" }}>{title}</h2>
        <p className="lead" style={{ textTransform: "capitalize", fontSize:"25px" }}>
          {description} !
        </p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
