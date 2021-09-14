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

export function renderWithRouterAndProvider(component, mockStore) {
  return {
    ...render(
      <Provider store={mockStore ? mockStore : store}>
        <Router>{component}</Router>
      </Provider>
    ),
  };
}

export const testBooks = [
  {
    id: 1,
    title: "Refactoring",
    description:
      "The book about how to do refactoring with a very long title that has a lot of ch... (more)",
  },
  {
    id: 3,
    title: "Building Microservices",
    description: "Author Sam Newman",
  },
  {
    id: 2,
    title: "Acceptance tests driven development with React",
    description: "Test description",
  },
];

export const testReviews = [
  {
    name: "Juntao",
    date: "2018/06/21",
    content: "Excellent work, really impressed by your efforts",
  },
  {
    name: "Abruzzi",
    date: "2018/06/22",
    content: "What a great book!",
  },
];
