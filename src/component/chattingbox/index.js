import React, { useEffect, useState } from "react";
import "./style.css";
import Messagebox from "./Messagebox";
import { GrEmoji } from "react-icons/gr";
import { AiOutlineCamera } from "react-icons/ai";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const Chattingbox = () => {
  const activeChat = useSelector((state) => state.active.activeState);
  const user = useSelector((users) => users.login.loggedIn);
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const db = getDatabase();

  const handleMsgSend = () => {
    if (activeChat?.status == "single") {
      set(push(ref(db, "singleMsg")), {
        whosendid: user.uid,
        whosendname: user.displayName,
        whoreciveid: activeChat?.id,
        whorecivename: activeChat?.name,
        msg: msg,
        date: `${new Date().getFullYear()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()} - ${new Date().getHours()} - ${new Date().getMinutes()}`,
      });
    } else {
      console.log("this is just for grp msg");
    }
  };

  const handleEnterPress = (e) => {
    if (e.key == "Enter") {
      handleMsgSend();
    }
  };

  useEffect(() => {
    const starCountRef = ref(db, "singleMsg");
    onValue(starCountRef, (snapshot) => {
      let msgArr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whosendid == user.uid &&
            item.val().whoreciveid == activeChat?.id) ||
          (item.val().whoreciveid == user.uid &&
            item.val().whosendid == activeChat?.id)
        ) {
          msgArr.push(item.val());
        }
      });
      setMsgList(msgArr);
    });
  }, [activeChat?.id]);

  console.log(msgList);
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
            <h3>{activeChat?.name}</h3>
            <span>Online</span>
          </div>
        </div>
        <div className="msg-box">
          <Messagebox msgList={msgList} />
        </div>
        <div className="bottom-msg-part">
          <div className="msg-input-box">
            <div className="inner-msg-input">
              <input
                type="text"
                placeholder="Message"
                onChange={(e) => setMsg(e.target.value)}
                onKeyUp={handleEnterPress}
              />
            </div>
          </div>
          <div className="emoji">
            <GrEmoji />
          </div>
          <div className="camera">
            <AiOutlineCamera />
          </div>
          <div className="msg-send-btn">
            <Button variant="contained" onClick={handleMsgSend}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chattingbox;
