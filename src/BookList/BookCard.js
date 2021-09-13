import {
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  title: {
    maxHeight: 30,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  description: {
    maxHeight: 40,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  descriptionFull: {},
  link: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "inherit",
  },
  showMore: {
    color: "#8f8f8f",
    background: "none",
    border: "none",
    padding: 0,
    display: "inline",
    fontSize: "0.85rem",
    cursor: "pointer",
  },
}));

export default function BookCard({ book }) {
  const classes = useStyles();
  const [showFull, setShowFull] = useState(false);
  const getDescriptionFor = book => book.description || book.name;

  return (
    <Grid item xs={4} sm={4} className="book-item">
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
            className={`${
              showFull ? classes.descriptionFull : classes.description
            } book-description`}
          >
            {getDescriptionFor(book)}
          </Typography>
          {book?.description?.length > 80 && (
            <button
              title={showFull ? "Show less" : "Show more"}
              className={`${classes.showMore} show-more`}
              onClick={() => setShowFull(s => !s)}
            >
              {showFull ? "Show less" : "Show more"}
            </button>
          )}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <Link to={`/books/${book.id}`} className={classes.link}>
              View Details
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
