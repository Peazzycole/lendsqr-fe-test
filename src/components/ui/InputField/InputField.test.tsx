import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputField } from "@/components/ui";

// Mock the CSS module
jest.mock("./InputField.module.scss", () => ({
  inputContainer: "mock-input-container",
  label: "mock-label",
  input: "mock-input",
  placeholder: "mock-placeholder",
  toggle: "mock-toggle",
  errorField: "mock-error-field",
  errorMessage: "mock-error-message",
  animateInputPlaceholder: "mock-animate-placeholder",
  defaultPlaceholder: "mock-default-placeholder",
}));

describe("InputField Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with required props", () => {
    render(
      <InputField
        label="Email"
        value="test@example.com"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("applies custom styles", () => {
    render(
      <InputField
        label="Custom Input"
        value=""
        onChange={mockOnChange}
        height="50px"
        borderRadius="10px"
        border="2px solid red"
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveStyle({
      height: "50px",
      borderRadius: "10px",
      border: "2px solid red",
    });
  });

  it("handles input changes", () => {
    render(<InputField label="Name" value="" onChange={mockOnChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "John Doe" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("shows password toggle for password type", () => {
    render(
      <InputField
        label="Password"
        type="password"
        value="secret"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText("SHOW")).toBeInTheDocument();
    expect(screen.getByDisplayValue("secret")).toHaveAttribute(
      "type",
      "password"
    );
  });

  it("toggles password visibility", () => {
    render(
      <InputField
        label="Password"
        type="password"
        value="secret"
        onChange={mockOnChange}
      />
    );

    const toggleButton = screen.getByText("SHOW");
    const input = screen.getByDisplayValue("secret");

    fireEvent.click(toggleButton);
    expect(screen.getByText("HIDE")).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(screen.getByText("HIDE"));
    expect(screen.getByText("SHOW")).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
  });

  it("displays error message and applies error styling", () => {
    render(
      <InputField
        label="Email"
        value=""
        onChange={mockOnChange}
        error="Email is required"
      />
    );

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("mock-error-field");
  });

  it("handles missing optional props", () => {
    render(<InputField label="Basic" value="" onChange={mockOnChange} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "");
    expect(screen.queryByText("SHOW")).not.toBeInTheDocument();
  });

  it("applies animate placeholder class when enabled", () => {
    render(
      <InputField
        label="Animated"
        value=""
        onChange={mockOnChange}
        animatePlaceholder={true}
      />
    );

    expect(screen.getByRole("textbox")).toHaveClass("mock-animate-placeholder");
  });
});
