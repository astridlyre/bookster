import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: "#8f8f8f",
    background: "none",
    border: "none",
    cursor: "pointer",
    outline: "none",
    padding: theme.spacing(0.25),
    display: "inline",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  },
}));

export default function SizeLimitedText({ text, size, textProps }) {
  const classes = useStyles();
  const [showFull, setShowFull] = useState(false);

  const textToShow =
    text.length <= size || showFull ? text : `${text.substring(0, size)}...`;

  return (
    <Box>
      <Typography variant="body2" component="p" {...textProps}>
        {textToShow}
        {text.length > size && (
          <>
            {" "}
            <button
              className={`${classes.link} show-more`}
              onClick={() => setShowFull(s => !s)}
            >
              {showFull ? "Show less" : "Show more"}
            </button>
          </>
        )}
      </Typography>
    </Box>
  );
}
