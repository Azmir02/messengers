import React, { useState } from "react";
import "./style.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Button from "@mui/material/Button";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const handleForgetpass = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className="forgotpass_body">
      <div className="forgotpass_box">
        <h3>Reset You Password Via Email</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia at,
          ut odio quae suscipit rerum optio sapiente. Facere, tenetur illum?
        </p>
        <div className="email-box">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Your Email"
          />
          <Button onClick={handleForgetpass} variant="contained">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
