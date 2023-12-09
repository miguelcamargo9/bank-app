import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  it("renders without crashing", () => {
    render(<Header />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  it("displays logo image", () => {
    render(<Header />);
    const logoImage = screen.getByRole("img", { name: "Logo" });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src");
    expect(logoImage).toHaveAttribute("alt", "Logo");
  });

  it("has correct style classes", () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toHaveClass("header");
    const logoImage = screen.getByRole("img", { name: "Logo" });
    expect(logoImage).toHaveClass("logo");
  });
});
