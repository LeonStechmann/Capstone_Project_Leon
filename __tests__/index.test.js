import {render, screen} from "@testing-library/react";

import PastRoutes from "../pages/previous-routes";
import "@testing-library/jest-dom";

describe("PasRoutes", () => {
  it("renders invisible h1.", () => {
    render(<PastRoutes />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });
});
