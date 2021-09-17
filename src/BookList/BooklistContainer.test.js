import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom";
import { renderWithProvider } from "../testHelpers.js";
import BooklistContainer from "./BooklistContainer.js";
import config from "../config.js";

describe("BooklistContainer", () => {
  it("renders", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${config.endpoint}/books`).reply(200, {
      books: [
        {
          title: "Refactoring",
          id: 1,
          description: "Test description",
          image: "",
        },
        {
          title: "Acceptance tests driven development with React",
          id: 2,
          description: "Test description",
          image: "",
        },
      ],
    });
    const { findByText } = renderWithProvider(<BooklistContainer />);
    const book1 = await findByText("Refactoring");
    const book2 = await findByText(
      "Acceptance tests driven development with React"
    );
    expect(book1).toBeInTheDocument();
    expect(book2).toBeInTheDocument();
  });

  it("handles error", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${config.endpoint}/books`).networkError();
    const props = {error: true}
    const { findByText } = renderWithProvider(<BooklistContainer {...props}/>);
    const error = await findByText("an Error has occured");
    expect(error).toBeInTheDocument();
  });
});
