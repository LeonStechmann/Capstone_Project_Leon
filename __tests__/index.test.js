import {render, screen} from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders div", () => {
    render(<Home />);

    const container = screen.getByRole("div");

    expect(container).toBeInTheDocument();
  });
});
