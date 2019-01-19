import React from "react";

const Signup = ({ renderInput, handleSubmit, renderSelect }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {renderInput("name", "Name")}
        {renderInput("email", "Email")}
        {renderInput("password", "Password", "password")}
        {renderSelect("type", "Type", ["client", "company"])}
        <button className="btn btn-primary">SignUp </button>
      </form>
    </div>
  );
};

export default Signup;
