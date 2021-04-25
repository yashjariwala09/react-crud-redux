import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogTitle as MuiDialogTitle,DialogContent as MuiDialogContent, DialogActions as MuiDialogActions, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "./modal.css";
const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: "#424242",
    width: "500px",
    color: "#fff",
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#424242",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function TransitionsModal(props) {
  const classes = useStyles();
  const {
    isOpen,
    handleClose,
    onSubmit,
    submitButtonName,
    cancelButtonName,
    cancelButton,
  } = props;
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        classes={{ paper: classes.paper }}
        open={isOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.title || "Modal Title"}
        </DialogTitle>
        <DialogContent dividers>{props.children}</DialogContent>

        <DialogActions>
          {cancelButton ? (
            <Button onClick={handleClose} variant="contained">
              {cancelButtonName || "Cancel"}
            </Button>
          ) : null}

          <Button
            autoFocus
            onClick={onSubmit}
            variant="contained"
            color="secondary"
          >
            {submitButtonName || "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
