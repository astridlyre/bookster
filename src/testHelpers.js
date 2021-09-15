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
    image: "",
    description:
      "The book about how to do refactoring with a very long title that has a lot of ch... Show more",
    reviews: [
      {
        name: "Juntao",
        content: "Excellent work, really impressed by your efforts",
        id: 1,
        bookId: 1,
        createdAt: new Date().toISOString(),
      },
      {
        name: "Abruzzi",
        content: "What a great book!",
        id: 2,
        bookId: 1,
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 3,
    title: "Building Microservices",
    description: "Author Sam Newman",
    image: "",
    reviews: [],
  },
  {
    id: 2,
    title: "Acceptance tests driven development with React",
    description: "Test description",
    image: "",
    reviews: [],
  },
];

export const testReviews = [
  {
    name: "Juntao",
    content: "Excellent work, really impressed by your efforts",
    id: 1,
    bookId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    name: "Abruzzi",
    content: "What a great book!",
    id: 2,
    bookId: 1,
    createdAt: new Date().toISOString(),
  },
];
