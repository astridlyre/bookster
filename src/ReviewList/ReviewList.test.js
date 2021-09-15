import { testReviews, renderWithProvider } from "../testHelpers.js";
import ReviewList from "./ReviewList.js";
import "@testing-library/jest-dom";

describe("ReviewList", () => {
  it("renders an empty list", () => {
    const props = {
      reviews: [],
    };
    const { container } = renderWithProvider(<ReviewList {...props} />);
    const reviews = container.querySelector('[data-test="reviews-container"]');
    expect(reviews).toBeInTheDocument();
  });

  it("renders a list when data is passed", async () => {
    const props = {
      reviews: testReviews,
    };
    const { container, findByText } = renderWithProvider(
      <ReviewList {...props} />
    );
    const reviews = container.querySelectorAll(
      '[data-test="reviews-container"] [data-test="review"]'
    );
    expect(reviews.length).toBe(2);
    const name = await findByText(testReviews[0].name);
    const content = await findByText(testReviews[0].content);
    expect(name).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
