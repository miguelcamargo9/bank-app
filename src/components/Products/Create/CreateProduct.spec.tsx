import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CreateProduct from "./CreateProduct";
import { createProduct } from "../../../services/productsService";
import { useNavigate } from "react-router-dom";

jest.mock("../../../services/productsService");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("CreateProduct component", () => {
  // Mock data and functions
  const mockCreateProduct = createProduct as jest.Mock;
  const mockNavigate = useNavigate as jest.Mock;

  beforeEach(() => {
    mockCreateProduct.mockClear();
    mockNavigate.mockClear();
    render(<CreateProduct />);
  });

  it("renders form fields and buttons", () => {
    expect(screen.getByLabelText("ID del producto:")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre del producto:")).toBeInTheDocument();
    expect(screen.getByLabelText("Descripción:")).toBeInTheDocument();
    expect(screen.getByLabelText("Logo (URL):")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de liberación:")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de revisión:")).toBeInTheDocument();
    expect(screen.getByText("Agregar Producto")).toBeInTheDocument();
    expect(screen.getByText("Regresar")).toBeInTheDocument();
  });

  it("updates product state on input change", () => {
    fireEvent.change(screen.getByLabelText("ID del producto:"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("Nombre del producto:"), {
      target: { value: "Producto Test" },
    });
    expect(screen.getByLabelText("ID del producto:")).toHaveValue("123");
    expect(screen.getByLabelText("Nombre del producto:")).toHaveValue(
      "Producto Test"
    );
  });

  it("shows validation errors for empty fields on submit", async () => {
    fireEvent.click(screen.getByText("Agregar Producto"));
    await waitFor(() => {
      expect(screen.getByText("El campo Id es requerido")).toBeInTheDocument();
      expect(
        screen.getByText("El campo Name es requerido")
      ).toBeInTheDocument();
    });
  });

  it("calls createProduct on form submission with valid data", async () => {
    fireEvent.change(screen.getByLabelText("ID del producto:"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("Nombre del producto:"), {
      target: { value: "Producto Test" },
    });
    fireEvent.change(screen.getByLabelText("Descripción:"), {
      target: { value: "Descripción Test" },
    });
    fireEvent.change(screen.getByLabelText("Logo (URL):"), {
      target: { value: "Logo Test" },
    });
    fireEvent.change(screen.getByLabelText("Fecha de liberación:"), {
      target: { value: "2021-10-10" },
    });
    fireEvent.change(screen.getByLabelText("Fecha de revisión:"), {
      target: { value: "2021-10-10" },
    });
    fireEvent.click(screen.getByText("Agregar Producto"));

    await waitFor(() =>
      expect(mockCreateProduct).toHaveBeenCalledWith({
        id: "123",
        name: "Producto Test",
        description: "Descripción Test",
        logo: "Logo Test",
        date_release: "2021-10-10",
        date_revision: "2021-10-10",
      })
    );
  });

  it("resets form on reset button click", () => {
    fireEvent.change(screen.getByLabelText("ID del producto:"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText("Reiniciar"));
    expect(screen.getByLabelText("ID del producto:")).toHaveValue("");
  });
});
