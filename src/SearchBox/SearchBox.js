import { TextField } from "@material-ui/core";
import { isEmpty, clone } from "lodash";

export default function SearchBox({ term, onSearch }) {
  const protect = event => {
    const value = clone(event.target.value);
    if (!isEmpty(value.trim())) {
      return onSearch(event);
    }
  };

  return (
    <TextField
      label="Search"
      value={term}
      data-test="search"
      onChange={protect}
      margin="normal"
      variant="outlined"
    />
  );
}
