import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "@mui/material/Button";
import "./style.css";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";

const Friendrequst = () => {
  const user = useSelector((users) => users.login.loggedIn);
  const [frndReq, setFrndReq] = useState([]);
  const db = getDatabase();

  // show friend request
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest");
    onValue(starCountRef, (snapshot) => {
      let reqArr = [];
      snapshot.forEach((item) => {
        if (item.val().reciverid == user.uid) {
          reqArr.push({ ...item.val(), id: item.key });
        }
      });
      setFrndReq(reqArr);
    });
  }, []);

  const handleAcceptreq = (item) => {
    set(push(ref(db, "friends")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.id));
    });
  };
  return (
    <div className="friendrequestlist">
      <div className="friendrequestlist_header">
        <h2>Friendrequest Lists</h2>
        <div className="friendrequestlist_searchBoxes">
          <AiOutlineSearch />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="friendrequestlist_body">
        {frndReq.map((item, i) => (
          <div className="friendrequestlist_wrapper">
            <div className="friendrequestlist_img">
              <img src="/assets/avatar.png" alt="avatr" />
            </div>
            <div className="friendrequestlist_titles">
              <h4>{item.sendername}</h4>
            </div>
            <div className="friendrequestlist_join">
              <Button variant="outlined" onClick={() => handleAcceptreq(item)}>
                Accept
              </Button>
              <Button variant="outlined" color="error">
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friendrequst;
