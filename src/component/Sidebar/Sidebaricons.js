import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillGearFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Sidebaricons = () => {
  return (
    <div className="sidebar_icons">
      <NavLink className="profile_icons" to="/">
        <AiOutlineHome />
      </NavLink>
      <NavLink className="profile_icons" to="/message">
        <BiMessageAlt />
      </NavLink>
      <div className="profile_icons">
        <IoMdNotificationsOutline />
      </div>
      <NavLink to="/acountsetting" className="profile_icons">
        <BsFillGearFill />
      </NavLink>
    </div>
  );
};

export default Sidebaricons;
