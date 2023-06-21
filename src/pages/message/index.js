import React from "react";
import "./style.css";
import { Grid } from "@mui/material";
import Msggrps from "../../component/msggrps";
import Friends from "../../component/friends";
import Chattingbox from "../../component/chattingbox";

const Message = () => {
  return (
    <>
      <div className="chatting">
        <Grid container justifyContent="space-around">
          <Grid item xs={4}>
            <div className="msggrp">
              <Msggrps />
            </div>
            <div className="singlemsg">
              <Friends />
            </div>
          </Grid>
          <Grid item xs={7}>
            <Chattingbox />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Message;
