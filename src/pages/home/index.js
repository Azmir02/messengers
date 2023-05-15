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
      <div>this is home page</div>
    </>
  );
};

export default Home;
