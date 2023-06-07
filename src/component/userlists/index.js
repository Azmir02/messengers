import React, { useEffect, useState } from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "@mui/material/Button";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const Userlists = () => {
  const [userLists, setuserLists] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [frndlist, setFrndlist] = useState([]);
  const [frndReq, setFrndReq] = useState([]);
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

  // show friendreq
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest");
    onValue(starCountRef, (snapshot) => {
      let frndreqArr = [];
      snapshot.forEach((item) => {
        frndreqArr.push(item.val().reciverid + item.val().senderid);
      });
      setFrndReq(frndreqArr);
    });
  }, []);
  // show friendlist
  useEffect(() => {
    const starCountRef = ref(db, "friends");
    onValue(starCountRef, (snapshot) => {
      let frndArr = [];
      snapshot.forEach((item) => {
        frndArr.push(item.val().reciverid + item.val().senderid);
      });
      setFrndlist(frndArr);
    });
  }, []);

  const handleUserSearch = (e) => {
    let arr = [];
    if (e.target.value.length == 0) {
      setFilterUser([]);
    }
    userLists.filter((item) => {
      console.log(item);
      if (item.username.toLowerCase().includes(e.target.value.toLowerCase())) {
        arr.push(item);
        setFilterUser(arr);
      }
    });
  };

  // send frnd req
  const handleSentFrndreq = (item) => {
    set(push(ref(db, "friendrequest")), {
      sendername: user.displayName,
      senderid: user.uid,
      recivername: item.username,
      reciverid: item.id,
    });
  };

  return (
    <div className="userlists">
      <div className="userlists_header">
        <h2>User's Lists</h2>
        <div className="userlists_searchBoxes">
          <AiOutlineSearch />
          <input
            onChange={handleUserSearch}
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="userlists_body">
        {filterUser.length > 0
          ? filterUser.map((item, i) => (
              <div className="userlists_wrapper" key={i}>
                <div className="userlists_img">
                  <img src="/assets/avatar.png" alt="avatr" />
                </div>
                <div className="userlists_titles">
                  <h4>{item.username}</h4>
                </div>
                <div className="userlists_join">
                  {frndReq.includes(item.id + user.uid) ||
                  frndReq.includes(user.uid + item.id) ? (
                    <Button
                      variant="outlined"
                      color="error"
                      className="cancel-req"
                    >
                      Cancel Request
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => handleSentFrndreq(item)}
                    >
                      Add friend
                    </Button>
                  )}
                </div>
              </div>
            ))
          : userLists.map((item, i) => (
              <div className="userlists_wrapper" key={i}>
                <div className="userlists_img">
                  <img src="/assets/avatar.png" alt="avatr" />
                </div>
                <div className="userlists_titles">
                  <h4>{item.username}</h4>
                </div>
                <div className="userlists_join">
                  {frndlist.includes(item.id + user.uid) ||
                  frndlist.includes(user.uid + item.id) ? (
                    <Button variant="outlined" disabled className="cancel-req">
                      Friends
                    </Button>
                  ) : frndReq.includes(item.id + user.uid) ||
                    frndReq.includes(user.uid + item.id) ? (
                    <Button
                      variant="outlined"
                      color="error"
                      className="cancel-req"
                    >
                      Cancel Request
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => handleSentFrndreq(item)}
                    >
                      Add friend
                    </Button>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Userlists;
