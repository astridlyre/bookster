import { useEffect } from "react";
import { Box, Typography, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../Loader/Loader.js";
import ReviewList from "../ReviewList/ReviewList.js";
import ReviewForm from "../ReviewForm/ReviewForm.js";
import SizeLimitedText from "../Text/SizeLimitedText.js";
import config from "../config.js";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
  },
  error: {
    color: theme.palette.error,
  },
  img: {
    maxHeight: "16rem",
    objectFit: "contain",
  },
  page: {
    marginTop: theme.spacing(8),
    display: "flex",
    alignItems: "flex-start",
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(4),
      flexFlow: "column-reverse nowrap",
      alignItems: "center",
    },
    gap: theme.spacing(4),
  },
}));

export default function BookDetail({ book, loading, error }) {
  const classes = useStyles();

  useEffect(() => {
    document.title = book
      ? `${book.title} | ${config.siteName}`
      : config.siteName;
  }, [book]);

  if (error) {
    return (
      <p data-test="error-message" className={classes.error}>
        an Error has occured
      </p>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md" className="detail">
      <Paper elevation={1} className={classes.paper}>
        <Typography
          variant="h2"
          component="h1"
          className="book-title"
          gutterBottom
        >
          {book.title}
        </Typography>
        <Box className={classes.page}>
          <img src={book.image} alt={book.title} className={classes.img} />
          <SizeLimitedText
            size={300}
            text={book.description || book.title || ""}
            textProps={{ className: "book-description" }}
          />
        </Box>
        <Box className={classes.page}>
          <ReviewList bookId={book.id} reviews={book.reviews} />
          <ReviewForm bookId={book.id} />
        </Box>
      </Paper>
    </Container>
  );
}
