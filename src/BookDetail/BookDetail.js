import { Grid, Box, Typography, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Loader from "../Loader/Loader.js";
import ReviewList from "../ReviewList/ReviewList.js";
import ReviewForm from "../ReviewForm/ReviewForm.js";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: "#8f8f8f",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
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
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(0),
      flexFlow: "column nowrap",
    },
    gap: theme.spacing(4),
  },
}));

export default function BookDetail({ book, loading, error }) {
  const classes = useStyles();
  const [showFull, setShowFull] = useState(false);

  const getDescriptionFor = book =>
    book?.description ? book.description : book?.title ? book.title : "";
  const textToShow =
    getDescriptionFor(book).length > 300
      ? showFull
        ? getDescriptionFor(book)
        : `${getDescriptionFor(book).substring(0, 300)}...`
      : getDescriptionFor(book);

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
    <Grid item className={`${classes.root} detail`}>
      <Container maxWidth="md">
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
            <Box>
              <Typography
                variant="body2"
                component="p"
                className="book-description"
              >
                {textToShow}
              </Typography>
              {getDescriptionFor(book).length > 300 && (
                <button
                  className={`${classes.link} show-more`}
                  onClick={() => setShowFull(s => !s)}
                >
                  Show more
                </button>
              )}
            </Box>
          </Box>
          <Box className={classes.page}>
            {book.reviews && <ReviewList reviews={book.reviews} />}
            <ReviewForm bookId={book.id} />
          </Box>
        </Paper>
      </Container>
    </Grid>
  );
}
