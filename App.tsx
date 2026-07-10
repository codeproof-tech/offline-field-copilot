import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Pressable, StyleSheet, Platform, StatusBar } from 'react-native';
import * as Device from 'expo-device';

import StatusPanel from './src/components/StatusPanel';
import ContextInput from './src/components/ContextInput';
import AnswerPanel from './src/components/AnswerPanel';
import { loadLocalModel, unloadLocalModel, MODEL_NAME, type ModelStatus } from './src/qvac/modelLifecycle';
import { generateLocalAnswer } from './src/qvac/qvacClient';
import { SAMPLE_FIELD_NOTE } from './src/data/sampleFieldNote';

type GenStatus = 'idle' | 'generating' | 'done' | 'error';

export default function App() {
  const [modelStatus, setModelStatus] = useState<ModelStatus>('unloaded');
  const [modelName, setModelName] = useState('');
  const [pct, setPct] = useState<number | null>(null);
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [genStatus, setGenStatus] = useState<GenStatus>('idle');
  const [genMs, setGenMs] = useState<number | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [genTimestamp, setGenTimestamp] = useState<string>('');

  const device = [Device.manufacturer, Device.modelName].filter(Boolean).join(' ') || 'Android device';
  const androidVersion = Device.osVersion || String(Platform.Version ?? '');
  const ram = Device.totalMemory ? `${Math.round(Device.totalMemory / 1024 ** 3)} GB` : '—';

  async function onLoad() {
    try {
      setError(''); setModelStatus('downloading'); setPct(0);
      await loadLocalModel((p) => { setPct(p); setModelStatus(p < 100 ? 'downloading' : 'loading'); });
      setModelStatus('ready'); setModelName(MODEL_NAME); setPct(null);
    } catch (e: any) {
      setModelStatus('unloaded'); setPct(null); setError(`Load failed: ${e?.message ?? e}`);
    }
  }

  async function onUnload() {
    try { await unloadLocalModel(); setModelStatus('unloaded'); setModelName(''); }
    catch (e: any) { setError(`Unload failed: ${e?.message ?? e}`); }
  }

  async function onGenerate() {
    if (modelStatus !== 'ready') { setError('Model is not loaded. Tap "Load model" first.'); return; }
    if (!context.trim()) { setError('Local context is empty.'); return; }
    if (!question.trim()) { setError('Question is empty.'); return; }
    setError(''); setAnswer(''); setGenStatus('generating');
    setGenTimestamp(new Date().toISOString());
    const t0 = Date.now();
    try {
      const { text, stats: rawStats } = await generateLocalAnswer(context, question, setAnswer);
      setAnswer(text); setGenStatus('done'); setGenMs(Date.now() - t0); setStats(rawStats);
    } catch (e: any) {
      setGenStatus('error'); setError(`Generation failed: ${e?.message ?? e}`);
    }
  }

  let ttft = 'N/A';
  let speed = 'N/A';
  if (stats) {
    const s: any = stats;
    // QVAC @qvac/sdk result.stats field names:
    if (typeof s.timeToFirstToken === 'number') ttft = `${Math.round(s.timeToFirstToken)}ms`;
    if (typeof s.tokensPerSecond === 'number') speed = `${s.tokensPerSecond.toFixed(1)} t/s`;
    // legacy fallbacks (llama.cpp-style), kept for safety:
    if (ttft === 'N/A' && s.timings?.prompt_ms) ttft = `${Math.round(s.timings.prompt_ms)}ms`;
    if (speed === 'N/A' && s.timings?.predicted_per_second) speed = `${s.timings.predicted_per_second.toFixed(1)} t/s`;
  }

  const evidence = {
    model: modelName || 'n/a',
    runtime: '@qvac/sdk (local, on-device)',
    device,
    localInference: true,
    cloudApi: 'disabled',
    generationTimeMs: genMs,
    TTFT: ttft,
    Speed: speed,
    Device: ((stats as any)?.backendDevice ?? 'UNKNOWN').toUpperCase(),
    timestamp: genTimestamp,
    rawStats: stats,
  };

  const statusLabel = modelStatus + (pct != null ? ` (${pct}%)` : '');
  const busy = modelStatus === 'downloading' || modelStatus === 'loading';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Offline Field Copilot</Text>
        <Text style={styles.subtitle}>Local-first AI assistant powered by QVAC</Text>

        <StatusPanel
          device={device}
          androidVersion={androidVersion}
          ram={ram}
          modelName={modelName}
          modelStatus={statusLabel}
          generationStatus={genStatus}
        />

        <Pressable style={[styles.primary, busy && styles.disabled]} disabled={busy} onPress={onLoad}>
          <Text style={styles.primaryText}>Load model</Text>
        </Pressable>

        <ContextInput
          context={context}
          question={question}
          onContext={setContext}
          onQuestion={setQuestion}
          onLoadSample={() => setContext(SAMPLE_FIELD_NOTE)}
          onGenerate={onGenerate}
          generating={genStatus === 'generating'}
        />

        <AnswerPanel answer={answer} error={error} evidence={evidence} />

        <Pressable style={styles.danger} onPress={onUnload}>
          <Text style={styles.primaryText}>Unload model</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B0B0F', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { padding: 16 },
  title: { color: 'white', fontSize: 22, fontWeight: '700' },
  subtitle: { color: '#A7A7B3', marginBottom: 8 },
  primary: { backgroundColor: '#2B2BFF', borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginVertical: 6 },
  danger: { backgroundColor: '#a33', borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginVertical: 12 },
  primaryText: { color: 'white', fontWeight: '600' },
  disabled: { opacity: 0.5 },
});
