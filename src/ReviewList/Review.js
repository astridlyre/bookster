import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserSelector } from "../redux/selector.js";
import { updateReview } from "../redux/actions/actions.js";
import { formatDistanceToNow } from "date-fns";
import { Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Bubble from "../Bubble/Bubble.js";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "relative",
  },
  details: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  createdAt: {
    color: theme.palette.secondary.dark,
    marginLeft: theme.spacing(1),
    flexGrow: 1,
  },
}));

export default function Review({ review }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(review.content);
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentUser = useSelector(currentUserSelector);

  const handleEditing = async () => {
    if (isEditing === true) {
      dispatch(updateReview({ ...review, content }));
      return setIsEditing(false);
    }
    return setIsEditing(true);
  };

  return (
    <Bubble className={classes.root} dataTest="review">
      {isEditing ? (
        <TextField
          value={content}
          multiline
          variant="filled"
          fullWidth
          label="Edit Review"
          onChange={event => setContent(event.target.value)}
          data-test="review-content-input"
        />
      ) : (
        <Typography variant="body2" component="p" data-test="review-content">
          {content}
        </Typography>
      )}
      <Typography
        variant="subtitle2"
        color="secondary"
        className={classes.details}
      >
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
        {currentUser.id === review.userId && (
          <Button
            onClick={handleEditing}
            color="secondary"
            className={classes.edit}
            data-test="review-edit-button"
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        )}
      </Typography>
    </Bubble>
  );
}
