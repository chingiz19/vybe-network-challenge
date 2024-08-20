import Chart from "react-apexcharts";
import { WalletData } from "./types";

type Props = {
  data: WalletData[];
  height: number;
  width: number;
};

const WalletBarChart = ({ data, height, width }: Props) => {
  const options = {
    chart: {
      type: "bar" as const,
      toolbar: { show: false }, // Disable the burger menu (toolbar)
    },
    xaxis: {
      categories: data.map(
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
      align: "center" as const,
    },
    dataLabels: { enabled: false },
    plotOptions: { bar: { horizontal: false } },
  };

  const series = [
    {
      name: "SOL Balance",
      data: data.map((wallet) => wallet.usd),
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
      width={width}
    />
  );
};

export default WalletBarChart;
