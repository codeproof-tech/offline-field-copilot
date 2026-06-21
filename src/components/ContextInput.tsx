import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export type ContextInputProps = {
  context: string;
  question: string;
  onContext: (t: string) => void;
  onQuestion: (t: string) => void;
  onLoadSample: () => void;
  onGenerate: () => void;
  generating: boolean;
};

export default function ContextInput(p: ContextInputProps) {
  return (
    <View>
      <Pressable style={styles.ghost} onPress={p.onLoadSample}>
        <Text style={styles.ghostText}>Load sample field note</Text>
      </Pressable>

      <Text style={styles.label}>Local Context</Text>
      <TextInput
        style={styles.area}
        multiline
        value={p.context}
        onChangeText={p.onContext}
        placeholder="Paste an instruction, checklist, or note…"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Question</Text>
      <TextInput
        style={styles.input}
        value={p.question}
        onChangeText={p.onQuestion}
        placeholder="Ask about the context…"
        placeholderTextColor="#666"
      />

      <Pressable
        style={[styles.primary, p.generating && styles.disabled]}
        disabled={p.generating}
        onPress={p.onGenerate}
      >
        <Text style={styles.primaryText}>{p.generating ? 'Generating…' : 'Generate locally'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: '#A7A7B3', marginTop: 12, marginBottom: 4, fontWeight: '600' },
  area: { borderWidth: 1, borderColor: '#2A2A33', borderRadius: 8, padding: 10, minHeight: 110, color: 'white', textAlignVertical: 'top' },
  input: { borderWidth: 1, borderColor: '#2A2A33', borderRadius: 8, padding: 10, color: 'white' },
  primary: { backgroundColor: '#2B2BFF', borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginVertical: 10 },
  primaryText: { color: 'white', fontWeight: '600' },
  ghost: { borderWidth: 1, borderColor: '#2A2A33', borderRadius: 12, paddingVertical: 10, alignItems: 'center', marginVertical: 6 },
  ghostText: { color: '#A7A7B3' },
  disabled: { opacity: 0.5 },
});
