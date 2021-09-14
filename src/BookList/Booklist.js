import { Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BookCard from "./BookCard.js";
import Loader from "../Loader/Loader.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    color: theme.palette.text.secondary,
    paddingTop: theme.spacing(3),
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
    <Container>
      <Grid
        data-test="book-list"
        container
        spacing={3}
        className={classes.paper}
      >
        {books.map(book => (
          <BookCard key={book.id} bookId={book.id} />
        ))}
      </Grid>
    </Container>
  );
}
