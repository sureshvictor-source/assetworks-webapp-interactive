import Anthropic from '@anthropic-ai/sdk';

// Lazy initialize Anthropic client
let anthropic: Anthropic | null = null;

function getAnthropicClient(): Anthropic {
  if (!anthropic) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY environment variable is not set');
    }
    anthropic = new Anthropic({ apiKey });
  }
  return anthropic;
}

export interface AIOptions {
  model?: string;
  max_tokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

/**
 * Generate AI response using Anthropic Claude
 */
export async function generateAIResponse(
  prompt: string,
  options: AIOptions = {}
): Promise<string> {
  const {
    model = 'claude-3-haiku-20240307',
    max_tokens = 1000,
    temperature = 0.7,
    systemPrompt = 'You are a helpful financial analysis assistant.',
  } = options;

  try {
    const client = getAnthropicClient();
    const response = await client.messages.create({
      model,
      max_tokens,
      temperature,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract text from response
    const content = response.content[0];
    if (content.type === 'text') {
      return content.text;
    }

    throw new Error('Unexpected response format from AI');
  } catch (error) {
    console.error('AI generation failed:', error);
    throw error;
  }
}

/**
 * Stream AI response for real-time generation
 */
export async function* streamAIResponse(
  prompt: string,
  options: AIOptions = {}
): AsyncGenerator<string, void, unknown> {
  const {
    model = 'claude-3-haiku-20240307',
    max_tokens = 1000,
    temperature = 0.7,
    systemPrompt = 'You are a helpful financial analysis assistant.',
  } = options;

  try {
    const stream = await anthropic.messages.create({
      model,
      max_tokens,
      temperature,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        yield chunk.delta.text;
      }
    }
  } catch (error) {
    console.error('AI streaming failed:', error);
    throw error;
  }
}

/**
 * Analyze sentiment of text
 */
export async function analyzeSentiment(text: string): Promise<number> {
  const prompt = `Analyze the sentiment of this text and return ONLY a number between -1 (very negative) and 1 (very positive):

${text}`;

  try {
    const response = await generateAIResponse(prompt, {
      model: 'claude-3-haiku-20240307',
      max_tokens: 10,
      temperature: 0.1,
    });

    const sentiment = parseFloat(response.trim());
    return isNaN(sentiment) ? 0 : Math.max(-1, Math.min(1, sentiment));
  } catch (error) {
    console.error('Sentiment analysis failed:', error);
    return 0;
  }
}

/**
 * Extract structured data from text
 */
export async function extractStructuredData<T>(
  text: string,
  schema: string,
  examples?: string
): Promise<T | null> {
  const prompt = `Extract structured data from the following text according to this schema:

Schema:
${schema}

${examples ? `Examples:\n${examples}\n` : ''}

Text:
${text}

Return ONLY valid JSON matching the schema.`;

  try {
    const response = await generateAIResponse(prompt, {
      model: 'claude-3-haiku-20240307',
      max_tokens: 2000,
      temperature: 0.3,
    });

    // Find JSON in response
    const jsonMatch = response.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('No JSON found in response');
      return null;
    }

    return JSON.parse(jsonMatch[0]) as T;
  } catch (error) {
    console.error('Failed to extract structured data:', error);
    return null;
  }
}

/**
 * Summarize text
 */
export async function summarizeText(
  text: string,
  maxLength = 200
): Promise<string> {
  const prompt = `Summarize the following text in ${maxLength} words or less:

${text}`;

  try {
    const summary = await generateAIResponse(prompt, {
      model: 'claude-3-haiku-20240307',
      max_tokens: maxLength * 2, // Approximate tokens
      temperature: 0.5,
    });

    return summary.trim();
  } catch (error) {
    console.error('Summarization failed:', error);
    return 'Unable to generate summary.';
  }
}

/**
 * Generate insights from data
 */
export async function generateInsights(
  data: any,
  context: string
): Promise<string[]> {
  const prompt = `Generate 3-5 key insights from this data:

Context: ${context}

Data:
${JSON.stringify(data, null, 2)}

Return each insight as a separate line.`;

  try {
    const response = await generateAIResponse(prompt, {
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      temperature: 0.7,
    });

    return response
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^[-*•]\s*/, '').trim());
  } catch (error) {
    console.error('Failed to generate insights:', error);
    return [];
  }
}