import React, { useEffect, useState } from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import moment from "moment/moment";

const Mygroups = () => {
  const [mygrps, setMygrps] = useState([]);
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
  const handleReq = () => {
    console.log("asi");
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
          <div className="options" onClick={handleReq}>
            <BsThreeDotsVertical />
          </div>
        </div>
      </div>
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
              <p>Created at</p>
              <span>{moment().add(item.date, "days").calendar()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mygroups;
