import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "@mui/material/Button";
import "./style.css";

const Friendrequst = () => {
  return (
    <div className="friendrequestlist">
      <div className="friendrequestlist_header">
        <h2>Friendrequest Lists</h2>
        <div className="friendrequestlist_searchBoxes">
          <AiOutlineSearch />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="friendrequestlist_body">
        <div className="friendrequestlist_wrapper">
          <div className="friendrequestlist_img">
            <img src="/assets/avatar.png" alt="avatr" />
          </div>
          <div className="friendrequestlist_titles">
            <h4>Shawon islam</h4>
          </div>
          <div className="friendrequestlist_join">
            <Button variant="outlined">Accept</Button>
            <Button variant="outlined" color="error">
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friendrequst;
