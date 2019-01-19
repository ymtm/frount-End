import React, { Component } from "react";
import Input from "./Input";
import Login from "./Login";
import Signup from "./Signup";
import Select from "./Select";

import { setJwt, getUser } from "../services/authService";

class AuthForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        // user_type:"",
        email: "",
        password: "",
        name: "",
        type: ""
      }
    };
  }

  handleRequest(user) {
    let apiUrl = "http://localhost:3000/auth";

    apiUrl += this.props.form === "signup" ? "/users" : "/";
    console.log(apiUrl);
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setJwt(data.token);
        const user = getUser(data.token);
        this.props.onLogin();
        this.props.chechWhoUser(user.usertype);
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.handleRequest(this.state.data);
  };

  handleChange = ({ currentTarget: input }) => {
    console.log("input.value\n\n ", input.value);
    const data = { ...this.state.data };
    data[input.name] = input.value;
    // data[select.options] = select.value;
    this.setState({ data });
    console.log("state data\n\n ", this.state.data);
  };

  renderInput = (name, lable, type = "text") => {
    //user_type=
    const { data } = this.state;
    // const data = this.state.data

    return (
      <Input
        name={name}
        lable={lable}
        type={type}
        value={data[name]}
        // user_type={data[user_type]}
        onChange={this.handleChange}
      />
    );
  };
  renderSelect = (name, lable, options) => {
    const { data } = this.state;
    return (
      <Select
        name={name}
        lable={lable}
        options={options}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  };
  render() {
    return (
      <div>
        {this.props.form === "signup" ? (
          <Signup
            renderInput={this.renderInput}
            handleSubmit={this.handleSubmit}
            userType={this.props.userType}
            renderSelect={this.renderSelect}
          />
        ) : (
          <Login
            renderInput={this.renderInput}
            handleSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

export default AuthForm;
