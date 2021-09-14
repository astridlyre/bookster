import {
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { withBookSelector } from "../redux/selector.js";

const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: "border-box",
  },
  title: {
    maxHeight: 30,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  link: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "inherit",
  },
  showMore: {
    color: theme.palette.text.secondary,
    fontWeight: "600",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: theme.typography.fontFamily,
    outlineColor: theme.palette.secondary.main,
    display: "inline",
  },
}));

export default function BookCard({ bookId }) {
  const classes = useStyles();
  const [showFull, setShowFull] = useState(false);
  const history = useHistory();
  const book = useSelector(withBookSelector(bookId));

  const getDescriptionFor = book => {
    let text = book.description || book.title;
    if (!text) text = "";
    if (showFull || text.length < 80) return text;
    return `${text.substring(0, 80)}... `;
  };
  const goToBook = () => history.push(`/books/${book.id}`);

  return (
    <Grid item xs={12} sm={6} md={4} className={`${classes.root} book-item`}>
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {book.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="book-description"
          >
            {getDescriptionFor(book)}
            {book?.description?.length > 80 && (
              <button
                title={showFull ? "Show less" : "Show more"}
                className={`${classes.showMore} show-more`}
                onClick={() => setShowFull(s => !s)}
              >
                {showFull ? "(less)" : "(more)"}
              </button>
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="inherit"
            data-test="view-details"
            onClick={goToBook}
            title={`View details on ${book.title}`}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
