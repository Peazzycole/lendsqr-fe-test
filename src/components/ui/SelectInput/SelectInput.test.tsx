import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectInput from "./SelectInput";

// Mock the CSS module
jest.mock("./SelectInput.module.scss", () => ({
  selectWrapper: "mock-select-wrapper",
  selectBox: "mock-select-box",
  options: "mock-options",
  top: "mock-top",
}));

jest.mock("lucide-react", () => ({
  ChevronDown: () => <div data-testid="chevron-down">↓</div>,
  ChevronUp: () => <div data-testid="chevron-up">↑</div>,
}));

describe("SelectInput Component", () => {
  const mockOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  // Positive scenarios
  it("renders with placeholder when no value selected", () => {
    render(
      <SelectInput
        placeholder="Select an option"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText("Select an option")).toBeInTheDocument();
    expect(screen.getByTestId("chevron-down")).toBeInTheDocument();
  });

  it("displays selected value instead of placeholder", () => {
    render(
      <SelectInput
        placeholder="Select an option"
        options={mockOptions}
        value="option2"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText("option2")).toBeInTheDocument();
    expect(screen.queryByText("Select an option")).not.toBeInTheDocument();
  });

  it("toggles dropdown on click", () => {
    render(
      <SelectInput
        placeholder="Select"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    const selectBox = screen.getByText("Select");

    // Initially closed
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.getByTestId("chevron-down")).toBeInTheDocument();

    // Click to open
    fireEvent.click(selectBox);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByTestId("chevron-up")).toBeInTheDocument();

    // Click to close
    fireEvent.click(selectBox);
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.getByTestId("chevron-down")).toBeInTheDocument();
  });

  it("selects option and calls onChange", () => {
    render(
      <SelectInput
        placeholder="Select"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    // Open dropdown
    fireEvent.click(screen.getByText("Select"));

    // Select an option
    fireEvent.click(screen.getByText("Option 2"));

    expect(mockOnChange).toHaveBeenCalledWith("option2");
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument(); // Dropdown should close
  });

  it("applies top direction class when specified", () => {
    render(
      <SelectInput
        placeholder="Select"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        direction="top"
      />
    );

    // Open dropdown
    fireEvent.click(screen.getByText("Select"));

    const optionsList = screen.getByRole("list");
    expect(optionsList).toHaveClass("mock-top");
  });

  // Negative scenarios
  it("handles empty options array", () => {
    render(
      <SelectInput
        placeholder="No options"
        options={[]}
        value=""
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByText("No options"));

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("handles missing direction prop (defaults to bottom)", () => {
    render(
      <SelectInput
        placeholder="Select"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByText("Select"));

    const optionsList = screen.getByRole("list");
    expect(optionsList).not.toHaveClass("mock-top");
  });

  it("renders all options correctly", () => {
    render(
      <SelectInput
        placeholder="Select"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByText("Select"));

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });
});
