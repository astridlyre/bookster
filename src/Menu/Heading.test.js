import { render } from "@testing-library/react";
import Heading from "./Heading.js";

describe("Heading", () => {
  it("renders", () => {
    const props = {
      text: "Bookster",
    };
    const { container } = render(<Heading {...props} />);
    const title = container.querySelector('[data-test="heading"]');
    expect(title).toBeTruthy();
  });
});
