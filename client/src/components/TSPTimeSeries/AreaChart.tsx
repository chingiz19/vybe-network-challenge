import Chart from "react-apexcharts";
import { TimeSeriesData } from "./types";

type Props = {
  data: TimeSeriesData[];
  height: number;
  width: number;
};

/**
 * This time series chart is designed for in-memory data and is primarily intended for demo purposes.
 * Since the data is not expected to span multiple days, we are displaying only the time (hours and minutes)
 * on the x-axis, omitting the date. This simplifies the visualization and makes it easier to focus on
 * short-term trends, such as transactions per second (TPS) within a single day.
 *
 * In a production environment with data spanning multiple days, it would be advisable to include both
 * the date and time on the x-axis for clarity.
 */
const TPSAreaChart = ({ data, height, width }: Props) => {
  const options = {
    chart: {
      type: "area" as const,
      zoom: {
        enabled: false,
      },
      toolbar: { show: false }, // Disable the burger menu (toolbar)
    },
    xaxis: {
      type: "category" as const,
      categories: data.map((point) =>
        new Date(point.timestamp).toLocaleTimeString()
      ),
      labels: {
        format: "HH:mm", // Display only the time (hours and minutes)
      },
    },
    yaxis: {
      title: {
        text: "Average Transactions per Second",
      },
    },
    title: {
      text: "Solana TPS Over Time",
      align: "center" as const,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth" as const,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "TPS",
      data: data.map((point) => point.value),
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width={width}
      height={height}
    />
  );
};

export default TPSAreaChart;
