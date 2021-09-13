import { Link } from "react-router-dom";
import {
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BookIcon from "./BookIcon.js";

const useStyles = makeStyles(theme => ({
  link: {
    color: "inherit",
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Heading({ text }) {
  const showText = useMediaQuery("(min-width: 601px)");
  const classes = useStyles();

  if (!showText) {
    return (
      <IconButton
        color="inherit"
        className={classes.iconButton}
        title="Home page"
      >
        <Link to={"/"} className={classes.link}>
          <BookIcon />
        </Link>
      </IconButton>
    );
  }

  return (
    <Button startIcon={<BookIcon />} color="inherit">
      <Typography variant="h6" component="h2" data-test="heading">
        <Link to={"/"} className={classes.link}>
          {text}
        </Link>
      </Typography>
    </Button>
  );
}
