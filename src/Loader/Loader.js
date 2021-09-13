import { CircularProgress, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Loader() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress color="secondary" />
      <Typography
        variant="h4"
        component="h2"
        color="inherit"
        data-test="loading-message"
      >
        Loading
      </Typography>
    </Box>
  );
}
