import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getSwapQuote } from "./services/oneInchService";

// In-memory storage for user verification and task status
// In a production app, this would be stored in a database
const userVerificationStatus: Record<string, {
  verified: boolean;
  taskCompleted: boolean;
  timestamp: number;
}> = {};

export async function registerRoutes(app: Express): Promise<Server> {
  // Quote API endpoint for 1inch swap
  app.get("/api/quote", async (req, res) => {
    try {
      const { fromToken, toToken, amount } = req.query;
      
      if (!fromToken || !toToken || !amount) {
        return res.status(400).json({ 
          message: "Missing required parameters: fromToken, toToken, amount" 
        });
      }
      
      const quote = await getSwapQuote(
        fromToken as string,
        toToken as string,
        amount as string
      );
      
      return res.json(quote);
    } catch (error) {
      console.error("Error getting swap quote:", error);
      return res.status(500).json({ 
        message: "Failed to get swap quote", 
        error: (error as Error).message 
      });
    }
  });

  // Verification API endpoint for Self Protocol verification
  app.post("/api/verify", (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.body;
      
      if (!walletAddress) {
        return res.status(400).json({
          message: "Missing required parameter: walletAddress"
        });
      }
      
      // Simulate verification process
      // In a real app, this would communicate with Self Protocol SDK
      console.log(`Verifying wallet address: ${walletAddress}`);
      
      // Store the verification status
      userVerificationStatus[walletAddress] = {
        verified: true,
        taskCompleted: false, // Initially the swap task is not completed
        timestamp: Date.now()
      };
      
      // Always returns success for simulation purposes
      return res.json({ 
        verified: true,
        walletAddress
      });
    } catch (error) {
      console.error("Error during verification:", error);
      return res.status(500).json({
        message: "Verification failed",
        error: (error as Error).message
      });
    }
  });

  // Task status API endpoint
  app.get("/api/task-status", (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.query;
      
      // If no walletAddress is provided, use session-based status
      if (!walletAddress) {
        // Check if we have session data (in a real app)
        // For demo purposes, provide default status
        return res.json({
          verified: true,
          taskCompleted: false
        });
      }
      
      // Check if we have status for this wallet
      const userStatus = userVerificationStatus[walletAddress as string];
      
      if (!userStatus) {
        return res.json({
          verified: false,
          taskCompleted: false
        });
      }
      
      return res.json({
        verified: userStatus.verified,
        taskCompleted: userStatus.taskCompleted
      });
    } catch (error) {
      console.error("Error getting task status:", error);
      return res.status(500).json({
        message: "Failed to get task status",
        error: (error as Error).message
      });
    }
  });

  // Update task completion status
  app.post("/api/complete-task", (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.body;
      
      if (!walletAddress) {
        return res.status(400).json({
          message: "Missing required parameter: walletAddress"
        });
      }
      
      // Get existing status or create new entry
      const userStatus = userVerificationStatus[walletAddress] || {
        verified: true,
        taskCompleted: false,
        timestamp: Date.now()
      };
      
      // Update task completion status
      userStatus.taskCompleted = true;
      userVerificationStatus[walletAddress] = userStatus;
      
      return res.json({
        success: true,
        walletAddress,
        taskCompleted: true
      });
    } catch (error) {
      console.error("Error completing task:", error);
      return res.status(500).json({
        message: "Failed to update task completion status",
        error: (error as Error).message
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
