import { useFetch } from "../../hooks";
import PieChart from "./PieChart";
import { Card, StateDisplay } from "../ui";
import { MarketCapDistribution } from "./types";
import { Size } from "../types";

const MarketCap = ({ height, width }: Size) => {
  const [data, loading, error] = useFetch<Array<MarketCapDistribution>>(
    "/api/analytics/marketCapDistribution"
  );

  return (
    <Card width={width} height={height}>
      <StateDisplay
        loading={loading}
        error={!!error}
        empty={!data || !data.success}
        loadingMessage="Fetching data..."
        emptyMessage={data?.message || "No data available"}
        errorMessage={error}
      >
        {data && <PieChart data={data.data} height={height} width={width} />}
      </StateDisplay>
    </Card>
  );
};

export default MarketCap;
