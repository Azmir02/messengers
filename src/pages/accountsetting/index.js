import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import AccountForm from "./AccountForm";
import Switch from "@mui/material/Switch";

const AccountSeting = () => {
  const user = useSelector((users) => users.login.loggedIn);
  return (
    <>
      <div className="theme_switch">
        <Switch />
      </div>
      <div className="account_info">
        <div className="account_info_box">
          <div className="profile_picture">
            <img src={user?.photoURL} alt="profile_photo" />
          </div>
          <AccountForm />
        </div>
      </div>
    </>
  );
};

export default AccountSeting;
