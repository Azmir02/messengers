import React from "react";
import SignUp from "./pages/registration";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import RootLayout from "./component/Rootlayout";
import Notloggedinuser from "./Privaterouter/Notloggedinuser";
import Loggedinuser from "./Privaterouter/Loggedinuser";
import Forgotpassword from "./pages/forgotpassword";
import Message from "./pages/message";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Loggedinuser />}>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/message" element={<Message />}></Route>
          </Route>
        </Route>
        <Route element={<Notloggedinuser />}>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
