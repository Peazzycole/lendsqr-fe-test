import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "@/components/ui";

// Mock the CSS module
jest.mock("./Button.module.scss", () => ({
  button: "mock-button-class",
}));

describe("Button Component", () => {
  // Positive scenarios
  it("renders with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  it("applies custom styles correctly", () => {
    render(
      <Button backgroundColor="#ff0000" textColor="#000000" height="60px">
        Custom Button
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      backgroundColor: "#ff0000",
      color: "#000000",
      height: "60px",
    });
  });

  it("handles click events", () => {
    const mockClick = jest.fn();
    render(<Button onClick={mockClick}>Clickable</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("renders React node children", () => {
    render(
      <Button>
        <span data-testid="icon">🚀</span>
        Launch
      </Button>
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Launch")).toBeInTheDocument();
  });

  // Negative scenarios
  it("handles missing onClick gracefully", () => {
    render(<Button>No Handler</Button>);

    expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();
  });

  it("handles empty children", () => {
    render(<Button>{null}</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("");
  });

  it("applies CSS module class", () => {
    render(<Button>Styled</Button>);

    expect(screen.getByRole("button")).toHaveClass("mock-button-class");
  });
});
