import React from "react";
import "./style.css";
import Grid from "@mui/material/Grid";
import Grouplist from "../../component/grouplist";
import Friendrequst from "../../component/friendrequest";
import Friends from "../../component/friends";
import Mygroups from "../../component/mygroups";
import Userlists from "../../component/userlists";
import Blockuser from "../../component/blockusers";
import { useSelector } from "react-redux";

const Home = () => {
  return (
    <>
      <div>
        <Grid container className="home_pages">
          <Grid className="home_items" item xs={4}>
            <div>
              <Grouplist />
            </div>
            <div>
              <Friendrequst />
            </div>
          </Grid>
          <Grid className="home_items" item xs={4}>
            <div>
              <Friends />
            </div>
            <div>
              <Mygroups />
            </div>
          </Grid>
          <Grid className="home_items" item xs={4}>
            <div>
              <Userlists />
            </div>
            <div>
              <Blockuser />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
