import { renderWithRouterAndProvider } from "../testHelpers.js";
import userEvent from "@testing-library/user-event";
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
  it("renders input", () => {
    const props = {
      term: { value: "" },
      handleSearch: jest.fn(),
    };
    const { container } = renderWithRouterAndProvider(<SearchBox {...props} />);
    const input = container.querySelector('input[type="text"]');
    userEvent.type(input, "domain");
    expect(props.handleSearch).toHaveBeenCalled();
  });

  it("trims empty strings", () => {
    const props = {
      term: { value: ""},
      handleSearch: jest.fn(),
    };
    const { container } = renderWithRouterAndProvider(<SearchBox {...props} />);
    const input = container.querySelector('input[type="text"]');
    userEvent.type(input, "   ");
    expect(props.handleSearch).not.toHaveBeenCalled();
  });
});
