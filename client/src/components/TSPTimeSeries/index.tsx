import { useFetch } from "../../hooks";
import TimeSeriesChart from "./AreaChart";
import { Card, Button, StateDisplay } from "../ui";
import { TimeSeriesData } from "./types";
import { Size } from "../types";

const TransactionsPerSecond = ({ width, height }: Size) => {
  const [data, loading, error, fetchData] = useFetch<Array<TimeSeriesData>>(
    "/api/analytics/transactionsPerSecond"
  );

  return (
    <Card width={width + 60} height={height + 60}>
      <StateDisplay
        loading={loading}
        error={!!error}
        empty={!data || !data.success}
        loadingMessage="Fetching data..."
        emptyMessage={
          <div className="flex flex-col gap-3 w-[60%]">
            <span className="text-gray-400">
              The time series data is currently being generated. This process
              typically takes about 1.5 to 2 minutes.
            </span>
            <div>
              <Button
                label="Refresh"
                size="small"
                variant="secondary"
                onClick={fetchData}
              />
            </div>
          </div>
        }
        errorMessage={error}
      >
        {data && (
          <TimeSeriesChart data={data.data} width={width} height={height} />
        )}
      </StateDisplay>
    </Card>
  );
};

export default TransactionsPerSecond;
