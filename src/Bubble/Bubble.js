import { Box } from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    background: alpha(theme.palette.secondary.light, 0.1),
    borderRadius: theme.spacing(0.5),
    boxShadow: "0 8px 24px -2px rgba(0, 0, 0, 0.05)",
  },
}));

export default function Bubble({ children }) {
  const classes = useStyles();

  return <Box className={classes.root}>{children}</Box>;
}
