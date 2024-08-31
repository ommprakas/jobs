import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
export const CommonDialog = (props) => {
  const handleClose = () => {
    props.CloseCallback();
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={props.maxWidth}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <IconButton
            className="dialogDeleteBtn"
            onClick={handleClose}
            aria-label="delete"
          >
            <CloseIcon style={{ color: "#ff0000" }} />
          </IconButton>
          {props?.component}
        </DialogContent>
      </Dialog>
    </div>
  );
};
