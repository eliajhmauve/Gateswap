import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema that includes verification status
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isVerified: boolean("is_verified").notNull().default(false),
  walletAddress: text("wallet_address"),
  verificationDate: text("verification_date"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isVerified: true,
  walletAddress: true,
  verificationDate: true,
});

// Swap schema to track swap transactions
export const swaps = pgTable("swaps", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  fromToken: text("from_token").notNull(),
  toToken: text("to_token").notNull(),
  fromAmount: text("from_amount").notNull(),
  toAmount: text("to_amount").notNull(),
  txHash: text("tx_hash"),
  timestamp: text("timestamp").notNull(),
});

export const insertSwapSchema = createInsertSchema(swaps).pick({
  userId: true,
  fromToken: true,
  toToken: true,
  fromAmount: true,
  toAmount: true,
  txHash: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSwap = z.infer<typeof insertSwapSchema>;
export type Swap = typeof swaps.$inferSelect;
