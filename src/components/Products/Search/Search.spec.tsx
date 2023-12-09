import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./Search";

describe("Search component", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    render(<Search onSearch={mockOnSearch} />);
  });

  it("renders the search input", () => {
    const inputEl = screen.getByPlaceholderText("Buscar productos financieros");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });

  it("updates on input change", () => {
    const inputEl = screen.getByPlaceholderText("Buscar productos financieros");
    fireEvent.change(inputEl, { target: { value: "test query" } });
    expect(inputEl.value).toBe("test query");
  });

  it("calls onSearch on input change", () => {
    const inputEl = screen.getByPlaceholderText("Buscar productos financieros");
    fireEvent.change(inputEl, { target: { value: "test query" } });
    expect(mockOnSearch).toHaveBeenCalledWith("test query");
  });
});
