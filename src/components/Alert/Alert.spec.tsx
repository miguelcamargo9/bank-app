import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Alert from "./Alert";

describe("Alert component", () => {
  const message = "Test message";
  const onClose = jest.fn();

  it("renders with message", () => {
    render(<Alert message={message} onClose={onClose} type="success" />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("closes on click", () => {
    render(<Alert message={message} onClose={onClose} type="success" />);
    fireEvent.click(screen.getByText(message));
    expect(onClose).toHaveBeenCalled();
  });

  it("closes automatically after 3 seconds", () => {
    jest.useFakeTimers();
    render(<Alert message={message} onClose={onClose} type="success" />);
    expect(onClose).not.toHaveBeenCalled();
    jest.advanceTimersByTime(3000);
    expect(onClose).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it("applies correct styles for type", () => {
    const { container } = render(
      <Alert message={message} onClose={onClose} type="error" />
    );
    expect(container.firstChild).toHaveClass("alert error");
  });
});
