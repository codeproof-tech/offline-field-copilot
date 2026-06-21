import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type StatusProps = {
  device: string;
  androidVersion: string;
  ram: string;
  modelName: string;
  modelStatus: string;
  generationStatus: string;
};

export default function StatusPanel(p: StatusProps) {
  const rows: [string, string][] = [
    ['Device', p.device],
    ['Android', p.androidVersion],
    ['RAM', p.ram],
    ['Runtime', '@qvac/sdk (on-device)'],
    ['Model', p.modelName || '—'],
    ['Model status', p.modelStatus],
    ['Generation', p.generationStatus],
    ['Cloud LLM API', 'disabled'],
  ];
  return (
    <View style={styles.panel}>
      {rows.map(([k, v]) => (
        <View style={styles.row} key={k}>
          <Text style={styles.k}>{k}</Text>
          <Text style={styles.v}>{v}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { borderWidth: 1, borderColor: '#2A2A33', borderRadius: 8, padding: 10, marginVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
  k: { color: '#A7A7B3' },
  v: { color: 'white', fontWeight: '600' },
});
