import React, { useEffect, useState } from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "@mui/material/Button";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const Userlists = () => {
  const [userLists, setuserLists] = useState([]);
  const user = useSelector((users) => users.login.loggedIn);
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "users");
    onValue(starCountRef, (snapshot) => {
      let userArr = [];
      snapshot.forEach((userLists) => {
        if (user.uid != userLists.key) {
          userArr.push({ ...userLists.val(), id: userLists.key });
        }
      });
      setuserLists(userArr);
    });
  }, []);
  return (
    <div className="userlists">
      <div className="userlists_header">
        <h2>User's Lists</h2>
        <div className="userlists_searchBoxes">
          <AiOutlineSearch />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="userlists_body">
        {userLists.map((item, i) => (
          <div className="userlists_wrapper" key={i}>
            <div className="userlists_img">
              <img src="/assets/avatar.png" alt="avatr" />
            </div>
            <div className="userlists_titles">
              <h4>{item.username}</h4>
            </div>
            <div className="userlists_join">
              <Button variant="outlined">Add friend</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userlists;
