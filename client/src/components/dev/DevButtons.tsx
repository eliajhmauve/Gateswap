// client/src/components/dev/DevButtons.tsx

import React from "react";
import { useLocation } from "wouter";
import { useVerification } from "@/lib/useVerification";
import { useTaskProgress } from "@/lib/useTaskProgress";

export const DevButtons = () => {
  if (import.meta.env.MODE !== "development") return null;

  const [, navigate] = useLocation();
  const { completeVerification } = useVerification();
  const { setTaskCompleted } = useTaskProgress();

  const handleVerify = async () => {
    try {
      // 调用验证函数
      const success = await completeVerification("0x7f...3e4a");
      
      if (success) {
        // 重置任务状态
        setTaskCompleted(false);
        localStorage.setItem("taskCompleted", "false");
        
        // 等待状态更新完成
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // 导航到 swap 页面
        navigate("/swap");
      }
    } catch (error) {
      console.error("验证过程出错:", error);
    }
  };

  const handleCompleteSwap = () => {
    // 更新任务状态
    setTaskCompleted(true);
    localStorage.setItem("taskCompleted", "true");
    
    // 延迟导航确保状态更新
    setTimeout(() => navigate("/success"), 100);
  };

  return (
    <div className="mt-6 flex flex-col gap-4">
      <button
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded transition"
        onClick={handleVerify}
      >
        ✅ Dev: Skip Verification (simulate success)
      </button>
    </div>
  );
};
