import { useState } from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchBox from "../SearchBox/SearchBox.js";
import Heading from "./Heading.js";
import UserActions from "./UserActions.js";
import config from "../config.js";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Menu({ term, setTerm }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = event => setAnchorEl(event.currentTarget);

  const menuId = "primary-search-account-menu";

  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Heading text={config.siteName} />
          <SearchBox term={term} onSearch={setTerm} />
          <div className={classes.grow} />
          <IconButton
            edge="end"
            aria-label="Account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            data-test="user-actions"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <UserActions
        handleMenuClose={handleMenuClose}
        anchorEl={anchorEl}
        menuId={menuId}
      />
    </div>
  );
}
