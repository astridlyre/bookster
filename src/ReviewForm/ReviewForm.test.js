import { renderWithProvider, testBooks } from "../testHelpers.js";
import "@testing-library/jest-dom";
import ReviewForm from "./ReviewForm.js";

describe("ReviewForm", () => {
  it("renders review form", () => {
    const props = {
      bookId: testBooks[0].id,
    };
    const { container } = renderWithProvider(<ReviewForm {...props} />);
    const form = container.querySelector("form");
    const contentTextArea = container.querySelector('textarea[name="content"]');
    const submitButton = container.querySelector('button[name="submit"]');
    expect(form).toBeInTheDocument();
    expect(contentTextArea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
