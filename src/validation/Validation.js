import * as Yup from "yup";

export const signUp = Yup.object({
  fullname: Yup.string().min(2).max(15).required("Please enter your full name"),
  email: Yup.string()
    .email()
    .min(8)
    .required("Please enter your email address"),
  password: Yup.string().min(8).required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please enter your confirm password")
    .oneOf([Yup.ref("password"), null], "password must match"),
});
// .matches(
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
//   "please use spacial charecter"
// )
export const signIn = Yup.object({
  email: Yup.string()
    .email()
    .min(8)
    .required("Please enter your email address"),
  password: Yup.string().min(8).required("Please enter your password"),
});
