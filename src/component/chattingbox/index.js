import React from "react";
import "./style.css";
import Messagebox from "./Messagebox";
import { GrEmoji } from "react-icons/gr";
import { AiOutlineCamera } from "react-icons/ai";
import { Button } from "@mui/material";

const Chattingbox = () => {
  return (
    <>
      <div className="chatting-box">
        <div className="chatbox-top">
          <div className="wrapper-image-top">
            <div className="active-image">
              <img src="../../../assets/dummy.jpg" alt="" />
            </div>
          </div>
          <div className="active-name">
            <h3>Shawon Islam</h3>
            <span>Online</span>
          </div>
        </div>
        <div className="msg-box">
          <Messagebox />
        </div>
        <div className="bottom-msg-part">
          <div className="msg-input-box">
            <div className="inner-msg-input">
              <input type="text" placeholder="Message" />
            </div>
          </div>
          <div className="emoji">
            <GrEmoji />
          </div>
          <div className="camera">
            <AiOutlineCamera />
          </div>
          <div className="msg-send-btn">
            <Button variant="contained">Send</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chattingbox;
