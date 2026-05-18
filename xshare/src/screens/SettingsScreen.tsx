import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Platform, NativeModules, Alert } from 'react-native';
import { Overlay } from '../modules/overlay';

export default function SettingsScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    console.log('OverlayModule:', NativeModules.OverlayModule);
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const can = await Overlay.canDrawOverlays();
    setHasPermission(can);
  };

  const handleRequestPermission = async () => {
    Alert.alert('Debug', 'Módulos: ' + JSON.stringify(Object.keys(NativeModules)));
    await Overlay.requestPermission();
    setTimeout(checkPermission, 2000);
  };

  const handleToggleOverlay = async () => {
    if (isRunning) {
      await Overlay.stopService();
      setIsRunning(false);
    } else {
      if (!hasPermission) {
        await handleRequestPermission();
        return;
      }
      await Overlay.startService();
      setIsRunning(true);
    }
  };

  if (Platform.OS !== 'android') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Configuración</Text>
        <Text style={styles.subtitle}>El botón flotante solo está disponible en Android.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Botón flotante</Text>
        <Text style={styles.sectionDesc}>
          Aparece sobre cualquier app para capturar y compartir contenido con un solo toque.
        </Text>

        {!hasPermission ? (
          <TouchableOpacity style={styles.button} onPress={handleRequestPermission}>
            <Text style={styles.buttonText}>Dar permiso de superposición</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{isRunning ? 'Activo' : 'Inactivo'}</Text>
            <Switch
              value={isRunning}
              onValueChange={handleToggleOverlay}
              trackColor={{ false: '#333', true: '#1d9e75' }}
              thumbColor="#ffffff"
            />
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estado</Text>
        <View style={styles.statusRow}>
          <View style={[styles.dot, hasPermission ? styles.dotGreen : styles.dotRed]} />
          <Text style={styles.statusText}>
            {hasPermission ? 'Permiso de superposición otorgado' : 'Sin permiso de superposición'}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <View style={[styles.dot, isRunning ? styles.dotGreen : styles.dotRed]} />
          <Text style={styles.statusText}>
            {isRunning ? 'Servicio corriendo' : 'Servicio detenido'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 32 },
  section: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#ffffff', marginBottom: 8 },
  sectionDesc: { fontSize: 13, color: '#888', lineHeight: 20, marginBottom: 16 },
  button: {
    backgroundColor: '#1d9e75',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowLabel: { fontSize: 14, color: '#ffffff' },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  dotGreen: { backgroundColor: '#1d9e75' },
  dotRed: { backgroundColor: '#ff4444' },
  statusText: { fontSize: 13, color: '#888' },
});