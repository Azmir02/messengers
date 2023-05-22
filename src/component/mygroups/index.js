import React from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";

const Mygroups = () => {
  return (
    <div className="mygrps">
      <div className="mygrps_header">
        <h2>My Groups Lists</h2>
        <div className="mygrps_searchBoxes">
          <AiOutlineSearch />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="mygrps_body">
        <div className="mygrps_wrapper">
          <div className="mygrps_img">
            <img src="/assets/avatar.png" alt="avatr" />
          </div>
          <div className="mygrps_titles">
            <h4>Shawon islam</h4>
          </div>
          <div className="mygrps_date">
            <p>Created at</p>
            <span>24/5/2023</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mygroups;
