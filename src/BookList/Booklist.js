import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BookCard from "./BookCard.js";
import Loader from "../Loader/Loader.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: "100vw",
    margin: "0",
  },
}));

export default function Booklist({ books, loading, error }) {
  const classes = useStyles();

  if (error) {
    return <p data-test="error-message">an Error has occured</p>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div data-test="book-list" className={classes.root}>
      <Grid container spacing={3} className={classes.paper}>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </Grid>
    </div>
  );
}
