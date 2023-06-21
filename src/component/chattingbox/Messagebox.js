import React from "react";

const Messagebox = () => {
  return (
    <>
      <div className="message-box">
        <div className="right-chatting">
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
        </div>
      </div>
    </>
  );
};

export default Messagebox;
