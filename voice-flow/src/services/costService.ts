// src/services/costService.ts

// Claude 3.5 Sonnet pricing (as of March 2025)
const CLAUDE_PRICING = {
  inputPerMillion: 3,      // $3 per 1M input tokens
  outputPerMillion: 15     // $15 per 1M output tokens
};

export const costService = {
  calculateTokenCost(inputTokens: number, outputTokens: number): number {
    const inputCost = (inputTokens / 1_000_000) * CLAUDE_PRICING.inputPerMillion;
    const outputCost = (outputTokens / 1_000_000) * CLAUDE_PRICING.outputPerMillion;
    return parseFloat((inputCost + outputCost).toFixed(6));
  },

  formatCost(cost: number): string {
    return `$${cost.toFixed(4)}`;
  },

  formatCostCents(cost: number): string {
    return `${(cost * 100).toFixed(1)}¢`;
  },

  getMonthKey(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  },

  getDayKey(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }
};
