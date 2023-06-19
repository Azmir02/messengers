import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./style.css";
import { getDatabase, onValue, ref } from "firebase/database";

const Msggrps = () => {
  const [grouplists, setGrouplists] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "groups");
    onValue(starCountRef, (snapshot) => {
      let grpArr = [];
      snapshot.forEach((item) => {
        grpArr.push({ ...item.val(), id: item.key });
      });
      setGrouplists(grpArr);
    });
  }, []);

  console.log("groups", grouplists);
  return (
    <div className="msg-grouplist">
      <div className="msg-grouplist_header">
        <h2>Group Lists</h2>
        <div className="msg-group-serches-info">
          <div className="msg-grouplist_searchBoxes">
            <AiOutlineSearch />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
      <div className="msg-grouplist_body">
        {grouplists.map((item, i) => (
          <div className="msg-grouplist_wrapper" key={i}>
            <div className="msg-groupList_img">
              <img src="/assets/avatar.png" alt="avatr" />
            </div>
            <div className="msg-groupList_titles">
              <h4>{item.groupname}</h4>
              <span>{item.grouptag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Msggrps;
