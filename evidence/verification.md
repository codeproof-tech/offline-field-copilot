# Verification

This project demonstrates local-first inference through QVAC SDK.

Verification points:

- Inference path uses `@qvac/sdk`.
- No OpenAI API is used.
- No Anthropic API is used.
- No Gemini API is used.
- No OpenRouter API is used.
- No cloud LLM API key is configured.
- Demo context is sample / non-private data.
- Inference runs on a physical Android phone.

## Offline scope

The app is offline-capable after model setup/cache. The initial model download (peer-to-peer or HTTP) may require connectivity; after caching, inference runs with no network.
