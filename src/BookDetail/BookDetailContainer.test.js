import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom";
import { renderWithRouterAndProvider, testBooks } from "../testHelpers.js";
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
    mock
      .onGet(`${config.endpoint}/books/${props.match.params.id}`)
      .reply(200, { book: testBooks[2] });
    const { findByText } = renderWithRouterAndProvider(
      <BookDetailContainer {...props} />
    );
    const book = await findByText(testBooks[2].title);
    expect(book).toBeInTheDocument();
  });
});
