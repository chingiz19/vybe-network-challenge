/**
 * Note: Mocking `react-apexcharts` to avoid issues during testing.
 * For detailed explanation, see the mock module itself.
 */

import { render, screen } from "@testing-library/react";
import Top10WalletSolBalances from "./";
import { useFetch } from "../../hooks";
import ApexCharts from "react-apexcharts";

// Mock the `useFetch` hook
jest.mock("../../hooks", () => ({
  useFetch: jest.fn(),
}));

describe("Top10WalletSolBalances Component", () => {
  const mockData = {
    success: true,
    data: [
      { address: "Wallet 1", sol: 5327603.47226213, usd: 788645142 },
      { address: "Wallet 2", sol: 0.251, usd: 37 },
      { address: "Wallet 3", sol: 1026.096269186, usd: 151893 },
      { address: "Wallet 4", sol: 2.60486179, usd: 386 },
      { address: "Wallet 5", sol: 4.290899032, usd: 635 },
    ],
  };

  it("should display loading state", () => {
    (useFetch as jest.Mock).mockReturnValue([null, true, null]);

    render(<Top10WalletSolBalances width={600} height={400} />);

    expect(screen.getByText("Fetching data...")).toBeInTheDocument();
    expect(screen.queryByTestId("mocked-apexchart")).not.toBeInTheDocument();
  });

  it("should display error state", () => {
    (useFetch as jest.Mock).mockReturnValue([null, false, "API Error message"]);

    render(<Top10WalletSolBalances width={600} height={400} />);

    expect(screen.getByText("API Error message")).toBeInTheDocument();
    expect(screen.queryByTestId("mocked-apexchart")).not.toBeInTheDocument();
  });

  it("should display empty state when no data", () => {
    (useFetch as jest.Mock).mockReturnValue([{ success: false }, false, null]);

    render(<Top10WalletSolBalances width={600} height={400} />);

    expect(screen.getByText("No data available")).toBeInTheDocument();
    expect(screen.queryByTestId("mocked-apexchart")).not.toBeInTheDocument();
  });

  it("should display empty state - server provided message when no data", () => {
    (useFetch as jest.Mock).mockReturnValue([
      { success: false, message: "Server message" },
      false,
      null,
    ]);

    render(<Top10WalletSolBalances width={600} height={400} />);

    expect(screen.getByText("Server message")).toBeInTheDocument();
    expect(screen.queryByTestId("mocked-apexchart")).not.toBeInTheDocument();
  });

  it("should display BarChart when data is loaded", () => {
    (useFetch as jest.Mock).mockReturnValue([mockData, false, null]);

    render(<Top10WalletSolBalances width={600} height={400} />);

    expect(screen.getByTestId("mocked-apexchart")).toBeInTheDocument();

    // We are verifying only the essential parts of the options object related to the x-axis, y-axis, and chart title.
    // This ensures that these critical configurations are correctly passed to the ApexCharts component,
    // while allowing flexibility for other non-essential options to vary without breaking the test.
    const expectedOptions = {
      xaxis: {
        categories: mockData.data.map(
          ({ address }) => `${address.slice(0, 4)}...${address.slice(-4)}`
        ),
      },
      yaxis: {
        title: {
          text: "SOL Balance (in USD)",
        },
      },
      title: {
        text: "SOL Balances of 10 Wallets in USD",
        align: "center",
      },
    };

    const expectedSeries = [
      {
        name: "SOL Balance",
        data: mockData.data.map((wallet) => wallet.usd),
      },
    ];

    expect(ApexCharts).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining(expectedOptions),
        series: expectedSeries,
        type: "bar",
      }),
      {}
    );
  });
});
