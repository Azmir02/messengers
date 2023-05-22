import React from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "@mui/material/Button";

const Friends = () => {
  return (
    <div className="friends">
      <div className="friends_header">
        <h2>Friend's Lists</h2>
        <div className="friends_searchBoxes">
          <AiOutlineSearch />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="friends_body">
        <div className="friends_wrapper">
          <div className="friends_img">
            <img src="/assets/avatar.png" alt="avatr" />
          </div>
          <div className="friends_titles">
            <h4>Shawon islam</h4>
          </div>
          <div className="friends_join">
            <Button variant="outlined" color="error">
              Block
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
