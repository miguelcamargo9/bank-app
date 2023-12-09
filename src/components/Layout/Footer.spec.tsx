import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  it("displays copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Copyright © 2023 My Bank Application/i)
    ).toBeInTheDocument();
  });

  it("displays author name", () => {
    render(<Footer />);
    expect(screen.getByText("Miguel Camargo")).toBeInTheDocument();
  });

  it("has correct style classes", () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toHaveClass("footer");
    expect(screen.getByText("Miguel Camargo")).toHaveClass("authorName");
  });
});
