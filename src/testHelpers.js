import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";

export function renderWithRouter(component) {
  return { ...render(<Router>{component}</Router>) };
}

export function renderWithProvider(component) {
  return { ...render(<Provider store={store}>{component}</Provider>) };
}

export function renderWithRouterAndProvider(component) {
  return {
    ...render(
      <Provider store={store}>
        <Router>{component}</Router>
      </Provider>
    ),
  };
}
