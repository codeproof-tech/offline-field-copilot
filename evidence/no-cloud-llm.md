# No Cloud LLM Declaration

Offline Field Copilot does not use OpenAI, Anthropic, Gemini, OpenRouter, or other cloud LLM APIs for inference.

The official hackathon inference path is QVAC SDK. Local context remains on the device during the demonstrated workflow.

## Checked items

- No OpenAI API key
- No Anthropic API key
- No Gemini API key
- No OpenRouter API key
- No cloud LLM endpoint
- No backend proxy for LLM inference

## How to verify in this repo

- `package.json` lists `@qvac/sdk` as the only LLM dependency.
- `src/qvac/` contains the entire inference path; it imports only from `@qvac/sdk`.
- There is no `server/`, `backend/`, `api/`, or `proxy/` directory.
