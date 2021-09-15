import { Grid, Typography, Paper, Container, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { currentUserSelector } from "../redux/selector.js";
import { useSelector } from "react-redux";
import defaultPic from "./DefaultPic.png";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8),
  },
  pic: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

export default function Profile() {
  const classes = useStyles();
  const currentUser = useSelector(currentUserSelector);

  return (
    <Container maxWidth="md">
      <Paper className={classes.root}>
        <Typography variant="h2" component="h1" gutterBottom>
          Profile
        </Typography>
        <Grid container>
          <Avatar
            size="lg"
            src={currentUser.photoUrl || defaultPic}
            alt="Your profile"
            className={classes.pic}
          />
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              component="p"
              data-test="profile-username"
            >
              Username: {currentUser.username}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              component="p"
              data-test="profile-email"
            >
              Email: {currentUser.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
