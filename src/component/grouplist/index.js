import React from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "@mui/material/Button";

const Grouplist = () => {
  return (
    <>
      <div className="grouplist">
        <div className="grouplist_header">
          <h2>Group Lists</h2>
          <div className="grouplist_searchBoxes">
            <AiOutlineSearch />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="grouplist_body">
          <div className="grouplist_wrapper">
            <div className="groupList_img">
              <img src="/assets/avatar.png" alt="avatr" />
            </div>
            <div className="groupList_titles">
              <h4>MERN Soldier</h4>
              <span>Think twice code once!</span>
            </div>
            <div className="groupList_join">
              <Button variant="outlined">Join</Button>
            </div>
          </div>
          <div className="grouplist_wrapper">
            <div className="groupList_img">
              <img src="/assets/avatar.png" alt="avatr" />
            </div>
            <div className="groupList_titles">
              <h4>MERN Soldier</h4>
              <span>Think twice code once!</span>
            </div>
            <div className="groupList_join">
              <Button variant="outlined">Join</Button>
            </div>
          </div>
          <div className="grouplist_wrapper">
            <div className="groupList_img">
              <img src="/assets/avatar.png" alt="avatr" />
            </div>
            <div className="groupList_titles">
              <h4>MERN Soldier</h4>
              <span>Think twice code once!</span>
            </div>
            <div className="groupList_join">
              <Button variant="outlined">Join</Button>
            </div>
          </div>
          <div className="grouplist_wrapper">
            <div className="groupList_img">
              <img src="/assets/avatar.png" alt="avatr" />
            </div>
            <div className="groupList_titles">
              <h4>MERN Soldier</h4>
              <span>Think twice code once!</span>
            </div>
            <div className="groupList_join">
              <Button variant="outlined">Join</Button>
            </div>
          </div>
          <div className="grouplist_wrapper">
            <div className="groupList_img">
              <img src="/assets/avatar.png" alt="avatr" />
            </div>
            <div className="groupList_titles">
              <h4>MERN Soldier</h4>
              <span>Think twice code once!</span>
            </div>
            <div className="groupList_join">
              <Button variant="outlined">Join</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grouplist;
