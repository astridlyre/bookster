import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Review from "./Review.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexFlow: "column nowrap",
    gap: theme.spacing(2),
    width: "100%",
  },
}));

export default function ReviewList({ reviews }) {
  const classes = useStyles();

  const reviewsToShow = () =>
    reviews && reviews.length > 0 ? (
      reviews.map(review => <Review review={review} key={review.id} />)
    ) : (
      <Typography>No reviews yet</Typography>
    );

  return (
    <Grid
      container
      data-test="reviews-container"
      direction="column"
      className={classes.root}
    >
      <Typography variant="h4" component="h2">
        Reviews
      </Typography>
      {reviewsToShow()}
    </Grid>
  );
}
