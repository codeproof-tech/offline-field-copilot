// QVAC inference client: builds the prompt and runs a streaming local completion.
import { completion } from '@qvac/sdk';
import { getModelId } from './modelLifecycle';

export type ChatTurn = { role: 'system' | 'user' | 'assistant'; content: string };

const SYSTEM_INSTRUCTION = [
  'You are an offline field copilot.',
  'Use only the provided local context.',
  'If the context is insufficient, say what is missing.',
  'Answer concisely: a short conclusion, step-by-step actions, risks, and clarifications if data is missing.',
].join('\n');

export function buildHistory(context: string, question: string): ChatTurn[] {
  const user = `Local context:\n${context.trim()}\n\nUser question:\n${question.trim()}`;
  return [
    { role: 'system', content: SYSTEM_INSTRUCTION },
    { role: 'user', content: user },
  ];
}

// onToken(partialText) streams the answer into the UI as tokens arrive.
export async function generateLocalAnswer(
  context: string,
  question: string,
  onToken?: (partial: string) => void,
): Promise<{ text: string; stats?: unknown }> {
  const modelId = getModelId();
  if (!modelId) {
    const e: Error & { code?: string } = new Error('Model is not loaded');
    e.code = 'MODEL_NOT_LOADED';
    throw e;
  }

  const result = completion({ modelId, history: buildHistory(context, question), stream: true });

  let acc = '';
  for await (const token of result.tokenStream) {
    acc += token;
    onToken?.(acc);
  }

  let stats: unknown;
  try { stats = await result.stats; } catch { /* stats are optional */ }
  return { text: acc, stats };
}
