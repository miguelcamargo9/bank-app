import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ModalConfirm from "./ModalConfirm";

describe("ModalConfirm component", () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();
  const childContent = "Test Child Content";

  it("renders when show is true", () => {
    render(
      <ModalConfirm show={true} onClose={onClose} onConfirm={onConfirm}>
        {childContent}
      </ModalConfirm>
    );
    expect(screen.getByText(childContent)).toBeInTheDocument();
  });

  it("does not render when show is false", () => {
    render(
      <ModalConfirm show={false} onClose={onClose} onConfirm={onConfirm}>
        {childContent}
      </ModalConfirm>
    );
    expect(screen.queryByText(childContent)).toBeNull();
  });

  it("calls onClose when the backdrop is clicked", () => {
    render(
      <ModalConfirm show={true} onClose={onClose} onConfirm={onConfirm}>
        {childContent}
      </ModalConfirm>
    );
    fireEvent.click(screen.getByTestId("modal-backdrop"));
    expect(onClose).toHaveBeenCalled();
  });

  it("does not close when modal content is clicked", () => {
    render(
      <ModalConfirm show={true} onClose={onClose} onConfirm={onConfirm}>
        {childContent}
      </ModalConfirm>
    );
    fireEvent.click(screen.getByTestId("modal-content"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    render(
      <ModalConfirm show={true} onClose={onClose} onConfirm={onConfirm}>
        {childContent}
      </ModalConfirm>
    );
    fireEvent.click(screen.getByText("Confirmar"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("calls onClose when cancel button is clicked", () => {
    render(
      <ModalConfirm show={true} onClose={onClose} onConfirm={onConfirm}>
        {childContent}
      </ModalConfirm>
    );
    fireEvent.click(screen.getByText("Cancelar"));
    expect(onClose).toHaveBeenCalled();
  });
});
