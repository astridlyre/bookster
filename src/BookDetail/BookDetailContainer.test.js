import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom";
import { renderWithRouterAndProvider } from "../testHelpers.js";
import BookDetailContainer from "./BookDetailContainer";
import config from "../config.js";

describe("BookDetailContainer", () => {
  it("renders", async () => {
    const props = {
      match: {
        params: {
          id: 2,
        },
      },
    };
    const mock = new MockAdapter(axios);
    mock.onGet(`${config.endpoint}/books/${props.match.params.id}`).reply(200, {
      title: "Acceptance tests driven development with React",
      description: "Test description",
      id: 2,
    });
    const { findByText } = renderWithRouterAndProvider(
      <BookDetailContainer {...props} />
    );
    const book = await findByText(
      "Acceptance tests driven development with React"
    );
    expect(book).toBeInTheDocument();
  });
});