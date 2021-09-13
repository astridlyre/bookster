import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

export function renderWithRouter(component) {
  return { ...render(<Router>{component}</Router>) };
}
