# Run Log — On-Device Inference (demo-001)

**Device:** REDMAGIC 10S Pro (Nubia NX789J)
**Model:** Llama-3.2-1B-Instruct-Q4_0
**Runtime:** @qvac/sdk (local, on-device)
**Backend device:** GPU
**Airplane mode:** ON (verified — no Wi-Fi, no mobile data)
**Timestamp:** 2026-07-08T00:23:25.113Z

## Inference metrics (from QVAC completion result.stats)

| Metric | Value |
|---|---|
| Time to first token (TTFT) | 268.937 ms |
| Speed | 22.58 tokens/sec |
| Prompt tokens | 149 |
| Generated tokens | 361 |
| Generation time | 16497 ms |
| Cache tokens | 0 |
| Backend device | GPU |

## Model lifecycle
- model_load: yes
- completion: yes (metrics above)
- model_unload: yes

## Network
No cloud LLM APIs used. Model downloaded once via the QVAC registry; after caching,
inference runs fully on-device (verified in airplane mode). See `remote-apis.json`.
