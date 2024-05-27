import React from "react";

const Error = () => {
  return (
    <React.Fragment>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <h1 className="text-center">404</h1>
          <h3 className="text-center">Sorry, page not found</h3>
          <a data-testid="back-home" href="/" className="btn btn-primary">
            back to home
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Error;
