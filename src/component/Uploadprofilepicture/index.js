import React, { useRef } from "react";
import { BsFillImageFill } from "react-icons/bs";
import "./style.css";

const Uploadprofile = () => {
  const profilePic = useRef(null);
  return (
    <>
      <div className="upload_box">
        <input hidden type="file" ref={profilePic} />
        <div className="upload">
          <div
            className="upload_icon"
            onClick={() => profilePic.current.click()}
          >
            <BsFillImageFill />
          </div>
          <p>Upload Photo</p>
        </div>
      </div>
    </>
  );
};

export default Uploadprofile;
