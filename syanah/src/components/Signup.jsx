import React from "react";

const Signup = ({ renderInput, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
      {/* <select name="Company or Clint" value={this.state.user_type} onChange={this.handleChange}>
                        <option selected value= "clint" >clint</option>
                        <option value= "company" >company</option> */}
                    {/* </select><br/> */}
        {renderInput("name", "Name")}
        {renderInput("email", "Email")}
        {renderInput("password", "Password", "password")}
        <button className="btn btn-primary">SignUp </button>
      </form>
    </div>
  );
};

export default Signup;