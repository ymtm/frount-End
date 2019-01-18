import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      <h1>your name is {user ? user.name : ""}</h1>
      <hr />
      <h1>your email is {user ? user.email : ""}</h1>
    </div>
  );
};

export default Profile;