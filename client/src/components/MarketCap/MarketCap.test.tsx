/**
 * Note: Mocking `react-apexcharts` to avoid issues during testing.
 * For detailed explanation, see the mock module itself.
 */

import { render, screen } from "@testing-library/react";
import MarketCap from "./";
import { useFetch } from "../../hooks";
import ApexCharts from "react-apexcharts";

// Mock the `useFetch` hook
jest.mock("../../hooks", () => ({
  useFetch: jest.fn(),
}));

describe("MarketCap Component", () => {
  const mockData = {
    success: true,
    data: [
      { name: "Token A", marketCapInUSD: 1500000000 },
      { name: "Token B", marketCapInUSD: 2500000000 },
    ],
    message: "Data loaded successfully",
  };

  it("should display loading state", () => {
    (useFetch as jest.Mock).mockReturnValue([null, true, null]);

    render(<MarketCap height={400} width={600} />);

    expect(screen.getByText("Fetching data...")).toBeInTheDocument();
    expect(screen.queryByTestId("mocked-apexchart")).not.toBeInTheDocument();
  });

  it("should display error state", () => {
    (useFetch as jest.Mock).mockReturnValue([null, false, "Error occurred"]);

    render(<MarketCap height={400} width={600} />);

    expect(screen.getByText("Error occurred")).toBeInTheDocument();
    expect(screen.queryByTestId("mocked-apexchart")).not.toBeInTheDocument();
  });

  it("should display empty state", () => {
    (useFetch as jest.Mock).mockReturnValue([
      { success: false, message: "Server provided message/reason" },
      false,
      null,
    ]);

    render(<MarketCap height={400} width={600} />);

    expect(
      screen.getByText("Server provided message/reason")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("mocked-apexchart")).not.toBeInTheDocument();
  });

  it("should display PieChart when data is loaded", () => {
    (useFetch as jest.Mock).mockReturnValue([mockData, false, null]);

    render(<MarketCap height={400} width={600} />);

    expect(screen.getByTestId("mocked-apexchart")).toBeInTheDocument();

    // We are verifying only the essential parts of the options object related to the labels, legend, and chart title.
    // This ensures that these critical configurations are correctly passed to the ApexCharts component,
    // while allowing flexibility for other non-essential options to vary without breaking the test.
    const expectedOptions = {
      labels: mockData.data.map((token) => token.name),
      legend: {
        position: "right",
        offsetY: 40,
      },
      title: {
        text: "Market Cap Distribution of SPL Tokens",
        align: "center",
      },
    };

    const expectedSeries = mockData.data.map((token) => token.marketCapInUSD);

    expect(ApexCharts).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining(expectedOptions),
        series: expectedSeries,
        type: "pie",
      }),
      {}
    );
  });
});
