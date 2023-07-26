import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import AccountForm from "./AccountForm";
import Switch from "@mui/material/Switch";
import { Thememode } from "../../feature/Slice/themeSlice";

const AccountSeting = () => {
  const theme = useSelector((themes) => themes.themeChange.DarkMode);
  const user = useSelector((users) => users.login.loggedIn);
  const dispatch = useDispatch();

  const handleTheme = (e) => {
    if (e.target.checked) {
      dispatch(Thememode(true));
      localStorage.setItem("mode", true);
    } else {
      dispatch(Thememode(false));
      localStorage.setItem("mode", false);
    }
  };
  return (
    <>
      <div className="theme_switch">
        <Switch onChange={handleTheme} checked={theme} />
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
