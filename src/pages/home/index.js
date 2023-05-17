import React from "react";
import "./style.css";
import Grid from "@mui/material/Grid";
import Grouplist from "../../component/grouplist";

const Home = () => {
  return (
    <>
      <div>
        <Grid container className="home_pages">
          <Grid className="home_items" item xs={4}>
            <div>
              <Grouplist />
            </div>
            <div>Friend Request</div>
          </Grid>
          <Grid className="home_items" item xs={4}>
            2
          </Grid>
          <Grid className="home_items" item xs={4}>
            3
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
