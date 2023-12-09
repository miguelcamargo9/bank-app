import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import Header from "./Header";
import Footer from "./Footer";

jest.mock("./Header", () => () => <header>Mock Header</header>);
jest.mock("./Footer", () => () => <footer>Mock Footer</footer>);

describe("Layout component", () => {
  it("renders without crashing", () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByRole("banner")).toHaveTextContent("Mock Header");
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Mock Footer");
  });

  it("renders children content", () => {
    const testContent = "Test Child Content";
    render(
      <Layout>
        <div>{testContent}</div>
      </Layout>
    );
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it("has correct style classes", () => {
    const { container } = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(container.firstChild).toHaveClass("layout");
    expect(screen.getByRole("main")).toHaveClass("mainContent");
  });
});
