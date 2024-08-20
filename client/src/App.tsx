import Header from "./components/Header";
import MarketCap from "./components/MarketCap";
import TSPTimeSeries from "./components/TSPTimeSeries";
import Top10Wallets from "./components/Top10Wallets";

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-3 mt-3">
        <div className="flex flex-col gap-3 justify-center items-center xl:flex-row">
          <MarketCap height={520} width={540} />
          <Top10Wallets height={520} width={540} />
        </div>
        <div className="flex justify-center">
          <TSPTimeSeries height={520} width={710} />
        </div>
      </main>
    </>
  );
}

export default App;
