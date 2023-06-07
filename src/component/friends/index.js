import React, { useEffect, useState } from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "@mui/material/Button";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const Friends = () => {
  const [frndlist, setFrndlist] = useState([]);
  const user = useSelector((users) => users.login.loggedIn);
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "friends");
    onValue(starCountRef, (snapshot) => {
      let frndArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid == item.val().reciverid ||
          user.uid == item.val().senderid
        ) {
          frndArr.push({ ...item.val(), id: item.key });
        }
      });
      setFrndlist(frndArr);
    });
  }, []);

  const handleBlock = (item) => {
    if (user.uid == item.senderid) {
      set(push(ref(db, "block")), {
        block: item.recivername,
        blockid: item.reciverid,
        blockedby: item.sendername,
        blockedbyid: item.senderid,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
      });
    } else {
      set(push(ref(db, "block")), {
        block: item.sendername,
        blockid: item.senderid,
        blockedby: item.recivername,
        blockedbyid: item.reciverid,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
      });
    }
  };

  return (
    <div className="friends">
      <div className="friends_header">
        <h2>Friend's Lists</h2>
        <div className="friends_searchBoxes">
          <AiOutlineSearch />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="friends_body">
        {frndlist.map((item, i) => (
          <div className="friends_wrapper" key={i}>
            {console.log(item)}
            <div className="friends_img">
              <img src="/assets/avatar.png" alt="avatr" />
            </div>
            <div className="friends_titles">
              <h4>
                {user.uid == item.senderid ? item.recivername : item.sendername}
              </h4>
            </div>
            <div className="friends_join">
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleBlock(item)}
              >
                Block
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
