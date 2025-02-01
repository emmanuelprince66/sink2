import React from "react";
import { Modal } from "@mui/material";
import { useState } from "react";
import { Padding } from "@mui/icons-material";

const CustomModal = ({ children, open, closeModal, style }) => {
  const customStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    background: "white",
    maxHeight: "95%",
    padding: "1rem",
    overflowY: "auto",

    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
    bgcolor: "background.paper",
  };
  return (
    <>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        PaperProps={{
          sx: {
            border: "none", // Remove the border
            boxShadow: "none", // Remove the box shadow
          },
        }}
      >
        <div className={`${style ? style : "w-1/2"}`} style={customStyle}>
          {children}
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;
