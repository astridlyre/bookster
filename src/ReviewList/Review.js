import { formatDistanceToNow } from "date-fns";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Bubble from "../Bubble/Bubble.js";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  createdAt: {
    color: theme.palette.secondary.light,
    fontSize: "0.8rem",
    marginLeft: theme.spacing(1),
  },
}));

export default function Review({ review }) {
  const classes = useStyles();

  return (
    <Bubble className={`${classes.root} review`}>
      <Typography variant="body2" component="p" data-test="review-content">
        {review.content}
      </Typography>
      <Typography variant="subtitle2" color="secondary">
        -{" "}
        <Typography component="span" data-test="review-name">
          {review.name}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          className={classes.createdAt}
        >
          {formatDistanceToNow(new Date(review.createdAt), {
            addSuffix: true,
          })}
        </Typography>
      </Typography>
    </Bubble>
  );
}
