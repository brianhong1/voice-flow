// src/services/claudeService.ts
import { TONE_DESCRIPTIONS } from '../types';

interface ClaudeResponse {
  rewrittenText: string;
  inputTokens: number;
  outputTokens: number;
}

const TONE_PROMPTS: { [key: string]: string } = {
  Professional: 'Rewrite this in a professional, polished tone suitable for executives and formal business contexts. Use industry terminology and maintain a formal structure.',
  Casual: 'Rewrite this in a casual, relaxed tone. Make it conversational and approachable while maintaining clarity.',
  Formal: 'Rewrite this in a formal business tone. Use precise language, structured sentences, and maintain a professional distance.',
  'Sales-Focused': 'Rewrite this with a sales and persuasion focus. Emphasize benefits, create urgency, and drive action. Target decision-makers.',
  Technical: 'Rewrite this in a technical, detailed tone. Focus on architecture, systems, and Salesforce platform specifics. Include relevant terminology.',
  Conversational: 'Rewrite this in an engaging, conversational tone. Use storytelling, keep readers engaged, and maintain an accessible voice.'
};

export const claudeService = {
  async rewrite(
    text: string,
    tone: string,
    apiKey: string
  ): Promise<ClaudeResponse> {
    const startTime = performance.now();

    const systemPrompt = TONE_PROMPTS[tone] || TONE_PROMPTS.Professional;
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: `Please rewrite the following text:\n\n"${text}"`
            }
          ]
        })
      });

      const processingTime = performance.now() - startTime;

      if (!response.ok) {
        const errorData = await response.json() as any;
        throw {
          status: response.status,
          message: errorData.error?.message || 'Unknown API error',
          type: errorData.error?.type || 'unknown_error',
          processingTime
        };
      }

      const data = await response.json() as any;
      const rewrittenText = data.content[0].text;
      const inputTokens = data.usage.input_tokens;
      const outputTokens = data.usage.output_tokens;

      return {
        rewrittenText,
        inputTokens,
        outputTokens
      };
    } catch (error: any) {
      throw {
        status: error.status || 500,
        message: error.message || 'Failed to rewrite text',
        type: error.type || 'api_error',
        processingTime: performance.now() - startTime
      };
    }
  }
};
