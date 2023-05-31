import React, { useRef, useState } from "react";
import Imagecropper from "./Imagecropper";
import "cropperjs/dist/cropper.css";
import { BsFillImageFill } from "react-icons/bs";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import "./style.css";
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import LoginSlice, { Loginusers } from "../../feature/Slice/LoginSlice";

const Uploadprofile = ({ setOpen }) => {
  const storage = getStorage();
  const storageRef = ref(storage, "some-child");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const user = useSelector((users) => users.login.loggedIn);
  const auth = getAuth();

  const profilePic = useRef(null);

  const handleProfileUpload = (e) => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setOpen(false);
            dispatch(Loginusers({ ...user, photoURL: downloadURL }));
            localStorage.setItem(
              "users",
              JSON.stringify({ ...user, photoURL: downloadURL })
            );
          });
        });
      });
    }
  };

  return (
    <>
      <div className="upload_box">
        <input
          hidden
          type="file"
          ref={profilePic}
          onChange={handleProfileUpload}
        />
        <div className="upload">
          <div
            className="upload_icon"
            onClick={() => profilePic.current.click()}
          >
            <BsFillImageFill />
          </div>
          <p>Upload Photo</p>
        </div>
        {image && (
          <Imagecropper
            getCropData={getCropData}
            setImage={setImage}
            image={image}
            setCropper={setCropper}
          />
        )}
      </div>
    </>
  );
};

export default Uploadprofile;
