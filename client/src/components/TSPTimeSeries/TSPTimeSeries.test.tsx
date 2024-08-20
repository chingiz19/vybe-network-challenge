/**
 * Note: Mocking `react-apexcharts` to avoid issues during testing.
 * For detailed explanation, see the mock module itself.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import TransactionsPerSecond from "./";
import { useFetch } from "../../hooks";
import ApexCharts from "react-apexcharts";

// Mock the `useFetch` hook
jest.mock("../../hooks", () => ({
  useFetch: jest.fn(),
}));

describe("TransactionsPerSecond Component", () => {
  const mockData = {
    success: true,
    data: [
      { timestamp: 1627895640000, value: 2500 },
      { timestamp: 1627895700000, value: 2400 },
      { timestamp: 1627895760000, value: 2600 },
    ],
  };

  it("should display loading state", () => {
    (useFetch as jest.Mock).mockReturnValue([null, true, null, jest.fn()]);

    render(<TransactionsPerSecond width={600} height={400} />);

    expect(screen.getByText("Fetching data...")).toBeInTheDocument();
    expect(screen.queryByTestId("mocked-apexchart")).not.toBeInTheDocument();
  });

  it("should display error state", () => {
    (useFetch as jest.Mock).mockReturnValue([
      null,
      false,
      "Error occurred",
      jest.fn(),
    ]);

    render(<TransactionsPerSecond width={600} height={400} />);

    expect(screen.getByText("Error occurred")).toBeInTheDocument();
    expect(screen.queryByTestId("mocked-apexchart")).not.toBeInTheDocument();
  });

  it("should display empty state with refresh button when data is not ready", () => {
    (useFetch as jest.Mock).mockReturnValue([
      { success: false },
      false,
      null,
      jest.fn(),
    ]);

    render(<TransactionsPerSecond width={600} height={400} />);

    expect(
      screen.getByText(/The time series data is currently being generated/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Refresh/i })
    ).toBeInTheDocument();
    expect(screen.queryByTestId("mocked-apexchart")).not.toBeInTheDocument();
  });

  it("should call fetchData when Refresh button is clicked", () => {
    const mockFetchData = jest.fn();

    (useFetch as jest.Mock).mockReturnValue([
      { success: false },
      false,
      null,
      mockFetchData,
    ]);

    render(<TransactionsPerSecond width={600} height={400} />);

    const refreshButton = screen.getByRole("button", { name: /Refresh/i });
    fireEvent.click(refreshButton);

    expect(mockFetchData).toHaveBeenCalledTimes(1);
  });

  it("should display TimeSeriesChart when data is loaded", () => {
    (useFetch as jest.Mock).mockReturnValue([mockData, false, null, jest.fn()]);

    render(<TransactionsPerSecond width={600} height={400} />);

    expect(screen.getByTestId("mocked-apexchart")).toBeInTheDocument();

    // We are verifying only the essential parts of the options object related to the x-axis, y-axis, and chart title.
    // This ensures that these critical configurations are correctly passed to the ApexCharts component,
    // while allowing flexibility for other non-essential options to vary without breaking the test.
    const expectedOptions = {
      xaxis: {
        type: "category",
        categories: mockData.data.map((point) =>
          new Date(point.timestamp).toLocaleTimeString()
        ),
        labels: {
          format: "HH:mm",
        },
      },
      yaxis: {
        title: {
          text: "Average Transactions per Second",
        },
      },
      title: {
        text: "Solana TPS Over Time",
        align: "center",
      },
    };

    const expectedSeries = [
      {
        name: "TPS",
        data: mockData.data.map((point) => point.value),
      },
    ];

    expect(ApexCharts).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining(expectedOptions),
        series: expectedSeries,
        type: "area",
      }),
      {}
    );
  });
});
