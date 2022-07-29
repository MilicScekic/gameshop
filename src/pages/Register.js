import React, { useContext, useState, useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Redirect, Link as LinkTo } from "react-router-dom";
import { registerUser } from "../store/actions/auth";
import { connect } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Gameshop
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#000 !important",
  },
}));

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,}[a-zA-Z]+[0-9]*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/;

const Register = ({ isAuthenticated, registerUser }) => {
  const usernameRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  const [usernameErrMsg, setUsernameErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");

  const [submitDisabled, setSubmitDisabled] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    if (username) {
      setValidUsername(USERNAME_REGEX.test(username));
      const timeoutId = setTimeout(() => {
        return !!validUsername
          ? setUsernameErrMsg("")
          : setUsernameErrMsg("Username isn't correct");
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [username, validUsername]);

  useEffect(() => {
    if (email) {
      setValidEmail(EMAIL_REGEX.test(email));
      const timeoutId = setTimeout(() => {
        return !!validEmail
          ? setEmailErrMsg("")
          : setEmailErrMsg("Email isn't correct");
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [email, validEmail]);

  useEffect(() => {
    if (password) {
      setValidPwd(PWD_REGEX.test(password));
      const timeoutId = setTimeout(() => {
        return !!validPwd
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

  useEffect(() => {
    if (password && confirmPassword) {
      setValidMatch(password === confirmPassword);
      const timeoutId = setTimeout(() => {
        return !!confirmPassword
          ? setPwdErrMsg("")
          : setPwdErrMsg("Passwords not matching");
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [password, confirmPassword]);

  const disabledCondition =
    !validUsername ||
    !validEmail ||
    !validPwd ||
    !validMatch ||
    !username ||
    !password ||
    !firstName ||
    !lastName ||
    !email ||
    !confirmPassword ||
    submitDisabled
      ? true
      : false;

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitDisabled(true); // zamrzni dugme
    setUsername("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    setEmailErrMsg("");
    setPwdErrMsg("");
    setUsernameErrMsg("");

    registerUser({
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password2: confirmPassword,
    });

    setSubmitDisabled(false);
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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Stack sx={{ width: "100%" }} spacing={2}>
            {usernameErrMsg && <Alert severity="error">{usernameErrMsg}</Alert>}
            {emailErrMsg && <Alert severity="error">{emailErrMsg}</Alert>}
            {pwdErrMsg && <Alert severity="error">{pwdErrMsg}</Alert>}
          </Stack>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            ref={usernameRef}
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="First name"
            name="name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            // onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Last name"
            name="name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            // onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // onChange={handleChange}
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
            // onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirmation password"
            type="password"
            id="password2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabledCondition}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <LinkTo to="/login" variant="body2" style={{ fontSize: "14px" }}>
                {" "}
                {"Already have an account? Log in"}
              </LinkTo>
            </Grid>
          </Grid>
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
});

export default connect(mapStateToProps, { registerUser })(Register);
