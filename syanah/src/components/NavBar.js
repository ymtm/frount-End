import React from "react";

const NavBar = ({ user, changeForm, logout, renderCompanies }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand"> <h1>SYANA</h1></div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {// if the user is not authenticated
          !user && (
            <React.Fragment>
              <li
                className="nav-item active"
                onClick={() => changeForm("login")}
              >
                <div className="nav-link">Login</div>
              </li>
              <li
                className="nav-item active"
                onClick={() => changeForm("signup")}
              >
                <div className="nav-link">Signup</div>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <li className="nav-item active" onClick={() => logout()}>
                <div className="nav-link">Logout</div>
              </li>
              <li className="nav-item active" onClick={() => renderCompanies()}>
                <div className="nav-link">Companies</div>
              </li>
            </React.Fragment>
          )
          // if the user authenticated
          }
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;