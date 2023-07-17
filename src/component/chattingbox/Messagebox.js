import moment from "moment/moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ModalImage from "react-modal-image";
import { getDatabase, onValue, ref } from "firebase/database";

const Messagebox = ({ msgList, grpMsg, grpMemberLists }) => {
  const activeChat = useSelector((state) => state.active.activeState);
  const user = useSelector((users) => users.login.loggedIn);
  const scrollMsg = useRef(null);

  useEffect(() => {
    scrollMsg?.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgList]);

  return (
    <>
      <div className="message-box">
        {activeChat?.status == "single"
          ? msgList.map((item, i) => (
              <div key={i} ref={scrollMsg}>
                {item.whosendid == user.uid ? (
                  item.msg ? (
                    <>
                      <div className="right-chatting">
                        <div className="right-msg">
                          <p>{item.msg}</p>
                        </div>
                        <div className="right-chat-date">
                          <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : item.img ? (
                    <div className="right-chatting">
                      <div className="right-img-msg">
                        <ModalImage small={item.img} large={item.img} />
                      </div>
                      <div className="right-chat-date">
                        <span>
                          {" "}
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="right-chatting">
                      <div className="right-audio-msg">
                        <audio controls src={item.audio}></audio>
                      </div>
                      <div className="right-chat-date">
                        <span>an hour ago</span>
                      </div>
                    </div>
                  )
                ) : item.msg ? (
                  <>
                    <div className="left-chatting">
                      <div className="left-msg">
                        <p>{item.msg}</p>
                      </div>
                      <div className="left-chat-date">
                        <span>
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    </div>
                  </>
                ) : item.img ? (
                  <div className="left-chatting">
                    <div className="left-img-msg">
                      <ModalImage small={item.img} large={item.img} />
                    </div>
                    <div className="left-chat-date">
                      <span>
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="left-chatting">
                    <div className="left-audio-msg">
                      <audio controls src={item.audio}></audio>
                    </div>
                    <div className="left-chat-date">
                      <span>an hour ago</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          : user?.uid == activeChat?.adminid ||
            grpMemberLists.includes(activeChat?.id + user.uid)
          ? grpMsg.map((item, i) => (
              <div key={i}>
                {item.whosendid == user.uid
                  ? item.whoreciveid == activeChat?.id && (
                      <div className="right-chatting">
                        <div className="right-msg">
                          <p>{item.msg}</p>
                        </div>
                        <div className="right-chat-date">
                          <span>Send by: {item.whosendname}</span>
                        </div>
                        <div className="right-chat-date">
                          <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                        </div>
                      </div>
                    )
                  : item.whoreciveid == activeChat?.id && (
                      <div className="left-chatting">
                        <div className="left-msg">
                          <p>{item.msg}</p>
                        </div>
                        <div className="left-chat-date">
                          <span>Send by:{item.whosendname}</span>
                        </div>
                        <div className="left-chat-date">
                          <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                        </div>
                      </div>
                    )}
              </div>
            ))
          : "vai tumi member na"}
        {/* <div className="right-chatting">
          <div className="right-msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem similique laborum sapiente ipsum at unde commodi a eum
              excepturi error mollitia quidem accusamus illo saepe pariatur
              cumque aperiam odio impedit quasi laboriosam aliquid, atque alias
              aut nisi. Placeat sunt quisquam sint ea fuga voluptatum qui aut
              temporibus quaerat, unde exercitationem.
            </p>
          </div>
          <div className="right-chat-date">
            <span>an hour ago</span>
          </div>
        </div>
        <div className="right-chatting">
          <div className="right-img-msg">
            <img src="../../../assets/dummy.jpg" alt="" />
          </div>
          <div className="right-chat-date">
            <span>an hour ago</span>
          </div>
        </div>
        <div className="right-chatting">
          <div className="right-audio-msg">
            <audio controls autoplay></audio>
          </div>
          <div className="right-chat-date">
            <span>an hour ago</span>
          </div>
        </div>
        <div className="left-chatting">
          <div className="left-msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem similique laborum sapiente ipsum at unde commodi a eum
              excepturi error mollitia quidem accusamus illo saepe pariatur
              cumque aperiam odio impedit quasi laboriosam aliquid, atque alias
              aut nisi. Placeat sunt quisquam sint ea fuga voluptatum qui aut
              temporibus quaerat, unde exercitationem.
            </p>
          </div>
          <div className="left-chat-date">
            <span>an hour ago</span>
          </div>
        </div>
        <div className="left-chatting">
          <div className="left-img-msg">
            <img src="../../../assets/demo2.jpg" alt="" />
          </div>
          <div className="left-chat-date">
            <span>an hour ago</span>
          </div>
        </div>
        <div className="left-chatting">
          <div className="left-audio-msg">
            <audio controls autoplay></audio>
          </div>
          <div className="left-chat-date">
            <span>an hour ago</span>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Messagebox;
