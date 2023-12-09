import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination component", () => {
  const mockOnPageChange = jest.fn();
  const mockOnItemsPerPageChange = jest.fn();
  const itemsPerPage = 10;
  const totalItems = 50;
  const currentPage = 3;

  beforeEach(() => {
    render(
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={mockOnPageChange}
        onItemsPerPageChange={mockOnItemsPerPageChange}
      />
    );
  });

  it("renders correct number of pages", () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    expect(screen.getAllByRole("listitem")).toHaveLength(totalPages);
  });

  it("calls onPageChange with correct page number", () => {
    const pageNumber = 2;
    fireEvent.click(screen.getByText(pageNumber));
    expect(mockOnPageChange).toHaveBeenCalledWith(pageNumber);
  });

  it("changes items per page on select change", () => {
    fireEvent.change(screen.getByRole("combobox"), { target: { value: 20 } });
    expect(mockOnItemsPerPageChange).toHaveBeenCalledWith(20);
  });

  it("applies active class to current page", () => {
    expect(screen.getByText(currentPage)).toHaveClass("activePage");
  });
});
