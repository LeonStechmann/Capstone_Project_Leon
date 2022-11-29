import {render, screen} from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders home h1", () => {
    render(<Home />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });
});
