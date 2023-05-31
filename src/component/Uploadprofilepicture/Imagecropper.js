import React from "react";
import "./style.css";
import { AiOutlineClose } from "react-icons/ai";
import Cropper from "react-cropper";
import { Button } from "@mui/material";

const Imagecropper = ({ setImage, image, getCropData, setCropper }) => {
  return (
    <>
      <div className="croper-box">
        <div className="close-box" onClick={() => setImage("")}>
          <AiOutlineClose />
        </div>
        <div className="preview-photo">
          <div className="img-preview" />
        </div>
        <Cropper
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          guides={false}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />

        <div className="upload-btn" onClick={getCropData}>
          <Button variant="outlined"> Upload Photo</Button>
        </div>
      </div>
    </>
  );
};

export default Imagecropper;
