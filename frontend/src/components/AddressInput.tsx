import React, { useState } from "react";
import { isValidSolanaAddress } from "../utils/validateAddress";

export default function AddressInput({
  address,
  onChange,
  onSubmit,
}: {
  address: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  const [error, setError] = useState("");

  function handleFetch() {
    if (!isValidSolanaAddress(address)) {
      setError("Invalid Solana address");
      return;
    }
    setError("");
    onSubmit();
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-xl">
      <div className="flex gap-3">
        <input
          value={address}
          onChange={(e) => {
            setError("");
            onChange(e.target.value);
          }}
          placeholder="Wallet address..."
          className="flex-1 px-4 py-3 rounded border dark:bg-gray-800 dark:text-gray-100"
        />
        <button
          onClick={handleFetch}
          className="px-4 py-3 bg-indigo-600 text-white rounded"
        >
          Fetch
        </button>
      </div>

      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
}
