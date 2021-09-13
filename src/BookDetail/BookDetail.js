import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: "#8f8f8f",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
}));

export default function BookDetail({ book, loading, error }) {
  const classes = useStyles();
  const [showFull, setShowFull] = useState(false);

  const getDescriptionFor = book =>
    book ? book.description || book.title : "";
  const textToShow =
    getDescriptionFor(book).length > 300
      ? showFull
        ? getDescriptionFor(book)
        : `${getDescriptionFor(book).substring(0, 300)}...`
      : getDescriptionFor(book);

  if (error) {
    return <p>Error</p>;
  }
  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <Grid item className="detail">
      <Typography variant="h1" component="h1" className="book-title">
        {book.title}
      </Typography>
      <Typography variant="body2" component="p" className="book-description">
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
    </Grid>
  );
}
