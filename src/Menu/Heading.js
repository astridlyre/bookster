import { useHistory } from "react-router-dom";
import {
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BookIcon from "./BookIcon.js";

const useStyles = makeStyles(theme => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Heading({ text }) {
  const showText = useMediaQuery("(min-width: 601px)");
  const classes = useStyles();
  const history = useHistory();

  const goHome = () => history.push("/");

  if (!showText) {
    return (
      <IconButton
        color="inherit"
        className={classes.iconButton}
        title="Home page"
        onClick={goHome}
        data-test="heading"
      >
        <BookIcon />
      </IconButton>
    );
  }

  return (
    <Button startIcon={<BookIcon />} color="inherit" onClick={goHome}>
      <Typography variant="h6" component="h2" data-test="heading">
        {text}
      </Typography>
    </Button>
  );
}
