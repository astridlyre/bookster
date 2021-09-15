import {
  Grid,
  Button,
  Container,
  Box,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/actions.js";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(6),
  },
  title: {
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    padding: theme.spacing(4),
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
    borderRadius: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  alt: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexFlow: "column nowrap",
    gap: theme.spacing(1),
  },
}));

export default function Login({ setIsRegistering, hasFailed }) {
  const classes = useStyles();
  const formRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();
    const credentials = Object.fromEntries([...new FormData(formRef.current)]);
    return dispatch(loginUser(credentials));
  };

  return (
    <Container maxWidth="xs" className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit} ref={formRef}>
        <Grid container direction="column">
          <Typography
            variant="h3"
            component="h1"
            className={classes.title}
            gutterBottom
          >
            Welcome back!
          </Typography>
          <Typography variant="body1" color="secondary">
            Log in to see what's new
          </Typography>
          <TextField
            required
            label="Username"
            margin="normal"
            name="username"
            data-test="login-username"
          />
          <TextField
            required
            label="Password"
            margin="normal"
            type="password"
            name="password"
            data-test="login-password"
          />
          <Typography color="error" hidden={!hasFailed}>
            Login failed
          </Typography>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            margin="normal"
            name="submit"
            aria-label="Log into your Bookster account"
            title="Log into your Booskter account"
            type="submit"
            data-test="login-submit"
          >
            Login
          </Button>
          <Box className={classes.alt}>
            <Typography variant="body2">Need to create an account?</Typography>
            <Button
              variant="outlined"
              onClick={() => setIsRegistering(s => !s)}
              data-test="register-button"
            >
              Sign up
            </Button>
          </Box>
        </Grid>
      </form>
    </Container>
  );
}
