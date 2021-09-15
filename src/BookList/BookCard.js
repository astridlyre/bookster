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
import { useSelector } from "react-redux";
import { withBookSelector } from "../redux/selector.js";
import SizeLimitedText from "../Text/SizeLimitedText.js";

const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: "border-box",
  },
  title: {
    maxHeight: 30,
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: theme.spacing(2),
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
    padding: theme.spacing(0.25),
    fontFamily: theme.typography.fontFamily,
    outline: "none",
    display: "inline",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  },
  img: {
    height: "8rem",
    float: "left",
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function BookCard({ bookId }) {
  const classes = useStyles();
  const history = useHistory();
  const book = useSelector(withBookSelector(bookId));

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
          <img src={book.image} alt={book.title} className={classes.img} />
          <SizeLimitedText
            text={book.description || book.title || ""}
            textProps={{ className: "book-description" }}
            size={80}
            variant="body2"
          />
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
