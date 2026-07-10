# Offline Field Copilot

**A Pocket QVAC Agent for private offline field work.**

**[▶️ Watch Demo Video on YouTube](https://youtu.be/IseGv6yqqZE)**

Offline Field Copilot is a local-first mobile AI copilot for Android. It uses `@qvac/sdk` inside an Expo / React Native app to run local LLM inference directly on consumer smartphone hardware.

The app is designed for private field notes, checklists, instructions, and operational context. A user can paste local context, ask a practical question, and receive a concise answer generated on-device without cloud LLM APIs.

> **Status:** Hackathon MVP. Offline-capable after model setup. No cloud LLM APIs are used for inference.

## One-liner

A local-first mobile AI copilot running QVAC inference on a RedMagic/Nubia Android smartphone to answer questions over private offline field notes without cloud LLM APIs.

## Core claim

Consumer smartphones can already run useful local AI workflows when the product is designed around privacy, offline resilience, and focused assistance.

## Demo flow

1. Show the physical Android phone.
2. Open Offline Field Copilot.
3. Show device/runtime/model status.
4. Load the local model.
5. Paste a sample local field note or checklist.
6. Ask: "What should I do first and what risks should I watch for?"
7. Generate the answer locally.
8. Show that no cloud LLM API is configured.
9. Show evidence/logs.
10. Unload the model.

## What the MVP does

- Runs on a consumer Android smartphone.
- Uses QVAC SDK for local inference.
- Lets the user paste a local field note, checklist, or instruction.
- Lets the user ask a task-oriented question.
- Generates a concise answer on-device.
- Shows model/runtime/device status.
- Supports a clear model lifecycle: load -> generate -> unload.
- Does not use OpenAI, Anthropic, Gemini, OpenRouter, or other cloud LLM APIs for inference.

## What the MVP does not claim

This MVP does not claim to be:

- fully offline from zero;
- production-ready;
- enterprise-grade security;
- a complete RAG system;
- OCR-ready;
- voice-ready;
- P2P delegated inference-ready;
- compatible with all Android phones;
- guaranteed GPU-accelerated on every device;
- a fully autonomous agent.

Correct scope:

**Offline-capable after model setup. No cloud LLM APIs are used for inference.**

## Why QVAC

QVAC is central to this project because the product is designed around local-first inference, privacy-preserving workflows, and edge execution. The official hackathon inference path is `@qvac/sdk`.

## Target users

Mobile-first workers who need private, practical assistance in low-connectivity or sensitive-data scenarios: field technicians, equipment operators, procurement specialists, warehouse workers, support engineers, volunteers, and mobile-first operators working with private notes or procedures.

## Tech stack

- Expo / React Native (TypeScript)
- Android
- `@qvac/sdk` — QVAC local LLM inference
- Local text context input
- Model lifecycle: setup/cache -> load -> generate -> unload

## Hardware

Primary test device:

- Device: RedMagic / Nubia (ZTE) Android smartphone
- Android version: 15
- RAM: 24 GB
- CPU / chipset: Qualcomm Snapdragon 8 Elite
- GPU: Adreno 830

This project is designed to run on consumer smartphone hardware, not cloud infrastructure or a datacenter setup. **A physical device is required — QVAC does not run on emulators.**

## Sample field note

```text
Generator unit inspection checklist:

- Check fuel level.
- Inspect oil leakage.
- Verify cooling airflow.
- Confirm emergency stop is accessible.
- Record abnormal vibration or noise.
- Escalate if temperature warning appears.
```

Sample user question:

```text
What should I do first and what risks should I watch for?
```

## Reproducibility

The official QVAC Expo integration is followed (see https://docs.qvac.tether.io/tutorials/expo/).

```bash
# Create the Expo base (SDK 54), then add the files from this repo:
npx create-expo-app@latest offline-field-copilot --template blank-typescript@sdk-54
cd offline-field-copilot
npm i @qvac/sdk bare-rpc react-native-bare-kit bare-pack patch-package
npx expo install expo-file-system expo-build-properties expo-device expo-status-bar
# Merge the plugins from this repo's app.json, then copy src/, patches/ and App.tsx in.
npx expo prebuild
npx expo run:android --device
```

`@qvac/sdk` is pinned to exactly **0.13.5**. Do not use `^0.7.0` - it fails to install (E404 on a transitive dependency).
`patches/@qvac+sdk+0.13.5.patch` is applied automatically by `patch-package` on `npm install`.
Do **not** run `npm audit fix` - it breaks the dependency tree.
A physical Android device is required (QVAC does not run on emulators).

## Evidence bundle

- `evidence/device.md`
- `evidence/run-log.md`
- `evidence/run-log.json`
- `evidence/verification.md`
- `evidence/no-cloud-llm.md`
- `evidence/screenshots.md`
- `remote-apis.json`

## License

Apache-2.0
