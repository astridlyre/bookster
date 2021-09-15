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
import { registerUser } from "../redux/actions/actions.js";

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
  const [showError, setShowError] = useState({ text: "", show: hasFailed });
  const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();
    const credentials = Object.fromEntries([...new FormData(formRef.current)]);
    if (credentials.password !== credentials.confirmPassword) {
      formRef.current.querySelector('[name="confirmPassword"]').focus();
      setShowError({ text: "Passwords do not match", show: true });
      console.log(showError);
      return;
    }
    return dispatch(registerUser(credentials));
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
            Sign up
          </Typography>
          <Typography variant="body1" color="secondary">
            The whole world of books awaits
          </Typography>
          <TextField
            required
            label="Username"
            margin="normal"
            name="username"
            data-test="register-username"
          />
          <TextField
            required
            label="Email"
            type="email"
            margin="normal"
            name="email"
            data-test="register-email"
          />
          <TextField
            required
            label="Password"
            margin="normal"
            type="password"
            name="password"
            data-test="register-password"
          />
          <TextField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            margin="normal"
            helperText="Password must be at least 6 characters"
            data-test="register-confirm-password"
            required
          />
          <Typography color="error" hidden={!showError.show}>
            {showError.text}
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
            data-test="register-submit"
          >
            Create account
          </Button>
          <Box className={classes.alt}>
            <Typography variant="body2">Already have an account?</Typography>
            <Button
              variant="outlined"
              onClick={() => setIsRegistering(s => !s)}
            >
              Login with exisiting account
            </Button>
          </Box>
        </Grid>
      </form>
    </Container>
  );
}
