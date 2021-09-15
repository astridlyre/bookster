import { useRef } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../redux/actions/actions.js";
import { TextField, Button, Typography } from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
    gap: theme.spacing(1),
    width: "100%",
    maxWidth: "32rem",
    margin: "0 auto",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    background: alpha(theme.palette.secondary.light, 0.1),
    boxShadow: "0 8px 24px -2px rgba(0, 0, 0, 0.05)",
  },
}));

export default function ReviewForm({ bookId }) {
  const formRef = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const review = Object.fromEntries([...new FormData(formRef.current)]);
    formRef.current.reset();
    return dispatch(
      postReview({
        ...review,
        bookId,
      })
    );
  };
  return (
    <form
      autoComplete="off"
      className={classes.root}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <Typography variant="h5" component="h3">
        Share Your Thoughts
      </Typography>
      <TextField
        multiline
        variant="filled"
        maxRows={6}
        label="Review"
        margin="normal"
        fullWidth
        required
        inputProps={{ name: "content" }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        title="Share review"
        name="submit"
      >
        Share Review
      </Button>
    </form>
  );
}
