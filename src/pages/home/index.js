import { Avatar } from "@mui/material";
import { getAuth } from "firebase/auth";
import React from "react";
import "./style.css";

const Home = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  let displayName;
  let email;

  if (user !== null) {
    displayName = user.displayName;
    email = user.email;
  } else {
    displayName = "laksmi santo";
    email = "laksmisanto1998@gmail.com";
  }
  return (
    <>
      <div className="users__container">
        <div className="user__item">
          <h1>Wellcome!!!</h1>
          <div className="user__img">
            <Avatar src="/broken-image.jpg" />
          </div>
          <div className="user__info">
            <h2 className="user__name">{displayName}</h2>
            <h6 className="user__email">{email}</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
