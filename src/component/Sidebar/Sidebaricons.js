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
      <div className="profile_icons">
        <BiMessageAlt />
      </div>
      <div className="profile_icons">
        <IoMdNotificationsOutline />
      </div>
      <div className="profile_icons">
        <BsFillGearFill />
      </div>
    </div>
  );
};

export default Sidebaricons;
