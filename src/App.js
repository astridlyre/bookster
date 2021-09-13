import { Route, Switch } from "react-router-dom";
import { Typography } from "@material-ui/core";
import BooklistContainer from "./BookList/BooklistContainer.js";
import BookDetailContainer from "./BookDetail/BookDetailContainer.js";

function App() {
  return (
    <div>
      <Typography variant="h2" component="h2" data-test="heading">
        Bookish
      </Typography>
      <Switch>
        <Route exact path="/" component={BooklistContainer} />
        <Route path="/books/:id" component={BookDetailContainer} />
      </Switch>
    </div>
  );
}

export default App;
