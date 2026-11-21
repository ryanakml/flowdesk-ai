import type { AiRuntimeConfig } from "@wabrix/config";
import { createAiProviderRuntime, type AiProviderRuntime } from "@wabrix/providers";

export type AiRuntime = AiProviderRuntime;

export function createAiRuntime(config: AiRuntimeConfig): AiRuntime | undefined {
  return createAiProviderRuntime(config);
}
