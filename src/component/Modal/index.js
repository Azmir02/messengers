import React from "react";
import Box from "@mui/material/Box";
import "./style.css";
import Modal from "@mui/material/Modal";
import Uploadprofile from "../Uploadprofilepicture";

const Modals = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modals">
          <Uploadprofile />
        </Box>
      </Modal>
    </div>
  );
};

export default Modals;
