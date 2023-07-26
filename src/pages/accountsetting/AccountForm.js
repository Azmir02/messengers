import React from "react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut, updatePassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { Loginusers } from "../../feature/Slice/LoginSlice";
import { useNavigate } from "react-router-dom";

const AccountForm = () => {
  const user = useSelector((users) => users.login.loggedIn);
  const dispatch = useDispatch();
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  console.log(currentUser);
  let initialvalues = {
    FullName: user.displayName,
    email: user.email,
    password: "",
  };
  const formik = useFormik({
    initialValues: initialvalues,
    onSubmit: () => {
      UpdateUser();
    },
  });

  const UpdateUser = async () => {
    await updateProfile(auth.currentUser, {
      displayName: formik.values.FullName,
    }).then(async () => {
      const userInfo = {
        displayName: auth.currentUser.displayName,
      };
      await update(ref(db, "users/" + user.uid), {
        username: userInfo.displayName,
      });
      await updatePassword(currentUser, formik.values.password)
        .then(() => {
          signOut(auth).then(() => {
            localStorage.removeItem("users");
            dispatch(Loginusers(null));
            navigate("/login");
          });
        })
        .catch((error) => console.log(error.message));

      dispatch(Loginusers({ ...user, displayName: formik.values.FullName }));
      localStorage.setItem(
        "users",
        JSON.stringify({
          ...user,
          displayName: formik.values.FullName,
        })
      );
    });
  };

  return (
    <div className="account-Form">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          type="text"
          id="outlined-basic"
          name="FullName"
          label="Full Name"
          variant="standard"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.FullName}
          fullWidth
          margin="normal"
        />
        <TextField
          type="email"
          id="outlined-basic"
          name="email"
          label="Email"
          variant="standard"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          type="password"
          id="outlined-basic"
          name="password"
          label="New Password"
          variant="standard"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" type="submit" className="update">
          Update
        </Button>
      </form>
    </div>
  );
};

export default AccountForm;
