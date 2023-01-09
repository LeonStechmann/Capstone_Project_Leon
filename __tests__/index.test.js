import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/Header";

describe("Home", () => {
  it("renders image", () => {
    render(<Header />);

    const heading = screen.getByRole("img");

    expect(heading).toBeInTheDocument();
  });
});
