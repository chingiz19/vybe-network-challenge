import { useFetch } from "../../hooks";
import BarChart from "./BarChart";
import { Card, StateDisplay } from "../ui";
import { WalletData } from "./types";
import { Size } from "../types";

/**
 * The bar chart visualizing the USD balances of the wallets might appear unbalanced or “off” for the following reasons:
 *
 * 1. **Significant Disparity in Values**: The USD balances of the wallets vary significantly. For instance, one wallet has a balance of approximately $788.6 million,
 * while others have balances as low as $2 or $0.
 * This large disparity in values causes the bars representing smaller balances to be almost invisible or very small compared to those representing the larger balances.
 *
 * 2. **Only SOL values of wallets**: The chart only displays SOL values of wallets that not always have too much SOL in their balance.
 * This can further exaggerate the visual disparity between wallets with large and small balances.
 */

const Top10WalletSolBalances = ({ width, height }: Size) => {
  const [data, loading, error] = useFetch<Array<WalletData>>(
    "/api/analytics/walletBalance"
  );

  return (
    <Card width={width + 60} height={height + 60}>
      <StateDisplay
        loading={loading}
        error={!!error}
        empty={!data || !data.success}
        emptyMessage={data?.message}
        loadingMessage="Fetching data..."
        errorMessage={error}
      >
        {data && <BarChart data={data.data} width={width} height={height} />}
      </StateDisplay>
    </Card>
  );
};

export default Top10WalletSolBalances;
