import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type AnswerPanelProps = {
  answer: string;
  error: string;
  evidence: object;
};

export default function AnswerPanel(p: AnswerPanelProps) {
  return (
    <View>
      <Text style={styles.label}>Answer</Text>
      <View style={styles.answer}>
        <Text style={styles.answerText} selectable>{p.answer || '—'}</Text>
      </View>

      {p.error ? <Text style={styles.error}>{p.error}</Text> : null}

      <Text style={styles.label}>Evidence</Text>
      <View style={styles.panel}>
        <Text style={styles.mono} selectable>{JSON.stringify(p.evidence, null, 2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: '#A7A7B3', marginTop: 12, marginBottom: 4, fontWeight: '600' },
  answer: { borderWidth: 1, borderColor: '#2A2A33', borderRadius: 8, padding: 10, minHeight: 80, backgroundColor: '#121219' },
  answerText: { color: 'white', lineHeight: 20 },
  error: { color: '#ff6b6b', marginTop: 8 },
  panel: { borderWidth: 1, borderColor: '#2A2A33', borderRadius: 8, padding: 10, backgroundColor: '#121219' },
  mono: { fontFamily: 'monospace', fontSize: 12, color: '#A7A7B3' },
});
