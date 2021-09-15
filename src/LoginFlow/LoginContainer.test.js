import axios from "axios";
import {
  createMockStore,
  renderWithRouterAndProvider,
} from "../testHelpers.js";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginContainer from "./LoginContainer.js";
import config from "../config.js";

const TEST_LOGIN = {
  username: "juntao",
  password: "123456",
};

const TEST_REGISTER = {
  username: "juntao",
  password: "123456",
  email: "juntao@email.com",
  confirmPassword: "123456",
};

describe("LoginContainer", () => {
  it("renders login form", () => {
    const store = createMockStore({ currentUser: {} });
    const { container } = renderWithRouterAndProvider(
      <LoginContainer />,
      store
    );
    const loginButton = container.querySelector('[data-test="login-submit"]');
    expect(loginButton.textContent).toEqual("Login");
  });

  it("calls login API", () => {
    axios.post = jest.fn().mockImplementation(() =>
      Promise.resolve({
        data: { username: TEST_LOGIN.username, token: "hello" },
      })
    );
    const store = createMockStore({ currentUser: {} });
    const { container } = renderWithRouterAndProvider(
      <LoginContainer />,
      store
    );
    const usernameInput = container.querySelector(
      '[data-test="login-username"] input'
    );
    const passwordInput = container.querySelector(
      '[data-test="login-password"] input'
    );
    const submit = container.querySelector('[data-test="login-submit"]');
    userEvent.type(usernameInput, TEST_LOGIN.username);
    userEvent.type(passwordInput, TEST_LOGIN.password);
    userEvent.click(submit);
    expect(axios.post).toHaveBeenCalledWith(
      `${config.endpoint}/users/login`,
      TEST_LOGIN
    );
  });

  it("shows signup form", () => {
    const store = createMockStore({ currentUser: {} });
    const { container } = renderWithRouterAndProvider(
      <LoginContainer />,
      store
    );
    const signUpButton = container.querySelector(
      '[data-test="register-button"]'
    );
    userEvent.click(signUpButton);
    const emailInput = container.querySelector('[data-test="register-email"]');
    expect(emailInput).toBeInTheDocument();
  });

  it("calls register API", () => {
    axios.post = jest.fn().mockImplementation(() =>
      Promise.resolve({
        data: { username: TEST_REGISTER.username, token: "hello" },
      })
    );
    const store = createMockStore({ currentUser: {} });
    const { container } = renderWithRouterAndProvider(
      <LoginContainer />,
      store
    );
    const signUpButton = container.querySelector(
      '[data-test="register-button"]'
    );
    userEvent.click(signUpButton);
    const usernameInput = container.querySelector(
      '[data-test="register-username"] input'
    );
    const emailInput = container.querySelector(
      '[data-test="register-email"] input'
    );
    const passwordInput = container.querySelector(
      '[data-test="register-password"] input'
    );
    const confirmPasswordInput = container.querySelector(
      '[data-test="register-confirm-password"] input'
    );
    const submit = container.querySelector('[data-test="register-submit"]');
    userEvent.type(usernameInput, TEST_REGISTER.username);
    userEvent.type(emailInput, TEST_REGISTER.email);
    userEvent.type(passwordInput, TEST_REGISTER.password);
    userEvent.type(confirmPasswordInput, TEST_REGISTER.confirmPassword);
    userEvent.click(submit);
    expect(axios.post).toHaveBeenCalledWith(
      `${config.endpoint}/users/register`,
      TEST_REGISTER
    );
  });
});
