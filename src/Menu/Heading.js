import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function Heading({ text }) {
  const classes = useStyles();

  return (
    <Button color="inherit">
      <Typography
        variant="h6"
        component="h2"
        data-test="heading"
        className={classes.root}
      >
        <Link to={"/"} className={classes.link}>
          {text}
        </Link>
      </Typography>
    </Button>
  );
}
