import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  currentUserSelector,
  loginStatusSelector,
  registerStatusSelector,
} from "../redux/selector.js";
import { getProfile } from "../redux/actions/actions.js";
import Login from "./Login.js";
import Register from "./Register.js";

export default function LoginContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(currentUserSelector);
  const loginStatus = useSelector(loginStatusSelector);
  const registerStatus = useSelector(registerStatusSelector);
  const [isRegistering, setIsRegistering] = useState(false);

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
    <Register
      setIsRegistering={setIsRegistering}
      hasFailed={loginStatus.error}
    />
  ) : (
    <Login
      setIsRegistering={setIsRegistering}
      hasFailed={registerStatus.error}
    />
  );
}
