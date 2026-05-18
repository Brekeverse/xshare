import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useCollection } from '../hooks/useCollection';
import { fetchMetadata } from '../services/metadata';

export default function HomeScreen() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const { saveItem } = useCollection();

  const processUrl = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setResult(null);
    setSaved(false);
    try {
      const data = await fetchMetadata(url);
      setResult(data);
    } catch (e) {
      setError('No se pudo procesar el link');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!result) return;
    const ok = saveItem(result);
    if (ok) setSaved(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>XShare</Text>
      <Text style={styles.subtitle}>Pegá cualquier link</Text>

      <TextInput
        style={styles.input}
        placeholder="https://..."
        placeholderTextColor="#555"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity style={styles.button} onPress={processUrl}>
        <Text style={styles.buttonText}>Procesar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator color="#ffffff" style={{ marginTop: 24 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {result && (
        <View style={styles.card}>
          {result.image ? (
            <Image source={{ uri: result.image }} style={styles.cardImage} resizeMode="cover" />
          ) : null}
          <Text style={styles.platform}>{result.platform?.toUpperCase()}</Text>
          <Text style={styles.cardTitle}>{result.title}</Text>
          {result.description ? (
            <Text style={styles.cardDesc} numberOfLines={4}>{result.description}</Text>
          ) : null}
          {result.author ? (
            <Text style={styles.cardMeta}>por {result.author}</Text>
          ) : null}
          <TouchableOpacity
            style={[styles.saveButton, saved && styles.savedButton]}
            onPress={handleSave}
            disabled={saved}
          >
            <Text style={styles.saveButtonText}>{saved ? 'Guardado' : 'Guardar en colección'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  content: { padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 32 },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 14,
    color: '#ffffff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: { color: '#000000', fontWeight: 'bold', fontSize: 15 },
  error: { color: '#ff4444', marginTop: 16, textAlign: 'center' },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  cardImage: { width: '100%', height: 180, borderRadius: 8, marginBottom: 12 },
  platform: { fontSize: 11, color: '#888', marginBottom: 8, letterSpacing: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#ffffff', marginBottom: 8 },
  cardDesc: { fontSize: 13, color: '#aaaaaa', lineHeight: 20, marginBottom: 8 },
  cardMeta: { fontSize: 12, color: '#666', marginBottom: 12 },
  saveButton: {
    backgroundColor: '#1d9e75',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  savedButton: { backgroundColor: '#333' },
  saveButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
});
