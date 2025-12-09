import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { useEffect, useState, useMemo } from "react";

export default function BalanceChart({ points }: { points: any[] }) {
  const [usdPrice, setUsdPrice] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
      .then((r) => r.json())
      .then((p) => setUsdPrice(p.solana.usd))
      .catch(() => {});
  }, []);

  const enriched = useMemo(() => {
    return points.map((p) => ({
      ...p,
      usd: usdPrice ? p.sol * usdPrice : null
    }));
  }, [points, usdPrice]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">
        Balance Trend
      </h3>

      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <AreaChart data={enriched}>
            <defs>
              <linearGradient id="solGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

            <XAxis dataKey="time" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
            <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />

            <Tooltip
              contentStyle={{
                background: "#1f2937",
                border: "1px solid #4b5563",
                color: "#f3f4f6",
                borderRadius: "8px"
              }}
              formatter={(v: number) => [`${v.toFixed(4)} SOL`, "Balance"]}
            />

            <Area
              type="monotone"
              dataKey="sol"
              stroke="#6366F1"
              strokeWidth={3}
              fill="url(#solGradient)"
              animationDuration={600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}