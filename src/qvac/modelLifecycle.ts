// QVAC model lifecycle (download -> load -> unload).
// API verified against the official tutorial: https://docs.qvac.tether.io/tutorials/expo/
import {
  downloadAsset,
  loadModel,
  unloadModel,
  LLAMA_3_2_1B_INST_Q4_0,
  VERBOSITY,
  type ModelProgressUpdate,
} from '@qvac/sdk';

export type ModelStatus = 'unloaded' | 'downloading' | 'loading' | 'ready';

const MODEL_SRC = LLAMA_3_2_1B_INST_Q4_0;
export const MODEL_NAME = 'Llama-3.2-1B-Instruct-Q4_0';

let modelId: string | null = null;

export function getModelId(): string | null {
  return modelId;
}

export function getModelStatus(): ModelStatus {
  return modelId ? 'ready' : 'unloaded';
}

// Start small (smallest model) to fit phone RAM and de-risk the demo.
export async function loadLocalModel(onProgress?: (pct: number) => void): Promise<string> {
  if (modelId) return modelId;

  await downloadAsset({
    assetSrc: MODEL_SRC,
    onProgress: (p: ModelProgressUpdate) => onProgress?.(Math.round(p.percentage)),
  });

  modelId = await loadModel({
    modelSrc: MODEL_SRC,
    modelType: 'llm',
    modelConfig: { device: 'gpu', ctx_size: 2048, verbosity: VERBOSITY.ERROR },
    onProgress: (p: ModelProgressUpdate) => onProgress?.(Math.round(p.percentage)),
  });

  return modelId;
}

export async function unloadLocalModel(): Promise<void> {
  if (!modelId) return;
  await unloadModel({ modelId, clearStorage: false });
  modelId = null;
}
