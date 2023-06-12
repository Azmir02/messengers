import React, { useEffect, useState } from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const Grouplist = () => {
  const [open, setOpen] = React.useState(false);
  const [groupname, setGroupname] = useState("");
  const [grouptag, setGrouptag] = useState("");
  const [grouplists, setGrouplists] = useState([]);
  const user = useSelector((users) => users.login.loggedIn);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const db = getDatabase();

  // creating groups
  const handleGrpCreate = () => {
    set(push(ref(db, "groups")), {
      groupname: groupname,
      grouptag: grouptag,
      adminname: user.displayName,
      adminid: user.uid,
      date: `${new Date().getFullYear()} - ${
        new Date().getMonth() + 1
      } - ${new Date().getDate()} - ${new Date().getHours()} - ${new Date().getMinutes()}`,
    }).then(() => {
      setOpen(false);
    });
  };

  // get groups data
  useEffect(() => {
    const starCountRef = ref(db, "groups");
    onValue(starCountRef, (snapshot) => {
      let grpArr = [];
      snapshot.forEach((item) => {
        if (user.uid != item.val().adminid) {
          grpArr.push({ ...item.val(), id: item.key });
        }
      });
      setGrouplists(grpArr);
    });
  }, []);

  // 0 - jan
  // 1 - feb
  // 2 - march
  // 3 - april
  // 4 - may
  // 5 - june

  // 0 + 1 = 1 - jan
  // 0 + 1+1 = 2 - feb

  return (
    <>
      <div className="grouplist">
        <div className="grouplist_header">
          <h2>Group Lists</h2>
          <div className="group-serches-info">
            <div className="grouplist_searchBoxes">
              <AiOutlineSearch />
              <input type="text" placeholder="Search..." />
            </div>
            <div className="create-grp">
              <Button variant="outlined" onClick={handleOpen}>
                Create Group
              </Button>
            </div>
          </div>
        </div>
        <div className="grouplist_body">
          {grouplists.map((item, i) => (
            <div className="grouplist_wrapper" key={i}>
              <div className="groupList_img">
                <img src="/assets/avatar.png" alt="avatr" />
              </div>
              <div className="groupList_titles">
                <h4>{item.groupname}</h4>
                <span>{item.grouptag}</span>
              </div>
              <div className="groupList_join">
                <Button variant="outlined">Join</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="group_modals">
          <h2>Create Your Own Groups</h2>
          <div className="group-creattion-form">
            <TextField
              id="outlined-basic"
              label="Group Name"
              variant="outlined"
              fullWidth
              onChange={(e) => setGroupname(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Group Tag"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => setGrouptag(e.target.value)}
            />
          </div>
          <Button variant="contained" onClick={handleGrpCreate}>
            Create
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Grouplist;
