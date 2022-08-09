import React, { useState } from "react";
import { connect } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const AlertBox = ({ alerts }) => {
  const [open, setOpen] = useState(true);

  function TransitionLeft(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    setOpen(false);
  };

  return (
    alerts.length > 0 &&
    alerts.map(({ msg, type, id }) => (
      <Snackbar
        key={id}
        open={open}
        autoHideDuration={3000}
        TransitionComponent={TransitionLeft}
        onClose={handleClose}
      >
        <Alert variant="filled" severity={type}>
          {msg}
        </Alert>
      </Snackbar>
    ))
  );
};

const mapStateToProps = (state) => ({
  alerts: state.visual.alerts,
});

export default connect(mapStateToProps)(AlertBox);
