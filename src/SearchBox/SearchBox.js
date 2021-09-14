import { useState } from "react";
import { useSelector } from "react-redux";
import { searchTermSelector } from "../redux/selector.js";
import { useHistory, useLocation } from "react-router-dom";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { InputBase, CircularProgress } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function SearchBox({ handleSearch }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [isSearching, setIsSearching] = useState(false);
  const term = useSelector(searchTermSelector);

  const startSearching = () => setTimeout(() => setIsSearching(null), 250);

  const protect = event => {
    if (isSearching) {
      clearTimeout(isSearching);
    }
    if (event.target.value === " ") return;
    setIsSearching(startSearching());
    const value = event.target.value.trim();
    if (location.pathname !== "/") history.push("/");
    handleSearch(value);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search..."
          title="Search for a book"
          value={term.value}
          data-test="search"
          onChange={protect}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      {isSearching && <CircularProgress size="2rem" color="secondary" />}
    </>
  );
}
