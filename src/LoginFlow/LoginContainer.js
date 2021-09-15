import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserSelector } from "../redux/selector.js";
import { getProfile } from "../redux/actions/actions.js";
import { STATUS_FAILED } from "../redux/types.js";
import Login from "./Login.js";
import Register from "./Register.js";

export default function LoginContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isRegistering, setIsRegistering] = useState(false);
  const currentUser = useSelector(currentUserSelector);
  const hasFailed = currentUser.status === STATUS_FAILED;

  useEffect(() => {
    if (!currentUser.loggedIn) {
      dispatch(getProfile());
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (currentUser.loggedIn) {
      history.push("/");
    }
  }, [currentUser, history]);

  return isRegistering ? (
    <Register setIsRegistering={setIsRegistering} hasFailed={hasFailed} />
  ) : (
    <Login setIsRegistering={setIsRegistering} hasFailed={hasFailed} />
  );
}
