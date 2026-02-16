import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "./Pagination";

// Mock the CSS module
jest.mock("./Pagination.module.scss", () => ({
  paginationWrapper: "mock-pagination-wrapper",
  selectWrapper: "mock-select-wrapper",
  pageControls: "mock-page-controls",
  pageBtn: "mock-page-btn",
  active: "mock-active",
  arrowBtn: "mock-arrow-btn",
}));

jest.mock("../SelectInput/SelectInput", () => {
  return function MockSelectInput({
    value,
    onChange,
    options,
  }: {
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
  }) {
    return (
      <select
        data-testid="select-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };
});

describe("Pagination Component", () => {
  const defaultProps = {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 1,
    setCurrentPage: jest.fn(),
    setItemsPerPage: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Positive scenarios
  it("renders pagination with correct total pages calculation", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText("out of 100")).toBeInTheDocument();
  });

  it("handles page navigation correctly", () => {
    render(<Pagination {...defaultProps} currentPage={5} />);

    const pageButton = screen.getByTestId("page-1");
    fireEvent.click(pageButton);

    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1);
  });

  it("handles items per page change", () => {
    render(<Pagination {...defaultProps} />);

    const select = screen.getByTestId("select-input");
    fireEvent.change(select, { target: { value: "30" } });

    expect(defaultProps.setItemsPerPage).toHaveBeenCalledWith(30);
    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1);
  });

  it("shows ellipsis for large page counts", () => {
    render(<Pagination {...defaultProps} totalItems={1000} currentPage={50} />);

    expect(screen.getAllByText("...")).toHaveLength(2);
  });

  it("disables navigation buttons correctly", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const prevButton = screen.getByText("<");
    expect(prevButton).toBeDisabled();

    const nextButton = screen.getByText(">");
    expect(nextButton).not.toBeDisabled();
  });

  it("highlights current page", () => {
    render(<Pagination {...defaultProps} currentPage={3} />);

    const currentPageButton = screen.getByText("3");
    expect(currentPageButton).toHaveClass("mock-active");
  });

  // Negative scenarios
  it("handles navigation beyond boundaries gracefully", () => {
    render(<Pagination {...defaultProps} currentPage={10} />);

    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);

    expect(defaultProps.setCurrentPage).not.toHaveBeenCalled();
  });

  it("handles zero total items", () => {
    render(<Pagination {...defaultProps} totalItems={0} />);

    expect(screen.getByText("out of 0")).toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  it("handles single page scenario", () => {
    render(<Pagination {...defaultProps} totalItems={5} itemsPerPage={10} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });
});


