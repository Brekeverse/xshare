import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useCollection, ContentItem } from '../hooks/useCollection';

export default function CollectionScreen() {
  const { items, removeItem } = useCollection();

  const renderItem = ({ item }: { item: ContentItem }) => (
    <View style={styles.card}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
      ) : null}
      <Text style={styles.platform}>{item.platform?.toUpperCase()}</Text>
      <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
      {item.description ? (
        <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
      ) : null}
      <View style={styles.footer}>
        <Text style={styles.date}>{new Date(item.savedAt).toLocaleDateString('es-AR')}</Text>
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Text style={styles.remove}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Sin contenido guardado</Text>
          <Text style={styles.emptySubtitle}>Procesá un link y guardalo acá</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  list: { padding: 16 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: '#888' },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  cardImage: { width: '100%', height: 140, borderRadius: 8, marginBottom: 12 },
  platform: { fontSize: 11, color: '#888', marginBottom: 6, letterSpacing: 1 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#ffffff', marginBottom: 6 },
  cardDesc: { fontSize: 13, color: '#aaaaaa', lineHeight: 18, marginBottom: 8 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  date: { fontSize: 12, color: '#555' },
  remove: { fontSize: 12, color: '#ff4444' },
});
