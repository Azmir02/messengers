import React, { useEffect, useState } from "react";
import "./style.css";
import Messagebox from "./Messagebox";
import { GrEmoji, GrAttachment } from "react-icons/gr";
import { AiOutlineCamera, AiOutlineClose } from "react-icons/ai";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { Camera, FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
  uploadString,
} from "firebase/storage";

const Chattingbox = () => {
  const activeChat = useSelector((state) => state.active.activeState);
  const user = useSelector((users) => users.login.loggedIn);
  const [msg, setMsg] = useState("");
  const [openCam, setOpenCam] = useState(false);
  const [msgList, setMsgList] = useState([]);
  const [captureImage, setCaptureImage] = useState("");
  const db = getDatabase();
  const storage = getStorage();

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

  const handleImageUpload = (e) => {
    const storageRef = sref(storage, e.target.files[0].name);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "singleMsg")), {
            whosendid: user.uid,
            whosendname: user.displayName,
            whoreciveid: activeChat?.id,
            whorecivename: activeChat?.name,
            img: downloadURL,
            date: `${new Date().getFullYear()} - ${
              new Date().getMonth() + 1
            } - ${new Date().getDate()} - ${new Date().getHours()} - ${new Date().getMinutes()}`,
          });
        });
      }
    );
  };
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    setCaptureImage(dataUri);
    const storageRef = sref(storage, uuidv4());
    uploadString(storageRef, dataUri, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "singleMsg")), {
          whosendid: user.uid,
          whosendname: user.displayName,
          whoreciveid: activeChat?.id,
          whorecivename: activeChat?.name,
          img: downloadURL,
          date: `${new Date().getFullYear()} - ${
            new Date().getMonth() + 1
          } - ${new Date().getDate()} - ${new Date().getHours()} - ${new Date().getMinutes()}`,
        }).then(() => {
          setOpenCam(false);
        });
      });
    });
  }
  return (
    <>
      {openCam && (
        <div className="camera_capture">
          <div className="close_cam" onClick={() => setOpenCam(false)}>
            <AiOutlineClose />
          </div>
          <Camera
            onTakePhoto={(dataUri) => {
              handleTakePhoto(dataUri);
            }}
            idealFacingMode={FACING_MODES.ENVIRONMENT}
          />
        </div>
      )}

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
          <div className="attachement">
            <label>
              <GrAttachment />
              <input onChange={handleImageUpload} type="file" hidden />
            </label>
          </div>
          <div className="camera" onClick={() => setOpenCam(true)}>
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
