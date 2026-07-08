# No Cloud LLM Verification

Offline Field Copilot **does not** rely on any cloud LLM APIs (OpenAI, Anthropic, Gemini, etc.) for its core inference loop.

1. **Model Storage:** The `.gguf` weight file is stored entirely in the internal application storage on the smartphone.
2. **Network Isolation:** The inference successfully executes while the device is in Airplane Mode, proving zero external API calls are made during text generation.
3. **Execution:** All context processing and token generation occurs directly on the local processor.
