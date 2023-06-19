import React, { useEffect, useState } from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical, BsCheckCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { SlTrash } from "react-icons/sl";
import moment from "moment/moment";

const Mygroups = () => {
  const [mygrps, setMygrps] = useState([]);
  const [reqGrplist, setReqGrplist] = useState([]);
  const [showreq, setShowreq] = useState(false);
  const user = useSelector((users) => users.login.loggedIn);
  const db = getDatabase();

  // get Mygroups data
  useEffect(() => {
    const starCountRef = ref(db, "groups");
    onValue(starCountRef, (snapshot) => {
      let mygrpArr = [];
      snapshot.forEach((item) => {
        if (user.uid == item.val().adminid) {
          mygrpArr.push({ ...item.val(), id: item.key });
        }
      });
      setMygrps(mygrpArr);
    });
  }, []);

  // get grp req
  const handleReq = (gitem) => {
    setShowreq(!showreq);
    const starCountRef = ref(db, "groupsjoinrequest");
    onValue(starCountRef, (snapshot) => {
      let reqgrpArr = [];
      snapshot.forEach((item) => {
        console.log(item.val().groupid);
        if (user.uid == item.val().adminid && item.val().groupid == gitem.id) {
          reqgrpArr.push({ ...item.val(), id: item.key });
        }
      });
      setReqGrplist(reqgrpArr);
    });
  };

  console.log("reqlist", reqGrplist);

  const handleAcceptgrpreq = (item) => {
    set(push(ref(db, "groupmembers")), {
      adminid: item.adminid,
      adminname: item.adminname,
      groupid: item.groupid,
      groupname: item.groupname,
      userid: item.userid,
      username: item.username,
    }).then(() => {
      remove(ref(db, "groupsjoinrequest/" + item.id));
    });
  };

  return (
    <div className="mygrps">
      <div className="mygrps_header">
        <h2>My Groups Lists</h2>
        <div className="mygrps-options">
          <div className="mygrps_searchBoxes">
            <AiOutlineSearch />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
      {showreq ? (
        <div className="grp-reqinfo">
          <div className="closegrpinfo" onClick={() => setShowreq(false)}>
            <RxCross2 />
          </div>
          {reqGrplist.length > 0 ? (
            reqGrplist.map((item, i) => (
              <div className="mygrps_wrapper" key={i}>
                <div className="mygrps_img">
                  <img src="/assets/avatar.png" alt="avatr" />
                </div>
                <div className="mygrps_titles">
                  <h4>{item.username}</h4>
                </div>
                <div className="mygrps_req_acceptbtn">
                  <div
                    className="accept-grpreq"
                    onClick={() => handleAcceptgrpreq(item)}
                  >
                    <BsCheckCircle />
                  </div>
                  <div className="reject-grpreq">
                    <SlTrash />
                  </div>
                  {/* <p>Created at</p>
                <span>{moment().startOf("day").fromNow(item.date)}</span> */}
                </div>
              </div>
            ))
          ) : (
            <h5 className="no-member-req">No member request</h5>
          )}
        </div>
      ) : (
        <div className="mygrps_body">
          {mygrps.map((item, i) => (
            <div className="mygrps_wrapper" key={i}>
              <div className="mygrps_img">
                <img src="/assets/avatar.png" alt="avatr" />
              </div>
              <div className="mygrps_titles">
                <h4>{item.groupname}</h4>
                <span>{item.grouptag}</span>
              </div>
              <div className="mygrps_date">
                <div className="options" onClick={() => handleReq(item)}>
                  <BsThreeDotsVertical />
                </div>
                {/* <p>Created at</p>
                <span>{moment().startOf("day").fromNow(item.date)}</span> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mygroups;
