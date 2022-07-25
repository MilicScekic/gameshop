import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => (
  <Backdrop open={true}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default Spinner;
