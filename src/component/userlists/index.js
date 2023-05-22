import React from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "@mui/material/Button";

const Userlists = () => {
  return (
    <div className="userlists">
      <div className="userlists_header">
        <h2>User's Lists</h2>
        <div className="userlists_searchBoxes">
          <AiOutlineSearch />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="userlists_body">
        <div className="userlists_wrapper">
          <div className="userlists_img">
            <img src="/assets/avatar.png" alt="avatr" />
          </div>
          <div className="userlists_titles">
            <h4>Shawon islam</h4>
          </div>
          <div className="userlists_join">
            <Button variant="outlined">Add friend</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userlists;
