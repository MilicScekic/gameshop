import React from "react";
import { Avatar, Grid, Paper } from "@material-ui/core";
import moment from "moment/moment";

const CommentItem = ({ comment: { content, created } }) => {
  return (
    <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>User</h4>
          <p style={{ textAlign: "left" }}>{content}</p>
          <p style={{ textAlign: "left", color: "gray" }}>
            posted {moment(created).fromNow()}
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CommentItem;
