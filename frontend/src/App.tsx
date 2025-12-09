import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import AddressInput from "./components/AddressInput";
import DarkModeToggle from "./components/DarkModeToggle";
import BalanceCard from "./components/BalanceCard";
import TransactionList from "./components/TransactionList";
import BalanceChart from "./components/BalanceChart";
import Loader from "./components/Loader";
import { getWalletBalance, getTransactions } from "./api";
import SplashScreen from "./components/SplashScreen";
import Footer from "./components/Footer";

export default function App() {

  const [showSplash, setShowSplash] = useState(true);
  const [selected, setSelected] = useState("dashboard");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null as any);
  const [txs, setTxs] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  async function fetchAll() {
    if (!address) return;
    setLoading(true);
    try {
      const b = await getWalletBalance(address);
      const t = await getTransactions(address);
      setBalance(b);
      setTxs(t);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <Sidebar selected={selected} setSelected={setSelected} />

      <main className="flex-1 p-8 pb-20">
        <div className="flex justify-between mb-6">
          <AddressInput
            address={address}
            onChange={setAddress}
            onSubmit={fetchAll}
          />
          <DarkModeToggle />
        </div>

        {loading && <Loader />}

        {selected === "dashboard" && balance && (
          <>
            <BalanceCard data={balance} />
            <div className="mt-6">
              <BalanceChart
                points={[
                  { time: 1, sol: balance.sol },
                  { time: 2, sol: balance.sol + 0.1 }
                ]}
              />
            </div>
          </>
        )}

        {selected === "transactions" && <TransactionList txs={txs} />}

        <Footer />
      </main>
    </div>
  );
}