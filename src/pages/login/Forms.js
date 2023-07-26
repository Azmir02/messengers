import { Button, TextField, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "../../validation/Validation";
import { PulseLoader } from "react-spinners";
import GithubSVG from "../../svg/github";
import FacebookSVG from "../../svg/facebook";
import GoogleSVG from "../../svg/google";
import { useDispatch } from "react-redux";
import { Loginusers } from "../../feature/Slice/LoginSlice";

const Forms = () => {
  const dispatch = useDispatch();
  const [passShow, setPassShow] = useState("password");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleViewHide = () => {
    if (passShow === "password") {
      setPassShow("text");
    } else {
      setPassShow("password");
    }
  };

  let initialvalues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: signIn,
    onSubmit: () => {
      signInUser();
    },
  });

  const signInUser = () => {
    setLoading(true);
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({ user }) => {
        if (user.emailVerified === true) {
          dispatch(Loginusers(user));
          localStorage.setItem("users", JSON.stringify(user));
          navigate("/");
          // toast.success("account login", {
          //   position: "top-center",
          //   autoClose: 3000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });
          setLoading(false);
        } else {
          toast.error("please verify your email address", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.message.includes("auth/invalid-email")) {
          toast.error("invalid email address", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (error.message.includes("auth/user-not-found")) {
          toast.error("user not found", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (error.message.includes("auth/wrong-password")) {
          toast.error("wrong password", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("google signIn complete", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then(() => {
        toast.success("facebook signIn complete", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(() => {
        toast.success("github signIn complete", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleForgottenPassword = () => {
    sendPasswordResetEmail(auth, formik.values.email)
      .then(() => {
        toast.success("Password reset email sent", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        if (error.message.includes("auth/missing-email")) {
          toast.error("please enter your email address", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (error.message.includes("auth/user-not-found")) {
          toast.error("user not found", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        console.log("forgotpass", error.message);
      });
  };

  return (
    <>
      <div className="login__form">
        <ToastContainer />
        <h1 className="login__title">Login to your account!</h1>
        <div className="signIn__methods__container">
          <h3 className="signin__methods__title">
            Login with another account:
          </h3>
          <div className="signIn__methods">
            <div className="google__signin__btn">
              <Tooltip title="SignIn with google">
                <IconButton onClick={handleGoogleSignIn}>
                  <GoogleSVG />
                </IconButton>
              </Tooltip>
            </div>

            <div className="facebook__signin__btn">
              <Tooltip title="SignIn with facebook">
                <IconButton onClick={handleFacebookSignIn}>
                  <FacebookSVG />
                </IconButton>
              </Tooltip>
            </div>

            <div className="github__signin__btn">
              <Tooltip title="SignIn with github">
                <IconButton onClick={handleGithubSignIn}>
                  <GithubSVG />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            type="email"
            id="outlined-basic"
            name="email"
            label="Email Address"
            variant="standard"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            fullWidth
            margin="normal"
          />

          {formik.errors.email && formik.touched.email && (
            <p className="login__error">{formik.errors.email}</p>
          )}

          <div className="password__field">
            <TextField
              type={passShow}
              id="outlined-basic"
              name="password"
              label="Password"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              fullWidth
              margin="normal"
            />

            <IconButton onClick={handleViewHide}>
              {passShow === "password" ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </IconButton>
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="login__error">{formik.errors.password}</p>
          )}
          <div className="login__btn">
            {loading === true ? (
              <Button variant="contained" type="submit">
                <PulseLoader color="#fff" size={10} />
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                Login
              </Button>
            )}
          </div>

          <div className="forgot__pass">
            <Link to="/forgotpassword">Forgot your password ?</Link>
          </div>
          <p className="signup__text">
            Don't have an account ? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Forms;
