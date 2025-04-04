// client/src/components/dev/DevButtons.tsx

import React from "react";

export const DevButtons = () => {
  if (import.meta.env.MODE !== "development") return null;

  const handleVerify = () => {
    localStorage.setItem("verified", "true");
    localStorage.setItem("taskCompleted", "false");
    window.location.href = "/swap";
  };

  const handleCompleteSwap = () => {
    localStorage.setItem("taskCompleted", "true");
    window.location.href = "/success";
  };

  return (
    <div className="mt-6 flex flex-col gap-4">
      <button
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded transition"
        onClick={handleVerify}
      >
        ✅ Dev: Skip Verification (simulate success)
      </button>

      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
        onClick={handleCompleteSwap}
      >
        🎯 Dev: Mark Swap as Completed (go to /success)
      </button>
    </div>
  );
};
