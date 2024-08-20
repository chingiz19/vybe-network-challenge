import Chart from "react-apexcharts";
import { MarketCapDistribution } from "./types";

const PieChart = ({
  data,
  width,
  height,
}: {
  data: Array<MarketCapDistribution>;
  width: number;
  height: number;
}) => {
  const options = {
    labels: data.map((token) => token.name),
    legend: {
      position: "right" as const,
      offsetY: 40,
    },
    title: {
      text: "Market Cap Distribution of SPL Tokens",
      align: "center" as const,
    },
  };

  const series = data.map((token) => token.marketCapInUSD);

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      width={width}
      height={height}
    />
  );
};

export default PieChart;
