import React, { useContext, useState, useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { Redirect, Link as LinkTo } from "react-router-dom";
import { apiCall } from "../services/api";
import { loginUser } from "../store/actions/auth";
import { connect } from "react-redux";
import Register from "./Register";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    borderColor: "#000 !important",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#000 !important",
  },
}));

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,24}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,}[a-zA-Z]+[0-9]*$/;

const Login = ({ isAuthenticated, loading, loginUser }) => {
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [validUsername, setValidUsername] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [usernameErrMsg, setUsernameErrMsg] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");

  const [submitDisabled, setSubmitDisabled] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (user) {
      setValidUsername(USERNAME_REGEX.test(user));
      const timeoutId = setTimeout(() => {
        return !!validUsername
          ? setUsernameErrMsg("")
          : setUsernameErrMsg("Username isn't correct");
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [user, validUsername]);

  useEffect(() => {
    if (password) {
      setValidPwd(PWD_REGEX.test(password));
      const timeoutId = setTimeout(() => {
        return validPwd
          ? setPwdErrMsg("")
          : setPwdErrMsg(
              "8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character."
            );
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [password, validPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitDisabled(true); // zamrzni dugme
    setUser("");
    setPassword("");

    //? Za login
    loginUser({
      username: user,
      password: password,
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Stack sx={{ width: "100%" }} spacing={2}>
            {usernameErrMsg ? (
              <Alert severity="error">{usernameErrMsg}</Alert>
            ) : (
              ""
            )}
            {pwdErrMsg ? <Alert severity="error">{pwdErrMsg}</Alert> : ""}
          </Stack>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            ref={userRef}
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            disabled={
              !validUsername || !validPwd || submitDisabled ? true : false
            }
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" component={LinkTo} variant="body2" className="black">
                {"Forgot password?"}
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/register"
                component={LinkTo}
                variant="body2"
                className="black"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

          {loading && (
            <CircularProgress style={{ display: "block", margin: "0 auto" }} />
          )}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.visual.loading,
});

export default connect(mapStateToProps, { loginUser })(Login);
