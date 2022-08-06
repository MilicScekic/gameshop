import React, { useEffect, useState } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import CommentItem from "./CommentItem";
import {
  getCurrentProduct,
  clearCurrentProduct,
  postNewComment,
} from "../../store/actions/products";

const Comments = ({
  currentProduct,
  isAuthenticated,
  user,
  postNewComment,
  getCurrentProduct,
  clearCurrentProduct,
}) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  const [comment, setComment] = useState("");
  const [commentErrMsg, setCommentErrMsg] = useState("");
  const [commentSuccessMsg, setCommentSuccessMsg] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    if (comment) {
      const timeoutId = setTimeout(() => {
        return !!comment
          ? setCommentErrMsg("")
          : setCommentErrMsg("Comment field is blank");
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [comment, commentErrMsg]);

  const disabledCondition =
    submitDisabled || !comment || commentErrMsg ? true : false;

  //* Ideja je da se pri kliku handleSubmit funkcije odradi punjenje comments niza i zatim da se posljednji komentar prikaze u listi
  const refreshComments = () => {
    const timeout = setTimeout(() => {
      getCurrentProduct(currentProduct.id);
    }, 200);

    return () => {
      clearCurrentProduct();
      clearTimeout(timeout);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      postNewComment(
        {
          content: comment,
        },
        currentProduct.id
      );
      setSubmitDisabled(true);
      setComment("");
      refreshComments();
      setCommentSuccessMsg("Comment posted successfuly!");

      //? Da se ukloni obavjestenje nakon 3 sekunde
      const timeout = setTimeout(() => {
        setCommentSuccessMsg("");
        setSubmitDisabled(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    } catch (error) {
      setCommentErrMsg("Comment not posted");
    }
  };

  return (
    <div style={{ padding: 14, marginTop: 50, fontFamily: "Roboto" }}>
      <h1>Comments</h1>

      {/* //! Add comment */}
      {isAuthenticated && user !== null ? (
        <div>
          <FormControl className={classes.form} fullWidth>
            <Stack sx={{ width: "100%" }} spacing={2}>
              {commentErrMsg && (
                <Alert severity="warning">{commentErrMsg}</Alert>
              )}
              {commentSuccessMsg && (
                <Alert severity="success">{commentSuccessMsg}</Alert>
              )}
            </Stack>

            <TextField
              id="outlined-basic"
              label="New comment"
              variant="standard"
              margin="normal"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              margin="normal"
              className={classes.submit}
              disabled={disabledCondition}
              onClick={handleSubmit}
            >
              Post comment
            </Button>
          </FormControl>
        </div>
      ) : (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">{"Only users can add comment!"}</Alert>
        </Stack>
      )}

      {currentProduct.comments?.length > 0 &&
        currentProduct.comments?.map((item) => <CommentItem comment={item} />)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentProduct: state.products.currentProduct,
});

export default connect(mapStateToProps, {
  postNewComment,
  getCurrentProduct,
  clearCurrentProduct,
})(Comments);
