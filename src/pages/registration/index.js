import React from "react";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import "./style.css";
import Signup from "../../svg/signUp";
import Forms from "./Forms";
const SignUp = () => {
  return (
    <>
      <div className="sign__up">
        <Container fixed>
          <Grid container justifyContent={"center"}>
            <Grid item md={8}>
              <div className="signup__shadow">
                <Grid container alignItems={"center"}>
                  <Grid item md={7}>
                    <Forms />
                  </Grid>
                  <Grid item md={5}>
                    <Signup />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default SignUp;
