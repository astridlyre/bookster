import {
  Button,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: "border-box",
  },
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
    color: theme.palette.text.secondary,
    fontWeight: "600",
    cursor: "pointer",
  },
}));

export default function BookCard({ book }) {
  const classes = useStyles();
  const [showFull, setShowFull] = useState(false);
  const getDescriptionFor = book => book.description || book.name;

  return (
    <Grid item xs={4} sm={4} className={`${classes.root} book-item`}>
      <Card>
        <CardActionArea>
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
              <span
                title={showFull ? "Show less" : "Show more"}
                className={`${classes.showMore} show-more`}
                onClick={() => setShowFull(s => !s)}
              >
                {showFull ? "Show less" : "Show more"}
              </span>
            )}
          </CardContent>
        </CardActionArea>
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
