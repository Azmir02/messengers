import React from "react";
import Forms from "./Forms";
import { Container, Grid } from "@mui/material";
import "./style.css";
import LoginSVG from "../../svg/logIn";

const Login = () => {
  return (
    <>
      <div className="sign__up">
        <Container fixed>
          <Grid container justifyContent={"center"}>
            <Grid item md={8}>
              <div className="login__shadow">
                <Grid container alignItems={"center"}>
                  <Grid item md={7}>
                    <Forms />
                  </Grid>
                  <Grid item md={5}>
                    <LoginSVG />
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

export default Login;
