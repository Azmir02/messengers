import React from "react";
import "./style.css";
import { Grid } from "@mui/material";
import Msggrps from "../../component/msggrps";

const Message = () => {
  return (
    <>
      <div className="chatting">
        <Grid container justifyContent="space-around">
          <Grid item xs={4}>
            <div className="msggrp">
              <Msggrps />
            </div>
          </Grid>
          <Grid item xs={5}>
            chatting box
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Message;
