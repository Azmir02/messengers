import React from "react";
import "./style.css";
import Sidebaricons from "./Sidebaricons";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_wrapper">
          <div className="profile_details">
            <div className="profile_picture">
              <picture>
                <img src="/assets/profilepicture.jpg" alt="profilepic" />
              </picture>
              <div className="profile_opverlay">
                <AiOutlineCloudUpload />
              </div>
            </div>
            <h4>Azmir uddin</h4>
          </div>
          <div className="profiles_icons">
            <Sidebaricons />
          </div>
          <div className="logout">
            <BiLogOut />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
