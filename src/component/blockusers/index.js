import React from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "@mui/material/Button";

const Blockuser = () => {
  return (
    <div className="blocked">
      <div className="blocked_header">
        <h2>Blocked Lists</h2>
        <div className="blocked_searchBoxes">
          <AiOutlineSearch />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="blocked_body">
        <div className="blocked_wrapper">
          <div className="blocked_img">
            <img src="/assets/avatar.png" alt="avatr" />
          </div>
          <div className="blocked_titles">
            <h4>Shawon islam</h4>
          </div>
          <div className="blocked_join">
            <Button variant="outlined">Unblock</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blockuser;
