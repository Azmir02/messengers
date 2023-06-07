import React, { useEffect, useState } from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

const Blockuser = () => {
  const [blockLists, setblockLists] = useState([]);
  const user = useSelector((users) => users.login.loggedIn);
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "block");
    onValue(starCountRef, (snapshot) => {
      let blockArr = [];
      snapshot.forEach((item) => {
        if (item.val().blockedbyid == user.uid) {
          blockArr.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockid,
          });
        } else {
          blockArr.push({
            id: item.key,
            blockedby: item.val().blockedby,
            blockedbyid: item.val().blockedbyid,
          });
        }
      });
      setblockLists(blockArr);
    });
  }, []);

  const handleUnblock = (item) => {
    set(push(ref(db, "friends")), {
      sendername: item.block,
      senderid: item.blockid,
      reciverid: user.uid,
      recivername: user.displayName,
    }).then(() => {
      remove(ref(db, "block/" + item.id));
    });
  };

  console.log(blockLists);
  return (
    <div className="blocked">
      <div className="blocked_header">
        <h2>Blocked Lists</h2>
        <div className="blocked_searchBoxes">
          <AiOutlineSearch />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="blocked_body">
        {blockLists.map((item, i) => (
          <div className="blocked_wrapper" key={i}>
            <div className="blocked_img">
              <img src="/assets/avatar.png" alt="avatr" />
            </div>
            <div className="blocked_titles">
              <h4>{item.block}</h4>
              <h4>{item.blockedby}</h4>
            </div>
            {!item.blockedbyid && (
              <div className="blocked_join">
                <Button variant="outlined" onClick={() => handleUnblock(item)}>
                  Unblock
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blockuser;
